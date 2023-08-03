interface ArchiveProps {
	categoryCounts: { [category: string]: { archived: number; unarchived: number } }
}

function Archive ({categoryCounts}: ArchiveProps) {
	return (
		<div>
                        <table className="archive-table">
                                <thead>
                                        <tr>
                                                <th colSpan={2}>Category</th>
                                                <th>Archived</th>
                                                <th>Unarchived</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {Object.keys(categoryCounts).map((category) => (
                                                <tr key={category}>
                                                        <td>
                                                                {category === 'Task' ? (
                                                                        <i className="fa fa-calendar-check-o fa"></i>
                                                                ) : category === 'Random Thought' ? (
                                                                        <i className="fa fa-comment fa"></i>
                                                                ) : category === 'Idea' ? (
                                                                        <i className="fa fa-lightbulb-o fa"></i>
                                                                ) : category === 'Quote' ? (
                                                                        <i className="fa fa-quote-left fa"></i>
                                                                ) : (
                                                                        ''
                                                                )}
                                                        </td>

                                                        <td>{category}</td>
                                                        <td className="unarchived">{categoryCounts[category].archived || 0}</td>
                                                        <td className="archived">{categoryCounts[category].unarchived || 0}</td>
                                                </tr>
                                        ))}
                                </tbody>
                        </table>

		</div>
	)
}

export default Archive
