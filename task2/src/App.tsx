import { useAppSelector, useAppDispatch } from './hooks/hooks'
import { Note } from './types/Note'
import { formatDate, findDates, nextId } from './utils/utils'
import { addNote, deleteNote, editNote, archiveNote, toggleForm, toggleArchive, addId, deleteId } from './redux/reducers'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import Table from './components/Table'
import CreateNote from './components/CreateNote'
import Archive from './components/Archive'

function App() {

	const dispatch = useAppDispatch()
	const notes = useAppSelector(state => state.notes)	
	const formDisplay = useAppSelector(state => state.form)
	const archive = useAppSelector(state => state.archive)
	const editCounter = useAppSelector(state => state.edit)

	const categoryCounts = notes.reduce((acc, note) => {
		const category = note.category
		const countObj = note.archive ? 'archived' : 'unarchived'

		acc[category] = {
			...acc[category],
			[countObj]: (acc[category]?.[countObj] || 0) + 1,
		}
		return acc;
 	}, {} as { [category: string]: { archived: number; unarchived: number } })


	const createNote = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault()

		const target = event.target as typeof event.target & {
			name: { value: string }
			category: { value: string }
			content: { value: string }
		}

		const nameValue = target.name.value
		const categoryValue = target.category.value
		const contentValue = target.content.value

 		const note = {
			id: nextId(notes),
			name: nameValue,
			created: formatDate(new Date()),
			category: categoryValue,
			content: contentValue,
			dates: String(findDates(target.content.value)),
			archive: false
		}
		
		dispatch(addNote(note))
		handleFormDisplay()
		clearForm(event)
	}
	
	const handleEditNote = (event: React.FormEvent<HTMLFormElement>, id: number): void => {
		event.preventDefault()
		
		const target = event.target as typeof event.target & {
			name: { value: string }
			category: { value: string }
			content: { value: string }
		}		

		const nameValue = target.name.value
		const categoryValue = target.category.value
		const contentValue = target.content.value
								
		const note = notes.find(n => n.id === id)
		
		if (!note) {
			return
		}		

		const updatedNote = {
			...note,
			name: nameValue,
			category: categoryValue,
			content: contentValue,
			created: formatDate(new Date()),
			dates: String(findDates(target.content.value))
		}

		dispatch(editNote(updatedNote))
		dispatch(deleteId(note.id))
	}

	const clearForm = (event: React.FormEvent<HTMLFormElement>): void => {
		const target = event.target as typeof event.target & {
			name: { value: string }
			category: { value: string }
			content: { value: string }
		}

		target.name.value = ''
		target.category.value = ''
		target.content.value = ''
	}
	
	const handleFormDisplay = (): void => {dispatch(toggleForm())}
	const handleArchiveDisplay = (): void => {dispatch(toggleArchive())}
	const handleDelete = (id: number): void => {dispatch(deleteNote(id))}
	const handleArchive = (id: number): void => {dispatch(archiveNote(id))}
	const handleEditClick = (id: number): void => {dispatch(addId(id))}
	const handleEditCancel = (id: number): void => {dispatch(deleteId(id))}

	return (
		<div>
			<Table notes={notes} 
				archive={archive}
				editCounter={editCounter}
				handleEditClick={handleEditClick}
				handleDelete={handleDelete}
				handleArchive={handleArchive}
				handleArchiveDisplay={handleArchiveDisplay}
				handleEditNote={handleEditNote}
				handleEditCancel={handleEditCancel}
			/>
			<CreateNote handleFormDisplay={handleFormDisplay} formDisplay={formDisplay} createNote={createNote}  />
			<Archive categoryCounts={categoryCounts} />
		</div>
	)
}

export default App;
