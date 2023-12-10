"use client"
import styles from '@components/SponsorCard/SponsorCard.module.css'
import SponsorCard from '@components/SponsorCard/SponsorCard'
import { useEffect, useState } from 'react'

const PartnersPage = () => {

    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const getPartners = async () => {
            const res = await fetch("/api/getPartners");
            const json = await res.json();
            if(json.ok){
                setPartners(json.data);
            }
        }
        getPartners();
    }, []);

    return (
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                {
                    partners.map(p => {console.log(p) ; return  <SponsorCard key={partners.indexOf(p)} name={p.name} src={p.image} img={p.qr} />})
                }
            </section>
        </section>
    )
}

export default PartnersPage