import styles from "./FinalSection.module.css"
import Link from "next/link"

export default function FinalSection(){
    return(
        <section className={styles.final}>
            <div className={styles.finalMain}>
                <div className={styles.finalText}>Personacija samo za vas.</div>
                <div className={styles.finalDesc}>Na osnovu vaših interesovanja, lokacije, i drugih faktora pogledajte preporuke presonalizovane samo za vas.</div>
            </div>
            <Link href="/select"><div className={`${styles.primaryButton} primaryButton`}>Pogledaj odmah</div></Link>
        </section>
    )
}