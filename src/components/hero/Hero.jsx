import React from "react";
import styles from "./Hero.module.scss";

const Hero = (props) => {
  const { bgImage } = props;
  return (
    <div
      className={styles.bgImg}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h2 className={styles.title}>Thrive in your career</h2>
      <p className={styles.text}>
        Learn the basics to start a new career or develop advanced skills and go
        for a promotion.
      </p>
    </div>
  );
};

export default Hero;
