interface CreateNoteProps {
	handleFormDisplay: () => void
	formDisplay: boolean
	createNote: (event: React.FormEvent<HTMLFormElement>) => void
}

function CreateNote ({handleFormDisplay, formDisplay, createNote}: CreateNoteProps) {
	return (
		<div>
			<button onClick={handleFormDisplay} className="btn" id="createNote">Create Note</button>
			{formDisplay && (
				<form onSubmit={createNote} id="formPopup">
					<h1>New Note</h1>
					<label htmlFor="name"><b>Name</b></label>
					<input name="name" required />
					<label htmlFor="category"><b>Category</b></label>
					<select name="category" required>
						<option value="">Select a category</option>
						<option value="Task">Task</option>
						<option value="Random Thought">Random Thought</option>
						<option value="Idea">Idea</option>
						<option value="Quote">Quote</option>
					</select>
					<label htmlFor="content"><b>Content</b></label>
					<input name="content" required />
	
					<button type="submit" className="btn">Create</button>
					<button onClick={handleFormDisplay} className="btn-cancel">Cancel</button>
				</form>
			)}
		</div>
	)
}

export default CreateNote
