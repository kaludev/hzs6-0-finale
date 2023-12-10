"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./RangListCard.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaHeart, FaCalendarAlt } from "react-icons/fa";

export default function RangListCard({user,email,tel,events,likes}){


    return(
                    <div className={styles.cardEvent}>
                        <div className={styles.eventMain}>
                            <div className={styles.eventName}>Ime i prezime</div>
                            <div className={styles.eventUsername}>@username</div>
                        </div>
                        <img className={styles.eventImg} />slika
                    </div>
        
    )
}