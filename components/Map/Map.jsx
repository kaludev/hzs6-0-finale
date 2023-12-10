"use client"
import styles from './Map.module.css'
import { useSession } from 'next-auth/react';
import {useState, useEffect} from 'react';
import { GoogleMap, MarkerF, DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const Map = ({marker}) => {
    const [yourLocation, setYourLocation] = useState({});
    const {data: session} = useSession();
    const [quizes, setQuizes] = useState([]);
      const [location, setLocation] = useState([]);
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })
    //const [closestMarker, setClosestMarker] = useState(null);
    //const [directions, setDirections] = useState(null);
    //const [closestEvent, setClosestEvent] = useState(null);
    if(!marker){
      
      

      useEffect(() => {

      }, [isLoaded])

      const {data: session} = useSession();

      useEffect(() => {
          if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((pos) => {
              console.log(pos);
              setYourLocation({lat: pos.coords.latitude, lng: pos.coords.longitude});          
            }, (err) => {
              console.log(err);
            });
          }
          const getQuizes = async () => {
              const res = await fetch("/api/getQuizes");
              const json = await res.json();
              console.log(json);
              setQuizes(json.data);   
          }
          getQuizes();
          
          
        }, []);

        const updateLocation = (data) => {
            setLocation((prev) => [...prev, data]);
        }

        useEffect(() => {
            console.log("aosasop");
            console.log(quizes);
                quizes.map(async (x) => {
                        const resg = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                            x.place
                        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);

                        const jsong = await resg.json();
                        console.log("jsong", jsong);
                        updateLocation(jsong.results[0].geometry.location);
                });
            
        }, [quizes]);

      /*if(mode == "user"){
        useEffect(() => {
            if(session?.user){
              findClosestMarker(yourLocation, mode);
            }
                  
        }, [session, isLoaded]);
      }
      else if(mode == "all"){
        useEffect(() => {
          findClosestMarker(yourLocation, mode);
        }, [events]);
        useEffect(() => {
          async function getEvents(){
            const res = await fetch("/api/event/getEvents");
            const json = await res.json();
            return json;
          }
          getEvents().then((data) => {
            setEvents(data);
            findClosestMarker(yourLocation, mode);
          });
        }, [isLoaded]);
      }*/
      
      /*useEffect(() => {

      },[events]);*/
      
      }
      const containerStyle = {
        width: '100%',
        height: '100%',
      };

      /*const findClosestMarker = (userLocation, mode) => {
          let closestDistance = Number.MAX_VALUE;
          let closestMarker = null;
          let closestEvent = null;
          let bool;
          if(mode == "user"){
            session?.user.events.forEach((e) => {
              if(new Date(e.starts_at) > Date.now()){
                bool = true;
                const eventLocation = e.location;
              const distance = calculateDistance(userLocation, eventLocation);
      
              if (distance < closestDistance) {
                closestDistance = distance;
                closestMarker = eventLocation;
                closestEvent = e;
              }
            }
            else{
              bool = false;
            }
            });
          }
          else if(mode == "all"){
            events.forEach((e) => {
                if(new Date(e.starts_at) > Date.now()){
                  bool = true;
                  const eventLocation = e.location;
                  const distance = calculateDistance(userLocation, eventLocation);
          
                  if (distance < closestDistance) {
                    closestDistance = distance;
                    closestMarker = eventLocation;
                    closestEvent = e;
                  }
                }
                else{
                  bool = false;
                }
            });
          }
          setClosestMarker(closestMarker);
          setClosestEvent(closestEvent);
      };*/
  
      const calculateDistance = (pos1, pos2) => {
        const R = 6371; // Earth radius in kilometers
        const dLat = deg2rad(pos2.lat - pos1.lat);
        const dLng = deg2rad(pos2.lng - pos1.lng);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(pos1.lat)) *
            Math.cos(deg2rad(pos2.lat)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
      };
    
      const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };

    /*useEffect(() => {

    }, [directions]);*/

    /*const handleDirections = () => {
      if (yourLocation && closestMarker && !directions) {
        const directionsService = new window.google.maps.DirectionsService();
  
        directionsService.route(
          {
            origin: new window.google.maps.LatLng(yourLocation.lat, yourLocation.lng),
            destination: new window.google.maps.LatLng(closestMarker.lat, closestMarker.lng),
            travelMode: 'DRIVING',
          },
          (result, status) => {
            if (status === 'OK') {
              setDirections(result);
            } else {
              console.error(`Directions request failed due to ${status}`);
            }
          }
        );
      }
    };*/

    /*const returnClosest = () => {
      if(yourLocation && closestMarker){
        handleDirections();
        return true;
      }
    }*/

    useEffect(() => {
        console.log(session?.user);
    }, [session]);

    return (
      <>
      {
        isLoaded && (
          <div className={styles.iframeMain}>
            <GoogleMap mapContainerStyle={containerStyle} center={yourLocation} zoom={15}>
                {
                    yourLocation && (
                    <>
                        {console.log(yourLocation)}
                        <MarkerF position={yourLocation} title="Your location" />
                    </>
                    )
                }
                {
                    !marker ? location.map(loc => 
                        <MarkerF key={quizes.indexOf(location)} position={loc} />
                    ) :
                    <MarkerF key={1} position={marker} />
                }
            </GoogleMap>
            </div>
        )
      }
      </>
    );
}

export default Map;