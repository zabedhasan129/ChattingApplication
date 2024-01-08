import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
}

export const userSlice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {
    logedUser: (state, action) => {
      state.value = action.payload

    },

  },
})


export const { logedUser } = userSlice.actions

export default userSlice.reducer