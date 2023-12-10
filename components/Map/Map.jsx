"use client"
import styles from './Map.module.css'
import { useSession } from 'next-auth/react';
import {useState, useEffect} from 'react';
import { GoogleMap, MarkerF, DirectionsService, DirectionsRenderer, useJsApiLoader, InfoWindowF } from '@react-google-maps/api';
import Link from 'next/link';

const Map = ({marker}) => {
    const {data: session} = useSession();
    const [yourLocation, setYourLocation] = useState({});

    const [directions, setDirections] = useState([]);

    const [quizes, setQuizes] = useState([]);
    const [location, setLocation] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })

    useEffect(() => {
      console.log(isLoaded);
          if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition((pos) => {
              console.log(pos);
              setYourLocation({lat: pos.coords.latitude, lng: pos.coords.longitude});          
          }, (err) => {
              console.log(err);
          });
          }
          fetch("/api/getQuizes").then(data => data.json()).then((json) => {
              console.log(json);
              setQuizes(json.data);
          });
  }, [isLoaded]);
    if(!marker){

    

        function removeDuplicates(arr) {
            let unique = [];
            arr.forEach(element => {
                if (!unique.includes(element)) {
                    unique.push(element);
                }
            });
            return unique;
        }

        const updateLocation = (quiz, location) => {
            setLocation((prev) => {
                const arr = [...prev, {...quiz, location}];
                return removeDuplicates(arr);
            });
        }

        const handleGeocoding = async (x) => {
            const resg = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                x.place
            )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);

            const jsong = await resg.json();
            console.log("jsong", jsong.results[0].geometry.location);
            x.location = jsong.results[0].geometry.location;
        }

        useEffect(() => {

                quizes.map(async (x) => {
                        const resg = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                            x.place
                        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);

                        const jsong = await resg.json();
                        console.log("jsong", jsong.results[0].geometry.location);
                        x.location = jsong.results[0].geometry.location;
                });
                console.log("quizes posle x.location u map", quizes);
                setLocation(quizes);
        }, [quizes.length > 0, isLoaded]);
      
      }
      const containerStyle = {
        width: '100%',
        height: '100%',
      };

    useEffect(() => {
        console.log(session?.user);
    }, [session]);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };
    
    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
    };
    return (
      <>
      {
        isLoaded && (
          <div className={styles.iframeMain}>
            <GoogleMap mapContainerStyle={containerStyle} center={yourLocation} zoom={10}>
                {
                    yourLocation && (
                    <>
                        {console.log(yourLocation)}
                        <MarkerF position={yourLocation} title="Your location" />
                    </>
                    )
                }
                {
                    !marker ? 
                      <>
                        {console.log(location)}
                        {
                        location.length > 0 && location.map(loc => 
                            <MarkerF key={location.indexOf(location)} onClick={() => handleMarkerClick(loc)} position={loc.location} title={loc.name} />
                        )
                        }
                      </>
                    :
                      <MarkerF key={1} onClick={() => handleMarkerClick(marker)} title='Hram svetog save' position={marker} />
                }
                {selectedMarker && (
              <InfoWindowF
                position={selectedMarker?.location || selectedMarker}
                onCloseClick={handleInfoWindowClose}
              >
 
                <div className={styles.infoCont}>
                  
                  <h4>{selectedMarker?.name}</h4>
                  <h5>{`Broj zadataka: ${selectedMarker?.task?.length || 2}`}</h5>
                  <h3>{`Nagrada: ${selectedMarker?.reward_points || 150}`}</h3>
                  <Link href={`/quiz/${selectedMarker?._id || '657571d08c6b5cb6afeddfd2' }`}><div className={`${styles.primaryButton} primaryButton`}>Zapocni kviz</div></Link>

                </div>
              </InfoWindowF>
                )} 
            </GoogleMap>
            </div>
        )
      }
      </>
    );
}

export default Map;