import Image from "next/image";
import styles from "./Footer.module.css";
import Link from "next/link";
import { FaInstagram, FaFacebookSquare, FaTwitter } from "react-icons/fa";

export default function Footer({dark}) {

    return (
        <footer className={styles.footer}>
            <hr className={styles.footerDevider} />
            <div className={styles.footerMain}>
                <div className={styles.footerCol}>
                    <Image width={100} height={150} className={styles.footerLogo} src="/images/logoFooter.png" alt="quizGoLogo" />
                </div>
                <div className={styles.footerCol}>
                    <h3>Stranice</h3>
                    <div className={styles.footerLink}><Link href="/">Početna</Link></div>
                    <div className={styles.footerLink}><Link href="/about">Partneri</Link></div>
                    <div className={styles.footerLink}><Link href="/arena">Pretraži lokaciju</Link></div>
                    <div className={styles.footerLink}><Link href="/ranglist">Sakupi bodove</Link></div>
                    <div className={styles.footerLink}><Link href="/activities">Rang lista</Link></div>
                </div>
                <div className={styles.footerCol}>
                    <h3>Vaši podaci</h3>
                    <div className={styles.footerLink}><Link href="">Uslovi korišćenja</Link></div>
                    <div className={styles.footerLink}><a href=""rel="noreferrer">Politika privatnosti</a></div>
                </div>
                <div className={styles.footerCol}>
                    <h3>Kontakt</h3>
                    <div className={styles.footerLink}><Link href="mailto:info@quizyGo.com">info@quizyGo.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:hr@quizyGo.com">hr@quizyGo.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:support@quizyGo.com">support@quizyGo.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:livechat@quizyGo.com">livechat@quizyGo.com</Link></div>
                    <div className={styles.footerSocial}>
                        <div className={styles.footerSocialLink}><Link href="https://www.instagram.com/" target="_blank"><FaInstagram /></Link></div>
                        <div className={styles.footerSocialLink}><Link href="https://www.facebook.com/" target="_blank"><FaFacebookSquare /></Link></div>
                        <div className={styles.footerSocialLink}><Link href="https://twitter.com/" target="_blank"><FaTwitter /></Link></div>
                    </div>
                </div>
            </div>
            <hr className={styles.footerDevider} />
            <hr className={styles.footerDevider} />
            <div className={styles.footerCopyright}>
                <p className={styles.footerCopyrightP}>© {new Date().getFullYear()}. Sva prava zadržana. quizyGo</p>
                <div className={styles.footerPowered}>
                    <p>Kreirali djaci u finalu HZS 6.0</p>
                </div>
            </div>
        </footer>
    );
}
