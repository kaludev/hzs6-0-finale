"use client";
import { Component } from "react";
import Slider from "react-slick";
import styles from "./Sponsors.module.css"

const images = [
  "/images/fonLogo.png",
  "/images/fiscalSolutionsLogo.png",
  "/images/go2Logo.png",
  "/images/hrFabrikaLogo.png",
  "/images/imgLogo.png",
  "/images/knjazLogo.png",
  "/images/unijaLogo.png",
  "/images/wargamingLogo.png",
  "/images/fonisLogo.png"
]

const settings = {
  className: "slider variable-width",
  dots: false,
  arrows: false,
  infinite: true,
  variableWidth: true,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: false,
  draggable: false
}

export default function SponsorsSection() {
  
    return (
      <section className={styles.sponsors}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className={styles.wrapper}>
              <img src={image} className={styles.image} alt="SponsorsLogo"/>
            </div>
          ))}
        </Slider>
      </section>
    );
}
