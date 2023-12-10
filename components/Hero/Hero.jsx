import styles from "./Hero.module.css"
import Link from "next/link";

export default function HeroSection() {
    return (
        <header className={styles.header}>
            <section className={styles.hero}>
                <h1 className={styles.h1}>Istražite novi put do vašeg znanja</h1>
                <p className={styles.navP}>Dobrodošli na mesto gde se učenje pretvara u avanturu !!</p>
                <div className={styles.heroBtns}>
                    <Link href="/discover"><button className={`${styles.primaryButton} primaryButton`}>Pronađite lokacije</button></Link>
                    <Link href="/ranglist"><button className={`${styles.secondaryButton} secondaryButton`}>Rang lista</button></Link>
                </div>
            </section>
        </header>
    )
}