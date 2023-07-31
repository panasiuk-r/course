import { formatDate, findDates, nextId } from '../utils.js'
import { createTableRow } from './row-builder.js'
import { addNote, getAllNotes, getNoteById, editNote } from '../services/note-service.js'
import { archiveNumber } from './archive-calculator.js'

/* Function to handle form submissions:
* Extracts form input values, creates a note object, and either edits an existing note or adds a new note to the service and updates the table row on the webpage.*/

export function formHandler(event, form) {
	event.preventDefault()

	const nameInput = form.querySelector("input[name='name']")
	const categorySelect = form.querySelector("select[name='category']")
	const contentInput = form.querySelector("input[name='content']")
	const idInput = form.querySelector("input[name='id']")

	const name = nameInput.value
	const category = categorySelect.value
	const content = contentInput.value
	const dates = findDates(content)
	const created = formatDate(new Date())
	const id = idInput ? idInput.value :	nextId(getAllNotes())
	

	if (!name || !category || !content) {
		alert("Please fill in all the required fields.")
                return
        }

	const note = { id, name, created, category, content, dates }
	
	if (idInput) {
		editNote(note)
		updateTableRow(note)
		document.querySelector("#formPopup").style.display = "none"
	} else {
		note.archive = false
		addNote(note)
 		createTableRow(note)
		archiveNumber()
	}
}


/* Function to update the table row on the webpage with new or edited note information:
* Updates the table row with the provided note data, including the category icon, name, created date, category, content, and dates.*/

function updateTableRow(note) {
	const tableRow = document.querySelector(`tr[note-id="${note.id}"]`)
	const cells = tableRow.querySelectorAll('td')

	const categoryIcon = cells[0].querySelector("i")

	categoryIcon.classList.remove(
		"fa-calendar-check-o",
		"fa-comment",
		"fa-lightbulb-o",
		"fa-quote-left"
	)

	switch (note.category) {
		case "Task":
			categoryIcon.classList.add("fa", "fa-calendar-check-o")
			break
		case "Random Thought":
			categoryIcon.classList.add("fa", "fa-comment")
			break
		case "Idea":
			categoryIcon.classList.add("fa", "fa-lightbulb-o")
			break
		case "Quote":
			categoryIcon.classList.add("fa", "fa-quote-left")
			break

	}

	cells[1].textContent = note.name
	cells[2].textContent = note.created
	cells[3].textContent = note.category
	cells[4].textContent = note.content
	cells[5].textContent = note.dates
}
