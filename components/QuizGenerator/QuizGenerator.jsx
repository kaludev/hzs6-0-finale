"use client"
import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import styles from './quizGenerator.module.css';
import Webcam from "react-webcam";

const QuizGenerator = () => {
    const { data:session } = useSession();
    const webcamRef = useRef(null);
    const [file, setFile] = useState({
        value: "",
        error: false,
        errorMsg: ""
    });
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
    const handleSs = () => {
        const copy = { ...file};
        const imageSrc = webcamRef.current.getScreenshot();
        copy.value = imageSrc;
        setFile(copy);
        handleSubmit();
    }
    return (

        session?.user ? (<div className={styles.main}>
            <h1>Quiz Generator</h1>
            <Webcam
                className={styles.webcam}
                audio={false}
                height={window.height}
                width={window.width}
                screenshotFormat="image/jpeg"
                ref={webcamRef}
                videoConstraints={{
                    facingMode: "environment",
                    height:window.height,
                    width:window.width
                }}
            />
            <button  onClick={handleSs}>
                Capture photo
            </button>
            <p className={styles.errorMessage}>{file.errorMsg}</p>
        </div>) : <div className={styles.main}>
            {/*Nikola promeni ovo*/}
            <p>Molimo ulogujte se da bi nastavili</p>
        </div>

    )
}

export default QuizGenerator