import { useEffect, useState } from 'react';
import styles from './QuizFrom.module.css'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';

const QuizForm = ({id}) => {
        console.log(id);
        const [event, setEvent] = useState({
            question1: 0,
            question2: 0
        });
        const [poeni, setPoeni] = useState(null);
        useEffect(() => {
            const active_quiz = async () => {
              const res_a = await fetch("/api/acceptQuiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            });
            const json_a = await res_a.json();
            console.log("json_a", json_a);
            if(json_a.ok){
                console.log("Uspesno dodat active quiz");
            }
            
            }
            active_quiz();
          }, []);
        useEffect(() => {
            const handleSubmit = async () => {
                try{
                    const res = await fetch('/api/getquiz')
                    const data = await res.json();
                    if(!data.ok){
                        throw new Error(data.message);
                    }
                    console.log(data.data);
                    setPoeni(data.data.reward_points);
                }catch(e){
                    toast.error("Greska: " + e.message);
                }
            }  
            handleSubmit();
        }, [])
        const [question1Err, Setquestion1Err] = useState('');
        const [question2Err, Setquestion2Err] = useState('');
        const [valid, setValid] = useState(true);

        const handleSubmit = async (e) =>{
            e.preventDefault();
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
            let copy = JSON.parse(JSON.stringify(event))
            setEvent(copy);
            let points = 0;
            console.log(document.getElementsByName("question1"));
            if((document.getElementById("true1").checked && !document.getElementById("true2").checked) || (!document.getElementById("true1").checked && document.getElementById("true2").checked)){
                points += poeni / 4;
            }
            else if(document.getElementById("true1").checked && document.getElementById("true2").checked){
                points += poeni / 2;
            }
            const res = await fetch("/api/updatePoints", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({points})
            });
            const json = await res.json();
            if(json.ok){
                console.log("Bodovi uspesno updateovani");
            }
            else{
                console.log(json.error);
            }
        }
  return (
    <>
    {
        id == "657571d08c6b5cb6afeddfd2" && (
            <section className={styles.contactSec}>
            <h2>Popunite kviz kako biste zaradili poene</h2>
            <div className={styles.formContainer}>
                <form className={`${styles.contactForm} `} name="contactForm" onSubmit={handleSubmit}>
                    <div className={styles.question}>
                        <p className={styles.typeName}>Koliko krstova se nalazi na vrhu Hrama Svetog Save?</p>

                        <input type="radio" name="question1" id="question" 
                        value={0} checked ={event.question1 == 0}
                        onChange={(e) =>{setEvent({...event,question1: e.target.value})}}/>
                        <span className={styles.eventType}>17</span><br />

                        <input type="radio" name="question1" id="true1" 
                        value={1} checked ={event.question1 == 1} 
                        onChange={(e) =>{setEvent({...event,question1: e.target.value})}}/>
                        <span className={styles.eventType}>18</span><br />

                        <input type="radio" name="question1" id="question" 
                        value={2} checked ={event.question1 == 2}
                        onChange={(e) =>{setEvent({...event,question1: e.target.value})}}/>
                        <span className={styles.eventType}>16</span><br />
                        <p className={styles.errorMessage}>{question1Err}</p>
                    </div>
                    <div className={styles.question}>
                        <p className={styles.typeName}>Koje godine je zapoceta izgradnja?</p>

                        <input type="radio" name="question2" id="question" 
                        value={0} checked ={event.question2 == 0}
                        onChange={(e) =>{setEvent({...event,question2: e.target.value})}}/>
                        <span className={styles.eventType}>1932</span><br />

                        <input type="radio" name="question2" id="question" 
                        value={1} checked ={event.question2 == 1} 
                        onChange={(e) =>{setEvent({...event,question2: e.target.value})}}/>
                        <span className={styles.eventType}>1940</span><br />

                        <input type="radio" name="question2" id="true2" 
                        value={2} checked ={event.question2 == 2}
                        onChange={(e) =>{setEvent({...event,question2: e.target.value})}}/>
                        <span className={styles.eventType}>1935</span><br />
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
        )
    }
    {
        id == "657564c1b91053e3c8bc0c53" && (<section className={styles.contactSec}>
            <h2>Popunite kviz kako biste zaradili poene</h2>
            <div className={styles.formContainer}>
                <form className={`${styles.contactForm} `} name="contactForm" onSubmit={handleSubmit}>
                    <div className={styles.question}>
                        <p className={styles.typeName}>Kada je sagradjen Avalski toranj?</p>

                        <input type="radio" name="question1" id="true1" 
                        value={0} checked ={event.question1 == 0}
                        onChange={(e) =>{setEvent({...event,question1: e.target.value})}}/>
                        <span className={styles.eventType}>1965</span><br />

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

                        <input type="radio" name="question2" id="true2" 
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
        </section>)
    }
    {
        id == "657576a78c6b5cb6afeddfd3" && (<section className={styles.contactSec}>
            <h2>Popunite kviz kako biste zaradili poene</h2>
            <div className={styles.formContainer}>
                <form className={`${styles.contactForm} `} name="contactForm" onSubmit={handleSubmit}>
                    <div className={styles.question}>
                        <p className={styles.typeName}>U cast koje drzave je podignut spomenik?</p>

                        <input type="radio" name="question1" id="question" 
                        value={0} checked ={event.question1 == 0}
                        onChange={(e) =>{setEvent({...event,question1: e.target.value})}}/>
                        <span className={styles.eventType}>Spanija</span><br />

                        <input type="radio" name="question1" id="question" 
                        value={1} checked ={event.question1 == 1} 
                        onChange={(e) =>{setEvent({...event,question1: e.target.value})}}/>
                        <span className={styles.eventType}>Rusija</span><br />

                        <input type="radio" name="question1" id="true1" 
                        value={2} checked ={event.question1 == 2}
                        onChange={(e) =>{setEvent({...event,question1: e.target.value})}}/>
                        <span className={styles.eventType}>Francuska</span><br />
                        <p className={styles.errorMessage}>{question1Err}</p>
                    </div>
                    <div className={styles.question}>
                        <p className={styles.typeName}>U koju reku gleda ratnik?</p>

                        <input type="radio" name="question2" id="question" 
                        value={0} checked ={event.question2 == 0}
                        onChange={(e) =>{setEvent({...event,question2: e.target.value})}}/>
                        <span className={styles.eventType}>Dunav</span><br />

                        <input type="radio" name="question2" id="true2" 
                        value={1} checked ={event.question2 == 1} 
                        onChange={(e) =>{setEvent({...event,question2: e.target.value})}}/>
                        <span className={styles.eventType}>Sava</span><br />

                        <input type="radio" name="question2" id="question" 
                        value={2} checked ={event.question2 == 2}
                        onChange={(e) =>{setEvent({...event,question2: e.target.value})}}/>
                        <span className={styles.eventType}>Zapadna Morava</span><br />
                        <p className={styles.errorMessage}>{question2Err}</p>
                    </div>
                    <div className="submitButtonBox">
                        <button type="submit"
                        className={`${styles.primaryButton} primaryButton`}
                        onClick={handleSubmit}>{"Završi"}</button>
                    </div>
                </form>
            </div>
        </section>)
    }
    </>
  )}

export default QuizForm