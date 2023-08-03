import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Note } from '../types/Note'
import { NotesAction, TypeAction, IdAction } from './actions'

const notes = [
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

const formSlice = createSlice({
	name: 'form',
	initialState: false,
	reducers: {
		toggleForm: (state) => !state,
	},
})

const noteSlice = createSlice({
	name: 'note',
	initialState: notes,
	reducers: {
		addNote: (state, action: PayloadAction<Note>) => state.concat(action.payload),
		deleteNote: (state, action: PayloadAction<number>) =>
			state.filter((n) => n.id !== action.payload),
		editNote: (state, action: PayloadAction<Note>) =>
			state.map((n) => (n.id !== action.payload.id ? n : action.payload)),
		archiveNote: (state, action: PayloadAction<number>) =>
			state.map((n) => (n.id !== action.payload ? n : { ...n, archive: !n.archive })),
	},
})

const archiveSlice = createSlice({
	name: 'archive',
	initialState: false,
	reducers: {
		toggleArchive: (state) => !state,
	},
})

const editSlice = createSlice({
	name: 'edit',
	initialState: [] as number[],
	reducers: {
		addId: (state, action: PayloadAction<number>) => state.concat(action.payload),
		deleteId: (state, action: PayloadAction<number>) =>
			state.filter((id) => id !== action.payload),
	},
})


export const formReducer = formSlice.reducer
export const { toggleForm } = formSlice.actions

export const noteReducer = noteSlice.reducer
export const { addNote, deleteNote, editNote, archiveNote } = noteSlice.actions

export const archiveReducer = archiveSlice.reducer
export const { toggleArchive } = archiveSlice.actions

export const editReducer = editSlice.reducer
export const { addId, deleteId } = editSlice.actions
