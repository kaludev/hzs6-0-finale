
import styles from '@components/SponsorCard/SponsorCard.module.css'
import SponsorCard from '@components/SponsorCard/SponsorCard'

const PartnersPage = () => {

    return (
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                <SponsorCard />
                <SponsorCard />
                <SponsorCard />
            </section>
        </section>
    )
}

export default PartnersPage