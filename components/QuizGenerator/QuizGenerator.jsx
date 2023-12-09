"use client"
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import styles from './quizGenerator.module.css';

const QuizGenerator = () => {
    const { data:session } = useSession();
    const [file, setFile] = useState({
        value: "",
        error: false,
        errorMsg: ""
    });
    const handleChange = (e) =>{
        const copy = { ...file};
        copy.value = e.target.files[0];
        setFile(copy);
    }
    const handleSubmit = async () => {
        if(file.value){
            try{
                const formData = new FormData();
                formData.append('image', file.value);
                const res = await fetch('/api/getQuestions',{
                    method : "POST",
                    body: formData
                })
                if(!res.ok){
                    throw new Error(await res.json());
                }
                toast.success("Uspesno dodat quiz",{
                    position: toast.POSITION.TOP_RIGHT
                });
            }catch(e){
                toast.error("Greska: " + e.message);
            }
        }else{
            const copy = { ...file };
            copy.error = true;
            copy.errorMsg = "Niste odabrali sliku";
            setFile(copy);
        }
    };
    return (

        session?.user ? (<div className={styles.main}>
            <input type="file" name="image" id="image" onChange={handleChange}/>
            <button type="button" onClick={handleSubmit}>Submit</button>
            <p className={styles.errorMessage}>{file.errorMsg}</p>
        </div>) : <div className={styles.main}>
            {/*Nikola promeni ovo*/}
            <p>Molimo ulogujte se da bi nastavili</p>
        </div>

    )
}

export default QuizGenerator