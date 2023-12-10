"use client"
import Image from "next/image";
import styles from "./Profile.module.css"
import Link from "next/link";
import { FaCog,FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function ProfileSection(){
    const { data:session } = useSession()
    return(
        <section className={styles.profileCard}>
        <div className={styles.profileCardMain}>
            <h2>O nalogu</h2>
            <hr className={styles.divider} />
            <div className={styles.profileHeader}>
                {session?.user.image && <Image className={styles.userPhoto} src={session?.user.image} alt="Profile" width={80} height={80}/>}
                <div className={styles.userInfo}>
                    <div className={styles.userFirstName}>{session?.user.name}</div>
                    <div className={styles.username}>@{session?.user.username}</div>
                </div>
                {/* {(form || requests || events) ?
                    <div onClick={form?  showForm : requests ? showRequests : showEvents} className={styles.userSettings}>
                        <FaTimes/>
                    </div>
                    :
                    <div onClick={showSettings} className={styles.userSettings}>
                        {settings? <FaTimes/> : <FaCog />}
                    </div>
                } */}
            </div>
            <div className={styles.progressPoints}>{session?.user.points} poena</div>
            <div className={styles.progressBar}></div>


            {/* {!form && !settings && !requests && !events && 
                <div className={styles.profileDesc}>
                    <div className={styles.descRow}>
                        <div className={styles.descRowMain}>
                            <div className={styles.descTitle}>Podešavanja naloga</div>
                            <div className={styles.descP}>Pregledajte i uredite vaše podatke</div>
                        </div>
                        <div onClick={showSettings} className={`${styles.secondaryButton} secondaryButton`}>
                            Podešavanja
                        </div>
                    </div>
                    <div className={styles.descRow}>
                        <div className={styles.descRowMain}>
                            <div className={styles.descTitle}>Odjavite se</div>
                            <div className={styles.descP}>Odjavite se kako bi ste se prijavili pomoću drugog naloga</div>
                        </div>
                        <div onClick={handleSignOut} className={`${styles.secondaryButton} secondaryButton`}>
                            Odjavi se
                        </div>
                    </div>
                    <div className={styles.descRow}>
                        <div className={styles.descRowMain}>
                            <div className={styles.descTitle}>Deaktivirajte vaš nalog</div>
                            <div className={styles.descP}>Ovde možete deaktivirati nalog i trajno ga obrisati iz svih naših baza, kao i sve podatke povezane sa njim</div>
                        </div>
                        <div onClick={handleDeactivate} className={`${styles.secondaryButton} ${styles.warningButton} secondaryButton`}>
                            {deactivating ? "Deaktiviranje" : "Deaktiviraj"}
                        </div>
                    </div>
                </div>
            } */}
            
        </div>
    </section>
    )
}