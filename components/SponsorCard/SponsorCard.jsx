"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./SponsorCard.module.css"

export default function SponsorCard({name, src ,img}){


    return(
                    <div className={styles.sponsorCard}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h37v37H0z"/><path stroke="#000000" d="M4 4.5h7m2 0h1m1 0h1m1 0h1m3 0h3m2 0h7M4 5.5h1m5 0h1m1 0h2m1 0h1m3 0h2m1 0h1m1 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m2 0h3m2 0h4m1 0h2m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m2 0h1m1 0h3m2 0h1m2 0h2m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m3 0h4m6 0h1m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m2 0h1m1 0h4m1 0h2m2 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h4m1 0h1m1 0h1m1 0h2M8 12.5h4m1 0h2m5 0h1m1 0h2m2 0h2m3 0h1M4 13.5h1m1 0h2m3 0h1m3 0h2m3 0h2m1 0h2m3 0h5M5 14.5h1m4 0h1m2 0h3m1 0h2m2 0h1m2 0h1m1 0h4m2 0h1M4 15.5h3m1 0h1m3 0h1m2 0h5m5 0h2m2 0h1m1 0h2M4 16.5h1m2 0h1m2 0h2m2 0h1m2 0h2m2 0h1m1 0h1m3 0h1m1 0h1m1 0h1M5 17.5h1m3 0h1m5 0h2m5 0h1m1 0h1m1 0h3m1 0h1m1 0h1M5 18.5h2m1 0h3m1 0h4m3 0h2m1 0h1m1 0h1m3 0h2m2 0h1M4 19.5h1m2 0h3m1 0h1m3 0h5m1 0h1m2 0h2m1 0h1m1 0h1m1 0h2M6 20.5h1m1 0h1m1 0h3m1 0h1m1 0h1m2 0h8m4 0h1M4 21.5h1m1 0h2m1 0h1m1 0h3m3 0h2m2 0h1m1 0h1m3 0h5M9 22.5h4m1 0h1m1 0h2m2 0h1m2 0h1m3 0h3m2 0h1M6 23.5h1m4 0h1m1 0h4m2 0h3m1 0h2m1 0h2m3 0h1M4 24.5h2m1 0h2m1 0h2m1 0h1m3 0h1m3 0h1m2 0h5M12 25.5h5m1 0h1m2 0h4m3 0h3m1 0h1M4 26.5h7m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h1m1 0h1M4 27.5h1m5 0h1m1 0h2m1 0h2m1 0h1m3 0h3m3 0h2m2 0h1M4 28.5h1m1 0h3m1 0h1m1 0h7m2 0h1m1 0h7m2 0h1M4 29.5h1m1 0h3m1 0h1m3 0h6m5 0h1m1 0h1m2 0h2M4 30.5h1m1 0h3m1 0h1m2 0h1m1 0h2m2 0h3m3 0h1m3 0h1m1 0h2M4 31.5h1m5 0h1m2 0h1m2 0h1m1 0h2m2 0h2m1 0h2m4 0h2M4 32.5h7m2 0h2m3 0h1m2 0h5m5 0h1"/></svg>
                        <img src={src} alt="" />
                        <div className={styles.sponsorName}>{name}</div>
                    </div>
        
    )
}