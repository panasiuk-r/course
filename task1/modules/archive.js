import { archiveNumber } from './archive-calculator.js'
import { editNote } from '../services/note-service.js'

//Function to handle the display of archived and non-archived rows in the notes table
function archiveHandler () {
	const archive = document.querySelector('th[archive]').getAttribute("archive")

	const rows = document.querySelectorAll(".notes-table tbody tr")

	rows.forEach((row) => {
		const isArchive = row.getAttribute("archive") === "true" ? "true" : "false"
		row.style.display = archive === isArchive ? "table-row" : "none"
	})
}

//Function to archive/unarchive a note and update the table and archived number accordingly
function archiveRow (note) {
	const tr = document.querySelector(`tr[note-id="${note.id}"]`)
	const archive = tr.getAttribute('archive')

	const newArchiveValue = archive === 'false' ? 'true' : 'false'
    
	tr.setAttribute('archive', newArchiveValue)

	note.archive = !note.archive
	editNote(note)

	archiveHandler()
	archiveNumber()
}

export { archiveHandler, archiveRow }
