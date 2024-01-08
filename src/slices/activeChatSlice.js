import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const activeChatSlice = createSlice({
  name: 'activechat',
  initialState,
  reducers: {
    activeChat: (state, action) => {
    
      state.value = action.payload 

    },

  },
})


export const {activeChat} = activeChatSlice.actions

export default activeChatSlice.reducer