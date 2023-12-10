"use client"
import QuizGenerator from "@components/QuizGenerator/QuizGenerator"
import { useParams } from "next/navigation"

const Quiz = () => {
  const {id} = useParams();
  console.log(id)

  return (
    <QuizGenerator id={id} />
  )
}

export default Quiz