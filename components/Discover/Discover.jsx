"use client"
import Map from "@components/Map/Map";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styles from "./Discover.module.css";

const Discover = () => {
    const { data:session } = useSession();
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const webcamRef = useRef(null);
    const [file, setFile] = useState({
        value: {},
        error: false,
        errorMsg: ""
    });
    const [marker, setMarker] = useState({});
    const handleSubmit = async (file) => {
        console.log(file.value)
        if(file.value){
            try{
                const formData = new FormData();
                formData.append('image', file.value);
                const res = await fetch('/api/getlandmark',{
                    method : "POST",
                    body: formData
                })
                const data = await res.json();
                if(!data.ok){
                    throw new Error(await data.message);
                }
                console.log(data.data);
                setMarker(data?.data.locations[0].latlng);
                toast.success("Uspesno identifikovana lokacija",{
                    position: toast.POSITION.TOP_RIGHT
                });
                setLoading(false);
                setLoaded(true);
            }catch(e){
                toast.error("Greska: " + e.message);
            }
            setLoading(false);
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
        setLoading(true);
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
            
                    {loading ? 
                    <div className={styles.main}>
                        <div className={styles.notFound}>
                            <span className={styles.colored}>Ucitavanje</span><br />Sacekajte da AI identifikuje lokaciju
                        </div>
                    </div> : 
                    !loaded && <div className={styles.webCont}>
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
                        <div onClick={handleSs} className={`${styles.primaryButton} primaryButton`}>Slikaj</div>
                    </div>
                    }
                    {loaded && 
                        <>
                            <Map  marker ={marker}/>
                        </>
                    }
                 {/* <div className={styles.main}>
                     <div className={styles.notFound}>
                         <span className={styles.colored}>Morate biti na telefonu</span><br />Da biste identifikovali mesto morate biti na telefonu
                     </div>
                 </div> */}
            <p className={styles.errorMessage}>{file.errorMsg}</p>
        </div>) : 
        <div className={styles.main}>
            <div className={styles.notFound}>
                <span className={styles.colored}>Morate se prijaviti.</span><br />Da biste radili kvizove i zaradili poene morate se prvo prijaviti.
            </div>
        </div>

    )
}

export default Discover