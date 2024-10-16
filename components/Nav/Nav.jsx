"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css"
import { FaBars } from "react-icons/fa";
import { usePathname} from 'next/navigation'
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = ({setMenuVisible}) => {
  const router = useRouter();
  const pathname = usePathname()
  const {data: session} = useSession();
  const [ providers, setProviders ] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const SCROLL_TRIGGER_PX = 0;

  useEffect(() => {
    function check() {
        setScrolled(window.scrollY > SCROLL_TRIGGER_PX);
    }
    
    if(window.location.pathname != "/"){
      setScrolled(true);
    }else{
      setScrolled(false);
      window.addEventListener("scroll", check)
      return () => {
        window.removeEventListener("scroll", check);
      }
    }
},[pathname])

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);
  useEffect(() =>{
    if(session?.user){
      if(!session?.user.isPersonalized){
        router.push('/preferences');
      }
    }
    
  },[session])
  return (
    <div className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
              <Link href="/">
                <img src={scrolled ? "/images/logo.png" : "/images/logoWhite.png"} alt="Logo" />
              </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
              <Link className={styles.navLink} href="/partners">Partneri</Link>
          </li>
          <li>
              <Link className={styles.navLink} href="/discover">Pretraži lokaciju</Link>
          </li>
          <li>
              <Link className={styles.navLink} href="/gatherPoints">Sakupi bodove</Link>
          </li>
          <li>
              <Link className={styles.navLink} href="/ranglist">Rang Lista</Link>
          </li>
          <li>
          {session?.user ? (
            <div className={styles.navProfile}>
              <button type="button" onClick={async () =>{await signOut(); window.location.href ='/'}} className={`${styles.primaryButton} primaryButton`}>
                {" "}
                Odjavi se
              </button>
              <Link href="/profile">
                <div className={styles.navProfileImageBack}>
                  <Image
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className={styles.profilePic}
                    alt="profile"
                  ></Image>
                </div>
              </Link>
            </div>
            ) : (
              providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className={`${styles.primaryButton} primaryButton`}
                >Prijavi se</button>
              ))
            )}
          </li>
        </ul>
      </nav>
      <div className={`${styles.menuBtn}`} onClick={(e) => {e.stopPropagation(); setMenuVisible(true); }}>
        <FaBars />
      </div>
    </div>
  );
};

export default Nav;
