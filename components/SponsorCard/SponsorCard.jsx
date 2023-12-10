"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./SponsorCard.module.css"

export default function SponsorCard({user,email,tel,events,likes}){


    return(
                    <div className={styles.sponsorCard}>
                        <img src className={styles.sponsorImg} />
                        <div className={styles.sponsorName}>Ime i prezime</div>
                    </div>
        
    )
}