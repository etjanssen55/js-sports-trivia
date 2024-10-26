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

		//trying to add text to the questionElement p tag
		questionElement.textContent = decodeHtml(question)

		//clears answer element
		answersElement.innerHTML = ''

		//trying to cycle through the answers and create a button for each one
		answers.forEach(answer => {
			const a = answersElement.createElement('button')
			a.textContent = decodeHtml(answer)
			answersElement.append(a)
		})
		
		//listens for a button click and checks if the answer is correct or not
		button.addEventListener("click", async (answer) => {
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

	//listens for a click on the nextQuestionElement and then runs renderQuestion. Also sets a timer to disable the button for 10 seconds
	nextQuestionElement.addEventListener("click", async () => {
		renderQuestion(await getNextQuestion())
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, 10000)

	})

})()



// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
