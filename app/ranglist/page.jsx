import RangListCard from "@components/RangListCard/RangListCard"
import styles from '@components/RangListCard/RangListCard.module.css'

const RangListSection = () => {

    return (
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                <RangListCard />
                <RangListCard />
                <RangListCard />
            </section>
        </section>
    )
  }
  
export default RangListSection