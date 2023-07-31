let notes = [
	{
		id: 1,
		name: "Note 1",
		created: "27/07/2023",
		category: "Idea",
		content: "This is the content of Note 1.",
		dates: "",
		archive: true,
	},
	{
		id: 2,
		name: "Note 2",
		created: "28/07/2023",
		category: "Task",
		content: "This is the content of Note 2.",
		dates: "",
		archive: false,
	},
	{
		id: 3,
		name: "Note 3",
		created: "29/07/2023",
		category: "Random Thought",
		content: "This is the content of Note 3.",
		dates: "",
		archive: false,
	},
	{
		id: 4,
		name: "Note 4",
		created: "30/07/2023",
		category: "Idea",
		content: "This is the content of Note 4. It mentions dates 1/8/2023 and 5/8/2023.",
		dates: "1/8/2023, 5/8/2023",
		archive: false,
	},
	{
		id: 5,
		name: "Note 5",
		created: "31/07/2023",
		category: "Task",
		content: "This is the content of Note 5. It mentions a date 10/8/2023.",
		dates: "10/8/2023",
		archive: false,
	},
	{
		id: 6,
		name: "Note 6",
		created: "31/07/2023",
		category: "Random Thought",
		content: "This is the content of Note 6.",
		dates: "",
		archive: false,
	},
	{
		id: 7,
		name: "Note 7",
		created: "31/07/2023",
		category: "Idea",
		content: "This is the content of Note 7. It mentions a date 2/8/2023.",
		dates: "2/8/2023",
		archive: false,
	},
]

//Function to return all notes.
function getAllNotes () { return notes }

//Function to find and return a note by its ID.
function getNoteById (id) { return notes.find(n => n.id === id) }

//Function to add a new note or update an existing one in the notes list.
function addNote(note) {
	try {
		if (notes.some((n) => n.id === note.id)) {
			editNote(note)
			return
		}
		notes.push(note)
	} catch (error) {
		console.error("Error occurred while adding a note:", error)
	}
}

// Function to edit an existing note in the notes list.
function editNote(note) {
	try {
		const i = notes.findIndex((n) => n.id === Number(note.id))
		if (i >= 0) {
			notes[i] = { ...notes[i], ...note }
		} else {
			throw new Error("Note not found")
		}
	} catch (error) {
		console.error("Error occurred while editing a note:", error)
	}
}

// Function to delete a note by its ID from the notes list.
function deleteNote(id) {
	try {
		notes = notes.filter((n) => n.id !== id)
	} catch (error) {
		console.error("Error occurred while deleting a note:", error)
	}
}
export { getAllNotes, addNote, deleteNote, editNote, getNoteById }
