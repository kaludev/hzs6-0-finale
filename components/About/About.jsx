import styles from "./About.module.css"
import Link from "next/link"

export default function AboutSection(){
    return(
        <section className={styles.about}>
            <div className={styles.aboutFirst}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Brzo lako i jednostavno</h3>
                        <div><p></p></div>
                        <div className={`${styles.primaryButton} primaryButton`}><Link href="/arena">Prijavi se</Link></div>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero2.jpg" alt="" />
            </div>
            <div className={styles.aboutSec}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Gde god da se nalazite</h3>
                        <div><p></p></div>
                        <Link href="/arena"><div className={`${styles.primaryButton} primaryButton`}>Rezerviši termin</div></Link>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero3.jpg" alt="" />
            </div>
        </section>
    )
}