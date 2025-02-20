import React, { useState } from 'react';
import styles from './ImageShow.module.css';
import mainImg from '../../../../../assets/mainImg.png';
import img2 from '../../../../../assets/2img.jpg';
import img3 from '../../../../../assets/lens.jpg';
import img4 from '../../../../../assets/iphoneside.jpg';
import iphonepink from '../../../../../assets/iohone-pink.jpg';
import iphonwhite from '../../../../../assets/iphonewhite.jpg';



import { FaShoppingCart } from 'react-icons/fa';
import { IoMdFlash } from 'react-icons/io';

// Define the type for images
interface ImageProps {
  src: string;
  alt: string;
}

const ImageShow: React.FC = () => {
  // State to track the selected main image
  const [selectedImage, setSelectedImage] = useState<string>(mainImg);

  const [hoverImage, setHoverImage] = useState<string | null>(mainImg);


  // const sideImagesRef = useRef<HTMLDivElement>(null)


  // Array of images (thumbnails)
  const images: ImageProps[] = [
    { src: mainImg, alt: 'mainImag' },
    { src: img2, alt: 'multiimg1' },
    { src: img3, alt: 'multiimg2' },
    { src: img4, alt: 'multiimg3' },
    { src: iphonepink, alt: 'multiimg4' },
    { src: iphonwhite, alt: 'multiimg5' },
    { src: iphonepink, alt: 'multiimg6' },
    { src: img2, alt: 'multiimg7' },
    { src: img3, alt: 'multiimg8' },
  ];

  // Function to handle thumbnail click
  const handleThumbnailClick = (src: string): void => {
    setSelectedImage(src);
  };

  // function handle hover

  const handleImageHover = (src: string): void => {
    setHoverImage(src)
  }
  // function handle hover leave 

  const handleHoverLeave = (): void => {
    setHoverImage(null);
  }
  const imagesDisplay = hoverImage || selectedImage;
  return (
    <div className={styles.body}>
      {/* Sidebar with thumbnails */}
      <div className={styles.imageSection}>
        <div className={styles.sideMultiImages}>
          {images.map((image, index) => (
            <div
              key={index}
              className={styles.sideImage}
              onClick={() => handleThumbnailClick(image.src)}
              onMouseEnter={() => handleImageHover(image.src)}
              onMouseLeave={handleHoverLeave}
            >
            <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>

        {/* Main image display */}
        <div className={styles.mainImage}>
          <img src={imagesDisplay} alt="main product" />
        </div>

      </div>
      <div className={styles.buySection}>
        <div className={`${styles.Button} ${styles.yellowishOrange}`}> <FaShoppingCart />go to cart</div>
        <div className={`${styles.Button} ${styles.Orange}`}> <IoMdFlash />Buy now</div>

      </div>
    </div>
  );
};

export default ImageShow;
