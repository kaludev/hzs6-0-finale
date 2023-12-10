"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./RangListCard.module.css"
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
export default function RangListCard({card}){


    return(
                    <div className={styles.cardEvent}>
                        <div className={styles.eventMain}>
                            <div className={styles.eventName}>{card?.name}</div>
                            <div className={styles.eventUsername}>@{card?.username}</div>
                        </div>
                        <div className={styles.likes}>
                            <FaHeart/>
                            <div className={styles.points}>{card?.points}</div>
                            {card?.points<500 ? <Image width={50}  height={50} src="/images/bronzeLogo.png" alt="bronze" /> :
                            card?.points<1500 ? <Image width={50} height={50} src="/images/silverLogo.png" alt="silver" /> : 
                            <Image width={50} height={50} src="/images/GoldenLogo.png" alt="bronze" />}
                        </div>
                        <img src={card?.image} className={styles.eventImg} />
                    </div>
        
    )
}