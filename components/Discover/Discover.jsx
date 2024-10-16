"use client"
import Map from "@components/Map/Map";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styles from "./Discover.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Discover = () => {
    const { data:session } = useSession();
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const webcamRef = useRef(null);
    const [poeni, setPoeni] = useState(null);
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
                marker.lat = data?.data.locations[0].latLng.latitude;
                marker.lng = data?.data.locations[0].latLng.longitude;

                console.log(marker); // Ensure that the marker is updated here

                await setMarker({...marker}); 

                const res2 = await fetch('/api/getquiz')
                const data2 = await res.json();
                    if(!data.ok){
                        throw new Error(data.message);
                    }

                setPoeni(data2.data.reward_points);
                const points = session?.user.points + poeni / 2;

                const res3 = await fetch("/api/updatePoints", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({points})
                });
                const json3 = await res3.json();
                if(json3.ok){
                    console.log("Bodovi uspesno updateovani");
                }
                else{
                    console.log(json3.error);
                }
            
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
                    {loaded && marker && 
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