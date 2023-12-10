import { useEffect, useState } from 'react';
import styles from './QuizFrom.module.css'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';

const QuizForm = ({type,submitBody}) => {
    
        const [event, setEvent] = useState({
            question1: 0,
            question2: 0
        });
        useEffect(() => {
            const handleSubmit = async () => {
                try{
                    const res = await fetch('/api/getquiz')
                    const data = await res.json();
                    if(!data.ok){
                        throw new Error(data.message);
                    }
                    console.log(data.data);
                    setEvent(data.data);
                }catch(e){
                    toast.error("Greska: " + e.message);
                }
            }  
            handleSubmit();
        }, [])
        const [question1Err, Setquestion1Err] = useState('');
        const [question2Err, Setquestion2Err] = useState('');
        const [valid, setValid] = useState("");

        const handleSubmit = () =>{
            if (!event.question1) {
                Setquestion1Err('Morate izabrati odgovor');
                setValid(false);
            }
            else{
                Setquestion1Err('');
            }

            if (!event.question2) {
                Setquestion2Err('Morate izabrati odgovor');
                setValid(false);
            }
            else{
                Setquestion2Err('');
            }
    
            if(!valid){
                toast.error("Greska u validaciji");
                return;
            } 
            const body = {
                eventType: event.eventType.value
            }
            let copy = JSON.parse(JSON.stringify(event))
            setEvent(copy)
        }
  return (
    <>
    <section className={styles.contactSec}>
            <h2>Popunite kviz kako biste zaradili poene</h2>
            <div className={styles.formContainer}>
                <form className={`${styles.contactForm} `} name="contactForm" onSubmit={handleSubmit}>
                    <div className={styles.question}>
                        <p className={styles.typeName}>Kada je sagradjen Avalski toranj?</p>

                        <input type="radio" name="question1" id="question" 
                        value={0} checked ={event.question1 == 0}
                        onChange={(e) =>{setEvent({...event,question1: e.target.value})}}/>
                        <span className={styles.eventType}>1945</span><br />

                        <input type="radio" name="question1" id="question" 
                        value={1} checked ={event.question1 == 1} 
                        onChange={(e) =>{setEvent({...event,question1: e.target.value})}}/>
                        <span className={styles.eventType}>1925</span><br />

                        <input type="radio" name="question1" id="question" 
                        value={2} checked ={event.question1 == 2}
                        onChange={(e) =>{setEvent({...event,question1: e.target.value})}}/>
                        <span className={styles.eventType}>1935</span><br />
                        <p className={styles.errorMessage}>{question1Err}</p>
                    </div>
                    <div className={styles.question}>
                        <p className={styles.typeName}>Sta se vidi sa vidikovca Avalskog tornja?</p>

                        <input type="radio" name="question2" id="question" 
                        value={0} checked ={event.question2 == 0}
                        onChange={(e) =>{setEvent({...event,question2: e.target.value})}}/>
                        <span className={styles.eventType}>Hram Svetog Save</span><br />

                        <input type="radio" name="question2" id="question" 
                        value={1} checked ={event.question2 == 1} 
                        onChange={(e) =>{setEvent({...event,question2: e.target.value})}}/>
                        <span className={styles.eventType}>Spomenik knez Mihajlu</span><br />

                        <input type="radio" name="question2" id="question" 
                        value={2} checked ={event.question2 == 2}
                        onChange={(e) =>{setEvent({...event,question2: e.target.value})}}/>
                        <span className={styles.eventType}>Dunav</span><br />
                        <p className={styles.errorMessage}>{question2Err}</p>
                    </div>
                    <div className="submitButtonBox">
                        <button type="submit"
                        className={`${styles.primaryButton} primaryButton`}
                        onClick={handleSubmit}>{"Završi"}</button>
                    </div>
                </form>
            </div>
        </section>
    </>
  )}

export default QuizForm