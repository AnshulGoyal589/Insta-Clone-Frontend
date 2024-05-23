import React, { useEffect, useState } from 'react';
import styles from './DisplayUser.module.css';

const DisplayUser = (props) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(`../../profileimages/${props.userImage}.jpeg`);
        setImageSrc(image.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, [props.userImage]);

  if (!imageSrc) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.imageBox}>
        <img className={styles.imageChild} src={imageSrc} alt="" />
      </div>
      <div className={styles.main2} > 
        {/* <h4 style={{color:'#F5F5F5'}} > {props.userID} </h4>   */}
        {props.name 
          ? 
          <p style={{color:'#F5F5F5'}} > {props.userID} </p>
          :
          <p style={{color:'#F5F5F5'}} > {props.usernameID} </p>
        }
        {props.name 
          ? 
          <p style={{color:'#A8A8A8' , fontSize:'14px'}} > {props.name} </p>
          :
          <p style={{color:'#A8A8A8' , fontSize:'12px important'}} > Suggested for you </p>
        }
      </div>
      <div className={styles.main3} >
         { props.name  ? "Switch" : "Follow" } 
      </div>
    </div>
  );
};

export default DisplayUser;
