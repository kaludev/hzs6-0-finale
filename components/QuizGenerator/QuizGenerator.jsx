"use client"
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import styles from './quizGenerator.module.css';
import Webcam from "react-webcam";
import QuizForm from 'components/QuizFrom/QuizFrom';
import { useParams } from 'next/navigation';

const QuizGenerator = ({id}) => {
    const { data:session } = useSession();
    const webcamRef = useRef(null);
    const [file, setFile] = useState({
        value: {},
        error: false,
        errorMsg: ""
    });
    const handleSubmit = async (file) => {
        console.log(file.value)
        if(file.value){
            try{
                const formData = new FormData();
                formData.append('image', file.value);
                const res = await fetch('/api/getQuestions',{
                    method : "POST",
                    body: formData
                });
                const res_a = await fetch("/api/acceptQuiz", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id})
                });
                const json_a = await res_a.json();
                if(json_a.ok){
                    console.log("Uspesno dodat active quiz");
                }
                toast.success("Uspesno dodat quiz",{
                    position: toast.POSITION.TOP_RIGHT
                });
            }catch(e){
                //toast.error("Greska: " + e.message);
            }
        }else{
            const copy = { ...file };
            copy.error = true;
            copy.errorMsg = "Niste odabrali sliku";
            setFile(copy);
        }
    };
    const dataURLtoBlob = (dataurl) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }
    const handleSs = async () => {
        const copy = { ...file};
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(copy);
        copy.value = dataURLtoBlob(imageSrc);
    
        console.log(copy);
        setFile(copy);
        console.log(copy);
        setFile(copy);
        console.log(copy);
        console.log(file);
        handleSubmit(copy);
        console.log(file);
    }
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
      
      function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
      
        useEffect(() => {
          function handleResize() {
            setWindowDimensions(getWindowDimensions());
          }
      
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []);
      
        return windowDimensions;
      }
      
      useEffect(() => {
        getWindowDimensions();
      },[])
      
    return (

        session?.user ? (<div className={styles.main}>
            <QuizForm id={id} />
            {innerWidth < 1024 ?
                <>
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
                    <button className={`${styles.primaryButton} primaryButton`} onClick={handleSs}>
                        Capture photo
                    </button>
                </> : ""}
            <p className={styles.errorMessage}>{file.errorMsg}</p>
        </div>) : 
        <div className={styles.main}>
            <div className={styles.notFound}>
                <span className={styles.colored}>Morate se prijaviti.</span><br />Da biste radili kvizove i zaradili poene morate se prvo prijaviti.
            </div>
        </div>

    )
}

export default QuizGenerator