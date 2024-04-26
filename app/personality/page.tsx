'use client'

import { useState, useEffect } from 'react'

export default function LogicPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [isQuizComplete, setIsQuizComplete] = useState(false) // Quiz completion flag
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState(10) // Question timer
  const [initialTimerRemaining, setInitialTimerRemaining] = useState(5) // Initial preparation timer
  const [errorMessage, setErrorMessage] = useState('')
  const [prepTimeRemaining, setPrepTimeRemaining] = useState(120) // 2-minute timer for presentation preparation

  // Array of questions with correct answers
  const questions = [
    {
      question: "What is Steve Bagley's favourite hobby?",
      options: ["Hiking", "Painting", "Cooking", "Reading"],
      correct: "Reading",
    },
    {
      question: "What is Jamie Twycross's favourite programming language?",
      options: ["Python", "JavaScript", "Java", "C++"],
      correct: "Python",
    },
    {
      question: "What is Max Wilson's favourite software methodology?",
      options: ["Scrum", "Extreme Programming", "Kanban", "Waterfall"],
      correct: "Scrum",
    },
    {
      question: "What is Milena Radenkovic's favourite animal?",
      options: ["Cat", "Dog", "Rabbit", "Bird"],
      correct: "Dog",
    },
    {
      question: "Where is Jason Atkin from?",
      options: ["USA", "UK", "Australia", "Canada"],
      correct: "UK",
    },
  ]

  const handleAnswerChange = (event: any) => {
    setSelectedAnswer(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const correct = selectedAnswer === questions[currentQuestion].correct
    setErrorMessage(correct ? '' : 'Incorrect answer, try again')

    if (correct) {
      if (currentQuestion < questions.length - 1) {
        setSelectedAnswer('') // Clear selected answer
        setCurrentQuestion(currentQuestion + 1) // Move to the next question
        setQuestionTimeRemaining(10) // Reset the question timer
      } else {
        setIsQuizComplete(true) // Quiz is complete
      }
    }
  }

  useEffect(() => {
    const questionTimer = setInterval(() => {
      setQuestionTimeRemaining((prevTime) => {
        const newTime = prevTime - 1
        if (newTime <= 0) {
          if (currentQuestion < questions.length - 1) {
            setSelectedAnswer('') // Reset selected answer if the timer runs out
            setCurrentQuestion(currentQuestion + 1) // Move to the next question
            setErrorMessage('') // Clear error message
            setQuestionTimeRemaining(10) // Reset the question timer
          } else {
            setIsQuizComplete(true) // Complete the quiz if timer runs out on the last question
          }
        }
        return Math.max(0, newTime) // Ensure timer doesn't go below zero
      })
    }, 1000)

    const initialTimer = setInterval(() => {
      setInitialTimerRemaining((prevTime) => Math.max(0, prevTime - 1))
    }, 1000)

    const prepTimer = setInterval(() => {
      if (isQuizComplete) {
        setPrepTimeRemaining((prevTime) => Math.max(0, prevTime - 1)) // Decrement preparation timer
      }
    }, 1000)

    return () => {
      clearInterval(questionTimer)
      clearInterval(initialTimer)
      clearInterval(prepTimer) // Clean up intervals
    }
  }, [currentQuestion, isQuizComplete])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {initialTimerRemaining > 0 ? (
        <div className="flex flex-col items-center mb-8">
          <p className="mb-4">The quiz will start soon. Get ready!</p>
          <p>Time remaining: {initialTimerRemaining} seconds</p>
        </div>
      ) : isQuizComplete ? (
        <div className="flex flex-col items-center">
          <p className="text-green-500 mb-4">Thanks for taking part in the quiz!</p>
          <p>Prepare a short presentation. Share one thing about a different person in the group. Two people cannot choose the same person.</p>
          <p>Preparation time remaining: {prepTimeRemaining} seconds</p> {/* Display the preparation timer */}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h1>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} 
          <form onSubmit={handleSubmit}>
            {questions[currentQuestion].options.map((option) => (
              <div key={option} className="mb-4">
                <input
                  type="radio"
                  id={option}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={handleAnswerChange}
                />
                <label htmlFor={option} className="ml-2">{option}</label>
              </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          </form>
          <p className="mt-4">Time remaining: {questionTimeRemaining} seconds</p>
          <p className="mt-2">Question {currentQuestion + 1}/{questions.length}</p> {/* Display the question counter */}
        </div>
      )}
    </main>
  )
}
