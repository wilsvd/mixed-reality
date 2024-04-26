'use client'

import { useState, useEffect } from 'react'

export default function LogicPage() {
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null) // Correct answer status
  const [showQuestion, setShowQuestion] = useState(false) // Whether to show the question
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState(300) // 10 seconds for the question
  const [initialTimerRemaining, setInitialTimerRemaining] = useState(120) // 5 seconds for initial timer
  const [errorMessage, setErrorMessage] = useState('') // Error message to show if the answer is incorrect

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value) // Update the selected answer
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const correctAnswer = 'A' // The correct answer
    const correct = selectedAnswer === correctAnswer // Check if the selected answer is correct
    setIsCorrect(correct) // Update the correct answer status
    setErrorMessage(correct ? '' : 'Incorrect answer, try again') // Set the error message if the answer is incorrect

    if (correct) {
      setQuestionTimeRemaining(0) // Stop the timer if the answer is correct
    }
  }

  useEffect(() => {
    const questionTimeout = setTimeout(() => {
      setShowQuestion(true) // Show the question after the initial timer
    }, initialTimerRemaining * 1000)

    const questionTimer = setInterval(() => {
      setQuestionTimeRemaining((prevTime) => Math.max(0, prevTime - 1)) // Decrement the question timer every second
    }, 1000)

    const initialTimer = setInterval(() => {
      setInitialTimerRemaining((prevTime) => Math.max(0, prevTime - 1)) // Decrement the initial timer every second
    }, 1000)

    return () => {
      clearTimeout(questionTimeout)
      clearInterval(questionTimer)
      clearInterval(initialTimer) // Clear all timers and intervals on cleanup
    }
  }, [initialTimerRemaining])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {!showQuestion ? (
        <div className="flex flex-col items-center mb-8">
          <p className="mb-4">Find out what each of your team members' favorite hobbies are and discuss them.</p>
          <p>Time remaining: {initialTimerRemaining} seconds</p>
        </div>
      ) : questionTimeRemaining <= 0 && isCorrect === null ? (
        <div className="flex flex-col items-center">
          <p className="text-red-500 mb-4">Nice Try! The correct answer was AND.</p>
          <p>The next room you need to go to is B52. The question will open at 10:40.</p>
        </div>
      ) : isCorrect ? (
        <div className="flex flex-col items-center">
          <p className="text-green-500 mb-4">Correct! The answer is AND.</p>
          <p>The next room you need to go to is B52. The question will open at 10:40.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Logical Reasoning Question</h1>
          <p className="mb-4">Which of the following is an example of a logical operation?</p>
          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p> // Show the error message if it's not empty
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="radio"
                id="option-a"
                value="A"
                checked={selectedAnswer === 'A'}
                onChange={handleAnswerChange}
              />
              <label htmlFor="option-a" className="ml-2">A. AND</label>
            </div>
            <div className="mb-4">
              <input
                type="radio"
                id="option-b"
                value="B"
                checked={selectedAnswer === 'B'}
                onChange={handleAnswerChange}
              />
              <label htmlFor="option-b" className="ml-2">B. LOOP</label>
            </div>
            <div className="mb-4">
              <input
                type="radio"
                id="option-c"
                value="C"
                checked={selectedAnswer === 'C'}
                onChange={handleAnswerChange}
              />
              <label htmlFor="option-c" className="ml-2">C. INDEX</label>
            </div>
            <div className="mb-4">
              <input
                type="radio"
                id="option-d"
                value="D"
                checked={selectedAnswer === 'D'}
                onChange={handleAnswerChange}
              />
              <label htmlFor="option-d" className="ml-2">D. SCOPE</label>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          </form>
          <p className="mt-4">Time remaining: {questionTimeRemaining} seconds</p>
        </div>
      )}
    </main>
  )
}
