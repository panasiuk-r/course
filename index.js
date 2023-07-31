import { createTableRow } from './modules/row-builder.js'
import { formHandler } from './modules/form-handler.js'
import { getAllNotes } from './services/note-service.js'
import { archiveHandler } from './modules/archive.js'
import { archiveNumber } from './modules/archive-calculator.js'

//module to render default page

function closeForm ()  {
	document.querySelector("#formPopup").style.display = "none"
}

const createButton = document.querySelector("#createNote")
const closeButton = document.querySelector(".btn-cancel")
const submitButton = document.querySelector("#submitNote")
const archiveButton = document.querySelector("#archive")

const notes = getAllNotes()

closeButton.addEventListener("click", closeForm)
createButton.addEventListener("click", () => document.querySelector("#formPopup").style.display = "block")
submitButton.addEventListener("click", () => formHandler(event, document.querySelector('#formPopup')))
archiveButton.addEventListener("click", () => {
	try {
		const currentValue = archiveButton.parentElement.getAttribute("archive")
		const oppositeValue = currentValue === "true" ? "false" : "true"
		archiveButton.parentElement.setAttribute("archive", oppositeValue)
		archiveHandler()
	}
	catch (error) {
		console.error("An error occurred:", error)
	}
})

for (const note of notes) {
        createTableRow(note)
}


closeForm()
archiveHandler()
archiveNumber()
