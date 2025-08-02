import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext";
import { HttpStatusCode } from "axios";

const withAuth = (WrappedComponenet) => {

    
    const AuthComponent = (props) => {
        let { isValidToken } = useContext(UserContext);
        const router = useNavigate();

        const isAuthenticated = () => {
            if(localStorage.getItem("token")) {
                return true;
            }
            return false;
        }

        useEffect(() => {
            if(!isAuthenticated()) {
                router("/auth")
            }
        }, [])

        return <WrappedComponenet />
    }   

    return AuthComponent;
}

export default withAuth;