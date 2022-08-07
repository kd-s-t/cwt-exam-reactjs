import { createSlice } from '@reduxjs/toolkit'

export const BreedReducer = createSlice({
  name: 'breed',
  initialState: {
    data: [],
    summary: [],
  },
  reducers: {
    setBreed: (state, action) => {
      state.data = action.payload
    },
    setSummary: (state, action) => {
      state.summary = action.payload
    },
  },
})

export const { setBreed, setSummary } = BreedReducer.actions


export default BreedReducer.reducer
