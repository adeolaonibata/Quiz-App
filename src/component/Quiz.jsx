import "./Quiz.css"
import React, { useRef, useState } from 'react'
import { Info } from "../assets/question"

const Quiz = () => {
  let [number, setNumber] = useState(0);
  let [question, setQuestion] = useState(Info[number]);
  let [checked, setChecked] = useState(false);
  let [count, setCount]  = useState(0);
  let [result, setResult] = useState(false)

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_Array = [option1,option2,option3,option4]

  const checkAns = (e, answer) => {
    if (checked === false) {

      if (question.answer===answer){
        e.target.classList.add("correct")
        setChecked(true);
        setCount(prev=>prev+1)
      }  else {
        e.target.classList.add("wrong")
        setChecked(true); 
        option_Array[question.answer-1].current.classList.add("correct")
      }
    }
  }

  const next = () => {
    if (checked ===true) {
      if (number===Info.length-1) {
        setResult(true);
        return 0;
      }
      setNumber(++number);
      setQuestion(Info[number]);
      setChecked(false);
      option_Array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      })
    }
  }

  const Reset = () => {
    setChecked(false);
    setCount(0);
    setNumber(0);
    setQuestion(Info[0]);
    setResult(false);
  }

  
  return (
    <div>
      <h1 className="header">React JS Quiz Application</h1>
    <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {result?<></>:<>
        <h2>{number+1}. {question.Question}</h2>
        <ul>
            <li ref={option1} onClick={(e) => {checkAns(e, 1)}}>{question.option1}</li>
            <li ref={option2} onClick={(e) => {checkAns(e, 2)}}>{question.option2}</li>
            <li ref={option3} onClick={(e) => {checkAns(e, 3)}}>{question.option3}</li>
            <li ref={option4} onClick={(e) => {checkAns(e, 4)}}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <p className="p">Question {number+1} of {Info.length}</p></>
        }
        { result?<>
        <p className="p">you score {count} out {Info.length}</p>
        <button onClick={Reset}>Reset</button>
        </>:<></>}
        </div>
    </div>
  )
}

export default Quiz
