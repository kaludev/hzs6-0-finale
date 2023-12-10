import styles from "./Hero.module.css"
import Link from "next/link";

export default function HeroSection() {
    return (
        <header className={styles.header}>
            <section className={styles.hero}>
                <h1 className={styles.h1}>Kreiraj svoju budućnost u novoj areni.</h1>
                <p className={styles.navP}>Takmiči se, prondađi organizatore, osvoji nagrade i još mnogo toga . . .</p>
                <div className={styles.heroBtns}>
                    <Link href="/discover"><button className={`${styles.primaryButton} primaryButton`}>Pronađite lokacije</button></Link>
                    <Link href="/ranglist"><button className={`${styles.secondaryButton} secondaryButton`}>Rang lista</button></Link>
                </div>
            </section>
        </header>
    )
}