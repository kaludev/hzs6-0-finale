import styles from "./Comments.module.css"
import Link from "next/link"
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function CommentsSection(){
    return(
        <section className={styles.commCont}>
            <div className={styles.comm}>
                <img src="./images./hero.jpg" alt="" />
                <div className={styles.commName}>Peta Balašević</div>
                <div className={styles.commText}>Veb aplikacija me je potpuno osvojila svojim zabavnim kvizovima i personalizovanim sadržajem. Aplikacija je sjajna za ljubitelje kvizova i sve one koji žele proširiti svoje znanje na jednostavan i zanimljiv način.</div>
                <div className={styles.hearts}><FaHeart /><FaHeart /><FaHeart /><FaHeart /><FaHeart /></div>
            </div>
            <div className={styles.comm}>
                <img src="./images./hero.jpg" alt="" />
                <div className={styles.commName}>Peta Balašević</div>
                <div className={styles.commText}>Oduševljena sam sa quiziGo! Kvizovi su sjajno osmišljeni, a mogućnost personalizacije ih čini još boljim. Interfejs je intuitivan, a navigacija jednostavna. Osećam se kao da učim dok se zabavljam, što je zaista posebno iskustvo.</div>
                <div className={styles.hearts}><FaHeart /><FaHeart /><FaHeart /><FaHeart /><FaHeart /></div>
            </div>
            <div className={styles.comm}>
                <img src="./images./hero.jpg" alt="" />
                <div className={styles.commName}>Peta Balašević</div>
                <div className={styles.commText}>quiziGo je postao moj omiljeni način istraživanja novih informacija. Personalizovane preporuke za kvizove su pogodile tačno ono što volim. Definitivno preporučujem svima koji žele učiti kroz zabavu!</div>
                <div className={styles.hearts}><FaHeart /><FaHeart /><FaHeart /><FaHeart /><FaRegHeart /></div>
            </div>
        </section>
    )
}