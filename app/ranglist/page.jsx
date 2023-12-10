import RangListCard from "@components/RangListCard/RangListCard"
import styles from '@components/RangListCard/RangListCard.module.css'

const RangListSection = () => {

    return (
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                <RangListCards />
            </section>
        </section>
    )
  }
  
export default RangListSection