import { getAllNotes } from '../services/note-service.js'

//Function to calculate and display the number of archived and unarchived notes for each category.
export function archiveNumber() {
	const notes = getAllNotes()

	let categories = [
		{ name: 'Task', unarchived: 0, archived: 0 },
		{ name: 'Random Thought', unarchived: 0, archived: 0 },
		{ name: 'Idea', unarchived: 0, archived: 0 },
		{ name: 'Quote', unarchived: 0, archived: 0 }
	]

	// Loop through each note and update the counts based on their category and archive status
	notes.forEach(n => {
		const category = categories.find(cat => cat.name === n.category)
		if (category) {
			n.archive ? category.archived++ : category.unarchived++
		}
	})

	for (let categoryId = 0; categoryId < categories.length; categoryId++) {
		const category = categories[categoryId]
		document.querySelector(`tr[category-id="${categoryId + 1}"] td[unarchived]`).innerText = category.unarchived
		document.querySelector(`tr[category-id="${categoryId + 1}"] td[archived]`).innerText = category.archived
	}
}
