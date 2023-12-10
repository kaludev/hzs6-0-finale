"use client"
import QuizGenerator from "@components/QuizGenerator/QuizGenerator"
import { useParams } from "next/navigation"
import { useEffect } from "react";

const Quiz = () => {
  const {id} = useParams();
  console.log(id)
  
  return (
    <QuizGenerator id={id} />
  )
}

export default Quiz