"use client"
import RangListCard from "@components/RangListCard/RangListCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RangListCards = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await fetch('/api/getLikes');
                const data = await res.json();
                if(!data.ok) throw new Error(data.message);

                setCards(data.data);
                console.log(data);
            }catch(err){
                toast.error(err.message);
            }
        }
        fetchData();
    }, [])
    
  return (
    cards && cards.map(card => <RangListCard card ={card}/>)
  )
}

export default RangListCards