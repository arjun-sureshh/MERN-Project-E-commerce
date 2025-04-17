const { default: mongoose } = require("mongoose");
const Booking = require("../models/bookingModules");
const MYcart = require("../models/cartModels");

// get Cart

const getCart = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Validate userId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
        });
      }
  
      const convertedUserId = new mongoose.Types.ObjectId(String(userId));
  
      const cartDetails = await MYcart.aggregate([
        {
          $lookup: {
            from: 'bookings',
            localField: 'bookingID',
            foreignField: '_id',
            as: 'bookingDetails',
          },
        },
        { $unwind: { path: '$bookingDetails', preserveNullAndEmptyArrays: true } },
        {
          $match: { 'bookingDetails.userId': convertedUserId }, // Match userId after lookup
        },
        {
          $lookup: {
            from: 'productvariantdetails',
            localField: 'productvariantId',
            foreignField: '_id',
            as: 'productVariantDetails',
          },
        },
        { $unwind: { path: '$productVariantDetails', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'productdetails',
            localField: 'productVariantDetails.productId',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        { $unwind: { path: '$productDetails', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'sellers',
            localField: 'productDetails.sellerId',
            foreignField: '_id',
            as: 'sellerDetails',
          },
        },
        { $unwind: { path: '$sellerDetails', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'productimages',
            localField: 'productVariantDetails._id',
            foreignField: 'varientId',
            as: 'galleryDetails',
          },
        },
        { $unwind: { path: '$galleryDetails', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'productSpecification',
            localField: 'productVariantDetails._id',
            foreignField: 'productVariantId',
            as: 'productSpecificationDetails',
          },
        },
        { $unwind: { path: '$productSpecificationDetails', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            cart_Id: '$_id', // Use _id from MYcart
            productvariantId: 1,
            cartQty: 1, // Include cartQty from MYcart
            mrp: '$productVariantDetails.mrp', // Correct source
            sellingPrice: '$productVariantDetails.sellingPrice', // Correct source
            sellerName: '$sellerDetails.sellerDisplayName',
            image: '$galleryDetails.photos',
            specification: '$productSpecificationDetails.specification',
            bookingAmount:"$bookingDetails.amount",
            productTitle:"$productVariantDetails.productTitle",
            productId:"$productDetails._id",
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
  
      if (!cartDetails || cartDetails.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No cart items found for this user',
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Cart details fetched successfully',
        data: cartDetails,
      });
    } catch (error) {
      console.error('Error in getCart:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching cart details',
        error: error.message,
      });
    }
  };

// post Cart

const createCart = async (req, res) => {
  const { cartQty, variantId, userId } = req.body;

  try {
    // Validate required fields
    if (!cartQty || !variantId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: cartQty, variantId, and userId are required',
      });
    }

    // Convert variantId to ObjectId (scoped within try block)
    const productvariantId = new mongoose.Types.ObjectId(String(variantId));

    // Check if a booking exists for the user with status 0
    let booking = await Booking.findOne({ userId, status: 0 });
    if (!booking) {
      // Create new booking if none exists
      const newBooking = new Booking({ userId, status: 0 });
      booking = await newBooking.save();
    }

    // Check if the product variant already exists in the cart
    const existingCart = await MYcart.findOne({
      productvariantId,
      bookingID: booking._id,
    });
    if (existingCart) {
      return res.status(400).json({
        success: false,
        message: 'This product variant is already in your cart',
      });
    }

    // Create new cart item
    const newCart = new MYcart({
      cartQty,
      productvariantId,
      bookingID: booking._id,
    });

    // Save to database
    const savedCart = await newCart.save();
    return res.status(201).json({
      success: true,
      message: 'Product added to cart successfully',
      data: savedCart,
    });
  } catch (error) {
    console.error('Error in createCart:', error);

    // Handle specific errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ObjectId format for variantId or userId',
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // Handle duplicate key errors (if applicable)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Product already exists in cart',
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: 'Server error while adding to cart',
    });
  }
};
const deleteCart = async (req, res) => {
  const { cartId, userId } = req.body;

  try {
    if (!cartId || !userId) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${!cartId ? 'cartId' : ''} ${!userId ? 'userId' : ''}`.trim(),
      });
    }

    if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cartId or userId format',
      });
    }

    const cartItem = await MYcart.findOne({ _id: cartId });
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    const booking = await Booking.findOne({ _id: cartItem.bookingID, userId });
    if (!booking) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Cart item does not belong to this user',
      });
    }

    await MYcart.deleteOne({ _id: cartId });

    // Check for remaining cart items
    const remainingCartItems = await MYcart.countDocuments({ bookingID: cartItem.bookingID });
    if (remainingCartItems === 0) {
      await Booking.deleteOne({ _id: cartItem.bookingID });
    }

    return res.status(200).json({
      success: true,
      message: 'Cart item removed successfully',
    });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid cartId or userId format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error while removing cart item',
    });
  }
};

module.exports = {
    createCart,
    getCart,
    deleteCart
}