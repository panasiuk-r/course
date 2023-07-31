import { getAllNotes } from '../services/note-service.js'

//Function to calculate and display the number of archived and unarchived notes for each category.
export function archiveNumber() {
	const notes = getAllNotes()

	let categories = {
		task: { unarchived: 0, archived: 0 },
		randomThought: { unarchived: 0, archived: 0 },
		idea: { unarchived: 0, archived: 0 },
		quote: { unarchived: 0, archived: 0 },
	}
	
	//Loop through each note and update the counts based on their category and archive status
	notes.forEach(n => {
		switch (n.category) {
			case 'Task':
				n.archive ? categories.task.archived++ : categories.task.unarchived++
				break
			case 'Random Thought':
				n.archive ? categories.randomThought.archived++ : categories.randomThought.unarchived++
				break
			case 'Idea':
				n.archive ? categories.idea.archived++ : categories.idea.unarchived++
				break
			case 'Quote':
				n.archive ? categories.quote.archived++ : categories.quote.unarchived++
				break
		}
	})
	
	document.querySelector('tr[category-id="1"] td[unarchived]').innerText = categories.task.unarchived
	document.querySelector('tr[category-id="1"] td[archived]').innerText = categories.task.archived
	document.querySelector('tr[category-id="2"] td[unarchived]').innerText = categories.randomThought.unarchived
	document.querySelector('tr[category-id="2"] td[archived]').innerText = categories.randomThought.archived
	document.querySelector('tr[category-id="3"] td[unarchived]').innerText = categories.idea.unarchived
	document.querySelector('tr[category-id="3"] td[archived]').innerText = categories.idea.archived
	document.querySelector('tr[category-id="4"] td[unarchived]').innerText = categories.quote.unarchived
	document.querySelector('tr[category-id="4"] td[archived]').innerText = categories.quote.archived
}
