import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignIn from './pages/SignInPage/SignInPage.tsx';
import SignUp from './pages/SingUpPage/SignUpPage.tsx';
import ProtectedRoute from './helpers/ProtectedRoute.tsx';
import { store } from './store'
import { Provider } from 'react-redux'
import TodoApp from './components/TodoApp/Index.tsx';
import { Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import { Container, CssBaseline } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><TodoApp/></ProtectedRoute>
  },
  {
    path: '/login',
    element: <SignIn/>
  },
  {
    path: '/sign-up',
    element: <SignUp/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={store}>
        <RouterProvider router={router}/>
        {/* <App/> */}
    </Provider>
  </React.StrictMode>,
)