import { formHandler } from './form-handler.js'

// Function to hide all table data cells within a given table row
function hideTableDataCells(tableRow) {
	const cells = tableRow.querySelectorAll("td")
	for (const cell of cells) {
		cell.style.display = "none"
  	}
}

// Function to show all table data cells within a given table row
function showTableDataCells(tableRow) {
	const cells = tableRow.querySelectorAll("td")
	for (const cell of cells) {
		cell.style.display = ""
	}
}

// Function to dynamicly  create and display an edit form for a given note within a table row
export function editForm(note, tableRow) {
	const noteId = note.id

	const editNoteForm = document.createElement("form")
 	editNoteForm.id = "editNoteForm"

	const inputId = document.createElement("input")
	inputId.type = "hidden"
	inputId.id = "editNoteId"
	inputId.name = "id"
	inputId.value = note.id
	inputId.required = true
	editNoteForm.appendChild(inputId)

	const inputName = document.createElement("input")
	inputName.type = "text"
	inputName.id = "editNoteName"
	inputName.name = "name"
	inputName.value = note.name
	inputName.required = true
	editNoteForm.appendChild(inputName)

	const selectCategory = document.createElement("select")
	selectCategory.id = "editNoteCategory"
	selectCategory.name = "category"
	const categories = ["Task", "Random Thought", "Idea", "Quote"]
	//making category drop-down list and selecting old value as default
	for (const category of categories) {
 		const option = document.createElement("option")
		option.value = category
		option.textContent = category
		if (category === note.category) {
			option.selected = true
		}
		selectCategory.appendChild(option)
	}
	editNoteForm.appendChild(selectCategory)

	const inputContent = document.createElement("input")
	inputContent.type = "text"
	inputContent.id = "editNoteContent"
	inputContent.name = "content"
	inputContent.value = note.content
	inputContent.required = true;
	editNoteForm.appendChild(inputContent)

	const saveEditButton = document.createElement("button")
	saveEditButton.type = "button"
	saveEditButton.classList.add("btn")
	saveEditButton.id = "saveEditButton"
	saveEditButton.textContent = "Save"
	saveEditButton.addEventListener("click", () => {
		try {
			formHandler(event, editNoteForm)
			editNoteForm.remove()
			showTableDataCells(tableRow)
		} catch (error) {
			consolt.log("An error occurred:", error)
		}
	})
	editNoteForm.appendChild(saveEditButton)

	const cancelEditButton = document.createElement("button")
	cancelEditButton.type = "button"
	cancelEditButton.classList.add("btn-cancel")
	cancelEditButton.id = "cancelEditButton"
	cancelEditButton.textContent = "Cancel"
	cancelEditButton.addEventListener("click", () => {
		try {
			editNoteForm.remove()
			showTableDataCells(tableRow)
		} catch (error) {
                        consolt.log("An error occurred:", error)
		}
  	})
	editNoteForm.appendChild(cancelEditButton)

	hideTableDataCells(tableRow)
	
	const formCell = tableRow.insertCell()
	formCell.colSpan = 9
	formCell.appendChild(editNoteForm)
}
