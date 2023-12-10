import styles from '@components/RangListCard/RangListCard.module.css'
import RangListCards from "@components/RangListCards/RangListCards"

const RangListSection = () => {

    return (
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                <RangListCards/>
            </section>
        </section>
    )
  }
  
export default RangListSection