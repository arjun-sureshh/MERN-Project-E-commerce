import React from 'react';
import styles from './ProductDetails.module.css';
import { IoMdShareAlt } from 'react-icons/io';
import { MdLocalOffer, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { ProductVariant } from '../../../../components/types/types';

interface ProductDetailsProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  setSelectedVariant: React.Dispatch<React.SetStateAction<ProductVariant | undefined>>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ variants, selectedVariant, setSelectedVariant }) => {
  const baseURL = 'http://localhost:5000';

  const discountPercentage = selectedVariant.mrp > selectedVariant.sellingPrice
    ? Math.round(((selectedVariant.mrp - selectedVariant.sellingPrice) / selectedVariant.mrp) * 100)
    : 0;

  const getDeliveryDate = () => {
    const today = new Date();
    const slaDays = parseInt(selectedVariant.procurementSLA || '0', 10);
    const extraDays = 2;
    const deliveryDays = slaDays + extraDays;

    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      weekday: 'long',
    };
    return deliveryDate.toLocaleDateString('en-US', options);
  };

  return (
    <div className={styles.body}>
      {/* Breadcrumb */}
      <div className={styles.productPath}>
        <div className={styles.path}>
          <p>
            Home <MdOutlineKeyboardArrowRight />
            {selectedVariant.categoryName} <MdOutlineKeyboardArrowRight />
            {selectedVariant.brandName} Products <MdOutlineKeyboardArrowRight />
            {selectedVariant.productTitle}
          </p>
        </div>
        <div className={styles.share}>
          <span>
            <IoMdShareAlt />
          </span>{' '}
          Share
        </div>
      </div>

      {/* Name and Price */}
      <div className={styles.name_Price}>
        <div className={styles.varientName}>
          {selectedVariant.brandName} {selectedVariant.productTitle} ({selectedVariant.colorName})
        </div>
        <div className={styles.rating}>
          <span className={styles.avgRating}>
            4.6 <FaStar />
          </span>
          <span className={styles.totalRating_Review}>
            <span className={styles.totalRating}>2,27,620 Ratings</span>
            <span className={styles.and}>&</span>
            <span className={styles.totalReview}>8,136 Reviews</span>
          </span>
        </div>
        <div className={styles.Extraoffer}>
          Extra ₹{(selectedVariant.mrp - selectedVariant.sellingPrice).toLocaleString()} off
        </div>
        <div className={styles.pricesection}>
          <span className={styles.sellingPrice}>₹{selectedVariant.sellingPrice.toLocaleString()}</span>
          {discountPercentage > 0 && (
            <>
              <span className={`${styles.MRP} ${styles.strick}`}>
                ₹{selectedVariant.mrp.toLocaleString()}
              </span>
              <span className={styles.offerPer}>{discountPercentage}% off</span>
            </>
          )}
          <span className={styles.circlePopUp}>i</span>
        </div>
      </div>

      {/* Available Offers */}
      <div className={styles.availableOffers}>
        <div className={styles.headOfOffer}>Available offers</div>
        <div className={styles.wholeOfferDetails}>
          <div className={styles.offerdetails}>
            <div className={styles.offericon}>
              <MdLocalOffer />
            </div>
            <div className={styles.bankOffer}>
              <span className={styles.bold}>Bank Offer</span>
              <span className={styles.defineOffer}>
                5% Unlimited Cashback on Flipkart Axis Bank Credit Card
              </span>
              <span className={styles.termBlue}>T&C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warranty */}
      <div className={styles.warrantySection}>
        <div className={styles.warrantyIcon}></div>
        <div className={styles.warrantydetails}>
          {selectedVariant.warrantySummary || '1 year warranty for phone and accessories'}
        </div>
        <div className={styles.warrantyKnowMore}>Know More</div>
      </div>

      {/* Variant Selection */}
      <div className={styles.otherDetails}>
        <div className={styles.variant}>
          <div className={styles.headName}>Color</div>
          <div className={styles.varientBody}>
            {variants.map((variant) => (
              <div
                key={variant.variantId}
                className={`${styles.colorvariants} ${
                  variant.variantId === selectedVariant.variantId ? styles.selected : ''
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                <img
                  src={variant.images[0] ? `${baseURL}${variant.images[0]}` : ''}
                  alt={variant.colorName || 'Variant'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery */}
      <div className={styles.delivery}>
        <div className={styles.headName}>Delivery</div>
        <div className={styles.deliverydetails}>
          <div className={styles.flex}>
            Delivery by {getDeliveryDate()} | <span className={styles.green}>Free</span>
            <span className={styles.strick}>₹40</span> <div className={styles.circlePopUp}>?</div>
          </div>
          <p>if ordered before 1:45 PM</p>
        </div>
      </div>

      {/* Highlights */}
      <div className={styles.otherDetails}>
        <div className={styles.variant}>
          <div className={styles.headName}>Highlights</div>
          <div className={styles.highlightDatas}>
            <div className={styles.pointDatas}>
              {selectedVariant.features?.map((feature, index) => (
                <div key={index} className={styles.flex}>
                  <span>.</span>
                  <p>
                    {feature.title}: {feature.content}
                  </p>
                </div>
              )) || (
                <div className={styles.flex}>
                  <span>.</span>
                  <p>No highlights available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className={styles.otherDetails}>
        <div className={styles.variant}>
          <div className={styles.headName}>Specifications</div>
          <div className={styles.specificationDatas}>
            {selectedVariant.specifications && selectedVariant.specifications.length > 0 ? (
              selectedVariant.specifications.map((spec: string, index: number) => (
                <div key={index} className={styles.specItem}>
                  <span className={styles.specValue}>{spec}</span>
                </div>
              ))
            ) : (
              <div className={styles.noSpecs}>No specifications available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;