"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./SponsorCard.module.css"

export default function SponsorCard({name, img}){


    return(
                    <div className={styles.sponsorCard}>
                        <img src={img} className={styles.sponsorImg} />
                        <div className={styles.sponsorName}>{name}</div>
                    </div>
        
    )
}