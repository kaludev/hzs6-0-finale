"use client";

import styles from "./Preferences.module.css"
import { FaUser, FaPalette, FaScroll, FaDribbble, FaPizzaSlice, FaBeer, FaCanadianMapleLeaf } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import { useRouter } from "next/navigation";

export default function PreferencesSection() {
    const router =  useRouter();
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
    const handleSubmit = async () =>{
        try{
            const res = await fetch('/api/user/setpreferenced');
            const data = await res.json();
            console.log(data);
            if(!data.ok){
                throw new Error(data.message);
            }

            toast.success('Uspesno izabrane preference');
            router.push('/')
        }catch(e){
            toast.error(e.message)
        }
        

        
    }

    return (
        <section className={styles.prefCont}>
            <div className={styles.prefName}>Godine</div>
            <div className={styles.prefMain} >
                <div className={selectedGod !== "1" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectGod("1")}}>
                    <div className={styles.prefIcon}><FaUser /></div>
                    <div className={styles.prefText}>18+</div>
                </div>
                <div className={selectedGod !== "2" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectGod("2")}}>
                    <div className={styles.prefIcon}><FaUser /></div>
                    <div className={styles.prefText}>18-36</div>
                </div>
                <div className={selectedGod !== "3" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectGod("3")}}>
                    <div className={styles.prefIcon}><FaUser /></div>
                    <div className={styles.prefText}>36-54</div>
                </div>
                <div className={selectedGod !== "4" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectGod("4")}}>
                    <div className={styles.prefIcon}><FaUser /></div>
                    <div className={styles.prefText}>54+</div>
                </div>
            </div>
            <div className={styles.prefName}>Interesovanja</div>
            <div className={styles.prefMain} >
                <div className={selectedProf !== "1" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectProf("1")}}>
                    <div className={styles.prefIcon}><FaPalette /></div>
                    <div className={styles.prefText}>Umetnost</div>
                </div>
                <div className={selectedProf !== "2" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectProf("2")}}>
                    <div className={styles.prefIcon}><FaScroll /></div>
                    <div className={styles.prefText}>Kultura</div>
                </div>
                <div className={selectedProf !== "3" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectProf("3")}}>
                    <div className={styles.prefIcon}><FaBeer /></div>
                    <div className={styles.prefText}>Zabava</div>
                </div>
                <div className={selectedProf !== "4" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectProf("4")}}>
                    <div className={styles.prefIcon}><FaPizzaSlice /></div>
                    <div className={styles.prefText}>Hrana</div>
                </div>
                <div className={selectedProf !== "5" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectProf("5")}}>
                    <div className={styles.prefIcon}><FaCanadianMapleLeaf /></div>
                    <div className={styles.prefText}>Priroda</div>
                </div>
                <div className={selectedProf !== "6" ? styles.prefBox : styles.prefBoxSelected} onClick={() =>{handleSelectProf("6")}}>
                    <div className={styles.prefIcon}><FaDribbble /></div>
                    <div className={styles.prefText}>Sport</div>
                </div>
            </div>
            <button onClick={handleSubmit} className={`${styles.primaryButton} primaryButton`}>Prihvati</button>
            <div className={styles.prefName}></div>
            <div className={styles.prefMain} >
                
            </div>
        </section>
    )
}