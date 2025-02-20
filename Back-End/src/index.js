const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());

connectDB()

const adminRouter = require('./routers/adminRouters')
const userRouter = require('./routers/userRouters')
const sellerRouter = require('./routers/sellerRouters')
const categoryRouter = require('./routers/categoryRouters')
const colorRouter = require('./routers/colorRouters')
const brandRouter = require('./routers/brandRouters')
const districtRouter = require('./routers/districtRouters')
const policymethodRouter = require('./routers/policymethodRouters')
const paymentmethodRouter = require('./routers/paymentmethodRouters')
const sizeheaddRouter = require('./routers/sizeheadRouters')
const sizebodydRouter = require('./routers/sizebodyRouters')
const feedbackRouter = require('./routers/feedbackRouters');
const addressRouter = require('./routers/addressRouters');
const galleryRouter = require('./routers/galleryRouters');
const keyfeaturesRouter = require('./routers/keyfeaturesRouters');
const productRouter = require('./routers/productRouters');
const searchkeywordRouter = require('./routers/searchkeywordRouters');
const productvariantRouter = require('./routers/productvariantRouters');
const productstockRouter = require('./routers/productstockRouters');
const bookingRouter = require('./routers/bookingRouters');
const wishlistRouter = require('./routers/wishlistRouters');
const cartRouter = require('./routers/cartRouters');
const chatRouter = require('./routers/chatusRouters');




app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/category', categoryRouter);
app.use('/api/color', colorRouter);
app.use('/api/brand', brandRouter);
app.use('/api/district', districtRouter);
app.use('/api/policymethod', policymethodRouter); 
app.use('/api/paymentmethod', paymentmethodRouter);  
app.use('/api/sizehead', sizeheaddRouter);  
app.use('/api/sizebody', sizebodydRouter);  
app.use('/api/feedback', feedbackRouter);  
app.use('/api/address', addressRouter); 
app.use('/api/gallery', galleryRouter);  
app.use('/api/keyfeatures', keyfeaturesRouter);
app.use('/api/product', productRouter);  
app.use('/api/searchkeyword', searchkeywordRouter);  
app.use('/api/productvaraint', productvariantRouter);  
app.use('/api/productstock', productstockRouter); 
app.use('/api/booking', bookingRouter);  
app.use('/api/wishlist', wishlistRouter);
app.use('/api/cart', cartRouter); 
app.use('/api/chatus', chatRouter);  




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running  on the Port ${PORT}`))

module.exports = app;
