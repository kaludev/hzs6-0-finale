
import styles from '@components/SponsorCard/SponsorCard.module.css'
import SponsorCard from '@components/SponsorCard/SponsorCard'
import { useEffect, useState } from 'react'

const PartnersPage = () => {

    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const res = await fetch("/api/getPartners");
        const json = await res.json();
        if(json.ok){
            setPartners(json.data);
        }
    }, []);

    return (
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                {
                    partners.map(p => <SponsorCard key={partners.indexOf(p)} name={p.name} img={p.img} />)
                }
            </section>
        </section>
    )
}

export default PartnersPage