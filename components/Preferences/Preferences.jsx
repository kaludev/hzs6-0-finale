"use client";

import styles from "./Preferences.module.css"
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function PreferencesSection() {

    const [selectedGod, setSelectedGod] = useState("");
    const [selectedProf, setSelectedProf] = useState("");
    const [selectedInter, setSelectedInter] = useState("");

    function handleSelectGod(n){
        setSelectedGod(n);
    }
    function handleSelectProf(n){
        setSelectedProf(n);
    }
    function handleSelectInter(n){
        setSelectedInter(n);
    }

    return (
        <section className={styles.prefCont}>
            <div className={styles.prefName}>Godine</div>
            <div className={styles.prefMain} >
                <div className={selectedGod !== "1" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectGod("1")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>18+</div>
                </div>
                <div className={selectedGod !== "2" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectGod("2")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>18-36</div>
                </div>
                <div className={selectedGod !== "3" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectGod("3")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>36-54</div>
                </div>
                <div className={selectedGod !== "4" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectGod("4")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>54+</div>
                </div>
            </div>
            <div className={styles.prefName}>Zanimanje</div>
            <div className={styles.prefMain} >
                <div className={selectedProf !== "1" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectProf("1")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>18+</div>
                </div>
                <div className={selectedProf !== "2" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectProf("2")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>18-36</div>
                </div>
                <div className={selectedProf !== "3" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectProf("3")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>36-54</div>
                </div>
                <div className={selectedProf !== "4" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectProf("4")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>54+</div>
                </div>
            </div>
            <div className={styles.prefName}>Interesovanja</div>
            <div className={styles.prefMain} >
                <div className={selectedInter !== "1" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectInter("1")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>18+</div>
                </div>
                <div className={selectedInter !== "2" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectInter("2")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>18-36</div>
                </div>
                <div className={selectedInter !== "3" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectInter("3")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>36-54</div>
                </div>
                <div className={selectedInter !== "4" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectInter("4")}}>
                    <div className={styles.prefIcon}><FaRegUser /></div>
                    <div className={styles.prefText}>54+</div>
                </div>
            </div>
        </section>
    )
}