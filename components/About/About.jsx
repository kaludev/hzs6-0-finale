import styles from "./About.module.css"
import Link from "next/link"

export default function AboutSection(){
    return(
        <section className={styles.about}>
            <div className={styles.aboutFirst}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Brzo lako i jednostavno</h3>
                        <div><p>Želimo inspirisati ljude da neprestano uče i istražuju, koristeći inovativne tehnologije kako bismo im pružili edukativna iskustva koja su istovremeno i uzbudljiva i korisna. Kroz quiziGo, želimo stvoriti globalnu zajednicu istomišljenika koji dele ljubav prema učenju kroz igru skupljajuci vaucere i popuste.</p></div>
                        <div className={`${styles.primaryButton} primaryButton`}><Link href="/gatherPoints">Sakupi bodove</Link></div>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero5.jpg" alt="" />
            </div>
            <div className={styles.aboutSec}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Gde god da se nalazite</h3>
                        <div><p>quiziGo nije samo platforma za kvizove. Mi smo entuzijastični tim strastvenih pojedinaca posvećenih stvaranju nezaboravnih iskustava u učenju i zabavi. Naš cilj je približiti znanje svima kroz interaktivne i uzbudljive kvizove, nudeći korisnicima priliku da istraže svet oko sebe na jedinstven način.</p></div>
                        <Link href="/discover"><div className={`${styles.primaryButton} primaryButton`}>Pronadji sada</div></Link>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero6.jpg" alt="" />
            </div>
        </section>
    )
}