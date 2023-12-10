"use client"
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import styles from './quizGenerator.module.css';
import Webcam from "react-webcam";
import QuizForm from 'components/QuizFrom/QuizFrom';

const QuizGenerator = () => {
    const { data:session } = useSession();
    const webcamRef = useRef(null);
    const [file, setFile] = useState({
        value: {},
        error: false,
        errorMsg: ""
    });
    const handleSubmit = async () => {
        console.log(file.value)
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
    const dataURLtoBlob = (dataurl) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }
    const handleSs = () => {
        const copy = { ...file};
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        copy.value = dataURLtoBlob(imageSrc);
    
        console.log(copy);
        setFile(copy);
        console.log(copy);
        console.log(file)
        handleSubmit();
        console.log(file)
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
            <QuizForm />
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
                    <button  onClick={handleSs}>
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