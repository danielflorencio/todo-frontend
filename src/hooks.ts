import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { selectUserEmail, selectUserIsLogged } from './features/sessionControl/sessionSlice'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useUserEmail = () => useAppSelector(state => selectUserEmail(state));
export const useLoginStatus = () => useAppSelector(state => selectUserIsLogged(state));