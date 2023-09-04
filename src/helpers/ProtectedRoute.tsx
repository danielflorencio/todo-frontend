import { Navigate } from "react-router-dom"
import { useLoginStatus } from "../hooks"

export default function ProtectedRoute({children}: {children: JSX.Element}){

    const isSignedIn = useLoginStatus();

    if(!isSignedIn){
        return <Navigate to={'/login'}/>
    }

    return children
}