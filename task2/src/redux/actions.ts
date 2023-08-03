import { Note } from '../types/Note'

interface NotesAction {
	type: string
	payload: Note
}

interface IdAction {
	type: string
	payload: number
}

interface TypeAction {
	type: string
}

const createNote = (note: Note): NotesAction => {
	return {
		type: 'notes/addNote',
		payload: note
	}
}

const editNote = (note: Note): NotesAction => {
	return {
		type: 'notes/editNote',
		payload: note
	}
}

const archiveNote = (id: number): IdAction => {
	return {
		type: 'notes/archiveNote',
		payload: id
	}
}

const deleteNote = (id: number): IdAction => {
	return {
		type: 'notes/deleteNote',
		payload: id
	}
}

const toggleForm = (): TypeAction => ({
	type: 'form/toggleForm'
})

const toggleArchive = (): TypeAction => ({
	type: 'archive/toggleArchive'
})

const addEdit = (id: number): IdAction => {
	return {
		type: 'edit/addId',
		payload: id
	}
}

const deleteEdit = (id: number): IdAction => {
	return {
		type: 'edit/deleteId',
		payload: id

	}
}

export type { NotesAction, TypeAction, IdAction }
export { editNote, createNote, toggleForm, toggleArchive, deleteNote, archiveNote, addEdit, deleteEdit }
