import { IoMdShareAlt } from 'react-icons/io'
import styles from './ProductDetails.module.css'
import { MdLocalOffer, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { FaStar } from 'react-icons/fa'
import mainImg from '../../../../../assets/iphone-black.jpg';

const ProductDetails: React.FC = () => {

   

    return (
        <div className={styles.body}>
            <div className={styles.productPath}>
                <div className={styles.path}><p>
                    Home <MdOutlineKeyboardArrowRight />
                    Mobiles & Accessories <MdOutlineKeyboardArrowRight />
                    Mobiles <MdOutlineKeyboardArrowRight />
                    Apple Mobiles <MdOutlineKeyboardArrowRight />
                    Apple iPhone 15 (Black, 128 GB)</p></div>
                <div className={styles.share}> <span><IoMdShareAlt /></span>Share</div>
            </div>
            <div className={styles.name_Price}>
                <div className={styles.varientName}>Apple iPhone 15 (Green, 128 GB)</div>
                <div className={styles.rating}>
                    <span className={styles.avgRating}>4.6 <FaStar /></span>
                    <span className={styles.totalRating_Review}>
                        <span className={styles.totalRating}>2,27,620 Ratings</span>
                        <span className={styles.and}>&</span>
                        <span className={styles.totalReview}> 8,136 Reviews</span>
                    </span>
                </div>
                <div className={styles.Extraoffer}>
                    Extra ₹10901 off
                </div>
                <div className={styles.pricesection}>
                    <span className={styles.sellingPrice}>₹58,999</span>
                    <span className={`${styles.MRP} ${styles.strick}`}>₹69,900</span>
                    <span className={styles.offerPer}>15% off</span>
                    <span className={styles.circlePopUp}>i</span>
                </div>
            </div>
            <div className={styles.availableOffers}>
                <div className={styles.headOfOffer}>Available offers</div>
                <div className={styles.wholeOfferDetails}>

                    <div className={styles.offerdetails}>
                        <div className={styles.offericon}><MdLocalOffer /></div>
                        <div className={styles.bankOffer}>
                            <span className={styles.bold}>Bank Offer</span> <span className={styles.defineOffer}> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card </span><span className={styles.termBlue}> T&C</span>
                        </div>
                    </div>
                    <div className={styles.offerdetails}>
                        <div className={styles.offericon}><MdLocalOffer /></div>
                        <div className={styles.backOffer}>
                            <span className={styles.bold}>Bank Offer</span><span className={styles.defineOffer}>Flat ₹450 off on HDFC Bank Credit Card EMI Txns on 3 months tenure, Min. Txn Value: ₹5000</span><span className={styles.termBlue}> T&C</span>
                        </div>
                    </div>
                    <div className={styles.offerdetails}>
                        <div className={styles.offericon}><MdLocalOffer /></div>
                        <div className={styles.backOffer}>
                            <span className={styles.bold}>Bank Offer</span><span className={styles.defineOffer}>10% off up to ₹750 on HDFC Bank Credit Card EMI on 6 and 9 months tenure. Min. Txn Value: ₹5000</span><span className={styles.termBlue}> T&C</span>
                        </div>
                    </div>
                    <div className={styles.offerdetails}>
                        <div className={styles.offericon}><MdLocalOffer /></div>
                        <div className={styles.backOffer}>
                            <span className={styles.bold}>Special Price</span><span className={styles.defineOffer}>Get extra ₹10901 off (price inclusive of cashback/coupon)</span><span className={styles.termBlue}> T&C</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.warrantySection}>
                <div className={styles.warrantyIcon}></div>
                <div className={styles.warrantydetails}>1 year warranty for phone and 1 year warranty for in Box Accessories.</div>
                <div className={styles.warrantyKnowMore}>
                    Know More
                </div>

            </div>
            <div className={styles.otherDetails}>
                <div className={styles.variant}>
                    <div className={styles.headName}>color</div>
                    <div className={styles.varientBody}>
                        <div className={styles.colorvariants}>
                       <img src={mainImg} alt="" />
                        </div>
                        <div className={styles.colorvariants}>
                       <img src={mainImg} alt="" />
                        </div>
                        <div className={styles.colorvariants}>
                       <img src={mainImg} alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.variant}>
                    <div className={styles.headName}>Storage</div>
                    <div className={styles.StorageBody}>
                          <div className={styles.varaintStorage}>128 GB</div> 
                          <div className={styles.varaintStorage}>256 GB</div>  

                    </div>
                    
                </div>
            </div>
            <div className={styles.delivery}>
                <div className={styles.headName}>Delivery</div>
                <div className={styles.deliverydetails}>
                    <div className={styles.flex}>Delivery by21 Dec, Saturday| <span className={styles.green}>Free</span><span className={styles.strick}>₹40</span> <div className={styles.circlePopUp}>?</div></div>
                    <p>if ordered before 1:45 PM</p>
                </div>

            </div>
            <div className={styles.otherDetails}>
                <div className={styles.variant}>
                    <div className={styles.headName}>Highlights
                    </div>
                    <div className={styles.highlightDatas}>
                        <div className={styles.pointDatas}>
                            <div className={styles.flex}> <span>.</span><p>128 GB ROM</p></div>
                            <div className={styles.flex}><span>.</span><p>15.49 cm (6.1 inch) Super Retina XDR Display</p></div>
                            <div className={styles.flex}><span>.</span><p>48MP + 12MP | 12MP Front Camera</p></div>
                        </div>
                    </div>
                </div>
                <div className={styles.variant}>
                    <div className={styles.headName}>Easy Payment Options</div>
                    <div className={styles.easyPaymentDatas}>
                        <div className={styles.pointDatas}>
                            <div className={styles.flex}><span>.</span><p>Cash on Delivery</p></div>
                            <div className={styles.flex}><span>.</span><p>Net banking & Credit/ Debit/ ATM card</p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.sellersection}>
                <div className={styles.headName}>Seller</div>
                <div className={styles.headDetails}>
                    <div className={styles.flex}><span>.</span><p>Cash on Delivery</p></div>
                    <div className={styles.flex}><span>.</span><p>Net banking & Credit/ Debit/ ATM card</p></div>
                </div>
            </div>
            <div className={styles.sellersection}>
                <div className={styles.headName}>Seller</div>
                <div className={styles.headDetails}>
                    <div className={styles.flex}><span>.</span><p>Cash on Delivery</p></div>
                    <div className={styles.flex}><span>.</span><p>Net banking & Credit/ Debit/ ATM card</p></div>
                </div>
            </div><div className={styles.sellersection}>
                <div className={styles.headName}>Seller</div>
                <div className={styles.headDetails}>
                    <div className={styles.flex}><span>.</span><p>Cash on Delivery</p></div>
                    <div className={styles.flex}><span>.</span><p>Net banking & Credit/ Debit/ ATM card</p></div>
                </div>
            </div><div className={styles.sellersection}>
                <div className={styles.headName}>Seller</div>
                <div className={styles.headDetails}>
                    <div className={styles.flex}><span>.</span><p>Cash on Delivery</p></div>
                    <div className={styles.flex}><span>.</span><p>Net banking & Credit/ Debit/ ATM card</p></div>
                </div>
            </div><div className={styles.sellersection}>
                <div className={styles.headName}>Seller</div>
                <div className={styles.headDetails}>
                    <div className={styles.flex}><span>.</span><p>Cash on Delivery</p></div>
                    <div className={styles.flex}><span>.</span><p>Net banking & Credit/ Debit/ ATM card</p></div>
                </div>
            </div><div className={styles.sellersection}>
                <div className={styles.headName}>Seller</div>
                <div className={styles.headDetails}>
                    <div className={styles.flex}><span>.</span><p>Cash on Delivery</p></div>
                    <div className={styles.flex}><span>.</span><p>Net banking & Credit/ Debit/ ATM card</p></div>
                </div>
            </div><div className={styles.sellersection}>
                <div className={styles.headName}>Seller</div>
                <div className={styles.headDetails}>
                    <div className={styles.flex}><span>.</span><p>Cash on Delivery</p></div>
                    <div className={styles.flex}><span>.</span><p>Net banking & Credit/ Debit/ ATM card</p></div>
                </div>
            </div><div className={styles.sellersection}>
                <div className={styles.headName}>Seller</div>
                <div className={styles.headDetails}>
                    <div className={styles.flex}><span>.</span><p>Cash on Delivery</p></div>
                    <div className={styles.flex}><span>.</span><p>Net banking & Credit/ Debit/ ATM card</p></div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails