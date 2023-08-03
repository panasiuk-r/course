import { configureStore } from '@reduxjs/toolkit' 

import { noteReducer, formReducer, archiveReducer, editReducer } from './reducers'

export const store = configureStore({
	reducer: {
		notes: noteReducer,
		form: formReducer,
		archive: archiveReducer,
		edit: editReducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
