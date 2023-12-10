"use client"
import styles from './Map.module.css'
import { useSession } from 'next-auth/react';
import {useState, useEffect} from 'react';
import { GoogleMap, MarkerF, DirectionsService, DirectionsRenderer, useJsApiLoader, InfoWindowF } from '@react-google-maps/api';
import Link from 'next/link';

const Map = ({marker}) => {
    const [yourLocation, setYourLocation] = useState({});
    //const [closestMarker, setClosestMarker] = useState(null);
    const [directions, setDirections] = useState([]);
    //const [closestEvent, setClosestEvent] = useState(null);
    const [quizes, setQuizes] = useState([]);
    const [location, setLocation] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })
    //const [closestMarker, setClosestMarker] = useState(null);
    //const [directions, setDirections] = useState(null);
    //const [closestEvent, setClosestEvent] = useState(null);
    if(!marker){
      
      

      const {data: session} = useSession();

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

    /*if(mode == "user"){
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

      /*if(mode == "user"){
        useEffect(() => {
            if(session?.user){
              findClosestMarker(yourLocation, mode);
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

    const handleDirections = (location) => {
      if (yourLocation && !directions) {
        const directionsService = new window.google.maps.DirectionsService();
  
        directionsService.route(
          {
            origin: new window.google.maps.LatLng(yourLocation.lat, yourLocation.lng),
            destination: new window.google.maps.LatLng(location.lat, location.lng),
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
    };

    /*const returnClosest = () => {
      if(yourLocation && closestMarker){
        handleDirections();
        return true;
      }
    }*/

    useEffect(() => {
        console.log(session?.user);
    }, [session]);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };
    
    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
    };

    const handleAcceptQuiz = async (data) => {
        if(session?.user){
            const res = await fetch("/api/acceptQuiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if(json.ok){
                console.log("ok");
                json.data.task.map(async (x) => {
                    await handleGeocoding(x.address);
                    handleDirections(x.location);
                });
            }
            else{
                console.log("nije ok");
            }
        }
    }

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
                      <MarkerF key={1} position={marker} />
                }
                {selectedMarker && (
              <InfoWindowF
                position={selectedMarker.location}
                onCloseClick={handleInfoWindowClose}
              >
                {/* Content of your InfoWindow */}
                <div>
                  {/* Customize the content of the InfoWindow here */}
                  <h4>{selectedMarker.name}</h4>
                  <h5>{`Broj zadataka: ${selectedMarker.task.length}`}</h5>
                  <h5>{`Pocinje: ${new Date(selectedMarker.starts_at).toLocaleDateString()}`}</h5>
                  <h5>{`Zavrsava se: ${new Date(selectedMarker.ends_at).toLocaleDateString()}`}</h5>
                  <h3>{`Nagrada: ${selectedMarker.reward_points}`}</h3>
                  <button onClick={() => handleAcceptQuiz(selectedMarker)}>Zapocni kviz</button>
                  {/* Add other content as needed */}
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