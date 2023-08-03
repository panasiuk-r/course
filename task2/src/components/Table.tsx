import React from 'react'


import { Note } from '../types/Note'

interface TableProps {
	notes: Note[]
	archive: boolean
	editCounter: number[]
	handleEditClick: (id: number) => void
	handleDelete: (id: number) => void
	handleArchive: (id: number) => void
	handleArchiveDisplay: () => void
	handleEditNote: (event: React.FormEvent<HTMLFormElement>, id: number) => void
	handleEditCancel: (id: number) => void 
}

function Table ({notes, archive, editCounter, handleEditClick, handleDelete,  handleArchive, handleArchiveDisplay, handleEditNote, handleEditCancel}: TableProps) {
	return (
		<div>
			<table className="table">
				<thead>
					<tr>
						<th colSpan={2}>Name</th>
						<th>Created</th>
						<th>Category</th>
						<th>Content</th>
						<th>Dates</th>
						<th colSpan={3}>
							<button onClick={handleArchiveDisplay} className="btn">
								<i className="fa fa-archive"></i>
							</button>
						</th>
					</tr>
				</thead>

				<tbody>
					{notes.filter(n => n.archive === archive).map(n => 				
						<React.Fragment key={n.id}>
							{editCounter.includes(n.id) ? (
								<tr key={n.id} note-archive={n.archive.toString()}>
									<td colSpan={9}>
										<form onSubmit={(event) => handleEditNote(event, n.id)} id="editNoteForm">
											<input name="name" defaultValue={n.name} required />
											<select name="category" defaultValue={n.category} required>
												<option value="Task">Task</option>
												<option value="Random Thought">Random Thought</option>
												<option value="Idea">Idea</option>
												<option value="Quote">Quote</option>
											</select>
											<input name="content" defaultValue={n.content} required />
											<button type="submit" className="btn">Edit</button>
											<button onClick={() => handleEditCancel(n.id)} className="btn-cancel">Cancel</button>
										</form>
									</td>
								</tr>
							) : (
	  							<tr key={n.id} note-archive={n.archive.toString()}>
									<td>
										{n.category === 'Task' ? (
											<i className="fa fa-calendar-check-o fa"></i>
										) : n.category === 'Random Thought' ? (
											<i className="fa fa-comment fa"></i>
										) : n.category === 'Idea' ? (
											<i className="fa fa-lightbulb-o fa"></i>
										) : n.category === 'Quote' ? (
											<i className="fa fa-quote-left fa"></i>
										) : (
											''
										)}
									</td>
									<td>{n.name}</td>
	 								<td>{n.created}</td>
	 								<td>{n.category}</td>
			  						<td>{n.content}</td>
	  								<td>{n.dates}</td>
									<td className="action">
										<button onClick={() => handleEditClick(n.id)} className="btn">
											<i className="fa fa-edit"></i>
										</button>
									</td>
									<td className="action">
										<button onClick={() => handleDelete(n.id)} className="btn">
											<i className="fa fa-trash"></i>
										</button>
									</td>
	  								<td className="action">
	    									<button onClick={() => handleArchive(n.id)} className="btn">
	     										 <i className="fa fa-archive"></i>
	    									</button>
	 								</td>
								</tr> 
							)}
						</React.Fragment>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Table
