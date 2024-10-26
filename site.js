

// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	// todo: create your "getNextQuestion" function
	const getNextQuestion = async () => {

		const response = await fetch('https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple')

		const json = await response.json()

		const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]

		const answers = shuffle([ ...incorrect, correct ])

		return { question, answers, correct }

		
	}

	console.log(await getNextQuestion())
	// todo: create your "renderQuestion" function


	const renderQuestion = ({ question, answers, correct }) => { 
		getNextQuestion()


		const q = document.createElement(questionElement)
		q.textContent = decodeHtml(question)
		p.append(q)

		answersElement.innerHTML = ''

		answers.forEach(answer => {
			const a = document.createElement('button')
			a.textContent = answers.answer
			answersElement.append('button')
		})
		
		button.addEventListener("click", (answer) => {
			if (answer === correct) {
				button.classList.add('correct')
				answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
				alert('Correct!')
				return
			}
			
			button.disabled = true
			alert('Incorrect!')
		})
	}

	

	// todo: add the event listener to the "nextQuestion" button

})()



// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
