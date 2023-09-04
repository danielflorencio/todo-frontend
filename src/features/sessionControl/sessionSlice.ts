import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '../../types/userData';
import { RootState } from '../../store';
export interface SessionState {
  userData: Partial<UserData>
  userIsLogged: boolean,
  token: string | null,
  connectionError: boolean, 
  isLoading: boolean
}

let initialState: SessionState = {
  userData: {
    email: localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : '', 
    password: '', 
    firstName: '', 
    lastName: ''},
  userIsLogged: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  connectionError: false,
  isLoading: true
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    registerLoggedUserState: (state, action: PayloadAction<string | null>) => {
      const newState = {
        ...state, 
        userData: {
          email: action.payload
        },
        userIsLogged: true
      }
      state = newState;
      return state
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      state.userIsLogged = false;
      state.connectionError = false;
      state.isLoading = false;
      state.userData = {email: '', firstName: '', lastName: '', password: ''}
    },
  },
})

export const selectUserIsLogged = (state: RootState) =>{return state.session.userIsLogged};
export const selectUserEmail = (state: RootState) =>{return state.session.userData.email};
export const { logout, registerLoggedUserState } = sessionSlice.actions;
export const sessionActions = {
  ...sessionSlice.actions,
}
export default sessionSlice.reducer