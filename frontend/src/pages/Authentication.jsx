import { useContext, useState, React, useEffect } from "react";
import "./Authentication.css";
import { AuthProvider, AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";

import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from "@mui/material/TextField";


function Authentication() {
    let [isLogin, setisLogin] = useState(true);
    let [isSignup, setIsSignup] = useState(false);
    let [formState, setFormState] = useState(0);

    const handeleSignIn = () => {
        setFormState(0);
        setUsername("");
        setFullName("");
        setPassword("");
        setisLogin(true);
        setIsSignup(false);
        setError("");
    };

    const handeleSignUp = () => {
        setFormState(1);
        setUsername("");
        setFullName("");
        setPassword("");
        setIsSignup(true);
        setisLogin(false);
    };

    let [fullName, setFullName] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [open, setOpen] = useState(false);

    const { handleLogin, handleRegister } = useContext(AuthContext);

    useEffect(() => {
        setError("");
        setPassword("");
        setUsername("");
        setFullName("");
    }, [formState])

    const handleAuth = async () => {
        try {
            if (formState === 1) {
                let result = await handleRegister(fullName, username, password);
                setMessage(result);
                setOpen(true);
                setFormState(0);
                setisLogin(true);
                setIsSignup(false);
                console.log(result)
            }
            if (formState === 0) {

                let result = await handleLogin(username, password);
                console.log(result);
            }
        } catch (err) {
            // console.log(err.response.request.response);
            console.log(err.response.data.message)
            let msg = (err.response.data.message);
            setError(msg);
        }
    };

    return (
        <>
            <div className="Auth-container">
                <div className="Auth"></div>
                <div className="Auth-rout">
                    <div style={{ marginBottom: "30px" }}>
                        <Avatar sx={{ ml: 40, mb: 3, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Button variant={formState === 0 ? "contained" : ""} style={{ color: "black" }} onClick={() => { setFormState(0) }}>
                            Sign In
                        </Button>
                        <Button variant={formState === 1 ? "contained" : ""} style={{ color: "black" }} onClick={() => { setFormState(1) }}>
                            Sign Up
                        </Button>
                    </div>

                    <div className="Login">
                        {formState == 1 ? (
                            <div style={{ margin: "20px", width: "90%" }}>
                                <TextField
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="full name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    fullWidth />
                            </div>
                        ) : (
                            <></>
                        )}
                        <div style={{ margin: "20px", width: "90%" }}>
                            <TextField
                                type="text"
                                name="username"
                                id="username"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth />
                        </div>

                        <div style={{ margin: "20px", width: "90%" }}>
                            <TextField
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="password"
                                id="password"
                                name="password"
                                type="password"
                                fullWidth 
                                required/>
                        </div>

                        <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>

                        <div style={{ margin: "20px", width: "90%" }}>
                            <Button
                                onClick={handleAuth}
                                variant="contained"
                                fullWidth>{formState === 0 ? "Login" : "Register"}</Button>
                        </div>
                    </div>
                </div>

                <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    message={message}
                />
            </div>
        </>
    );
}

export default Authentication;
