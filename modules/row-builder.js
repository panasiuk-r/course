/*This function creates a new row in an HTML table to display a note. 
 * The function takes a note object as input, which is used to populate the cells in the table row. */

import { deleteNote } from '../services/note-service.js'
import { editForm } from './edit-form.js'
import { archiveRow } from './archive.js'
import { archiveNumber } from './archive-calculator.js'

export function createTableRow(note) {
	const tableBody = document.querySelector(".notes-table tbody")
	
	const newRow = tableBody.insertRow()
	const keys = ["name", "created", "category", "content", "dates"]

	newRow.setAttribute("note-id", note.id)
	newRow.setAttribute("archive", note.archive)

	const iconCell = newRow.insertCell()
	const categoryIcon = document.createElement("i")

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

	iconCell.appendChild(categoryIcon)

	for (const key of keys) {
		const cell = newRow.insertCell()
		cell.textContent = note[key]
	}

	const editCell = newRow.insertCell()
	editCell.classList.add("action")

	const editButton = document.createElement("button")

	editButton.classList.add("btn")
	editButton.innerHTML = '<i class="fa fa-edit"></i>'
	editButton.addEventListener("click", () => { 
		editForm(note, newRow) 
	})
	editCell.appendChild(editButton)

	const deleteCell = newRow.insertCell()
	deleteCell.classList.add("action")

	const deleteButton = document.createElement("button")

	deleteButton.classList.add("btn")
	deleteButton.innerHTML = '<i class="fa fa-trash"></i>'
	deleteButton.addEventListener("click", () => {
		deleteNote(note.id)
		tableBody.removeChild(newRow)
		archiveNumber()
	})
	deleteCell.appendChild(deleteButton)

	const archiveCell = newRow.insertCell()
	archiveCell.classList.add("action")

	const archiveButton = document.createElement("button")

	archiveButton.classList.add("btn")
	archiveButton.innerHTML = '<i class="fa fa-archive"></i>'
	archiveButton.addEventListener("click", () => {
		archiveRow(note)
	})
	archiveCell.appendChild(archiveButton)
}
