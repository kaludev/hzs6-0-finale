"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./RangListCard.module.css"

export default function RangListCard({card}){


    return(
                    <div className={styles.cardEvent}>
                        <div className={styles.eventMain}>
                            <div className={styles.eventName}>{card?.name}</div>
                            <div className={styles.eventUsername}>@{card?.username}</div>
                        </div>
                        <div className={styles.points}>{card?.points}</div>
                        <img src={card?.image} className={styles.eventImg} />
                    </div>
        
    )
}