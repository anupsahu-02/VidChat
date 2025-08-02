import { useNavigate } from "react-router-dom";
import withAuth from "../utils/withAuth";
import { useContext, useState } from "react";
import style from './Home.module.css';
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Img1 from "../assets/logo3.png"
import { UserContext } from "../contexts/UserContext";

function Home() {

    let navigate = useNavigate();
    let [meetingCode, setMeetingCode] = useState("");

    let { getUserHistory, addToActivity} = useContext(UserContext); 

    let handleJoinVideoCall = () => {
        addToActivity(localStorage.getItem("token"), meetingCode);
        navigate(`/${meetingCode}`);
    }

    let handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    }

    let handleHistoryButton = () => {
        navigate("/history");
    }

    let getRandom = () => {
        let code = Math.floor(Math.random() * 900000000) + 1;
        setMeetingCode(code);
    }

    return (
        <div className={style.homeContainer}>
            <div className={style.navContainer}>
                <div>
                    <h1>VidChat</h1>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={handleHistoryButton}>
                        <p style={{ paddingInline: "40px" }}>History</p>
                    </IconButton>

                    <IconButton onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
            </div>

            </div>
            <div className={style.homeMain}>
                <div className={style.inputField}>
                    <h2 style={{marginBottom : "20px"}}>Providing Quality Video Call Just Like Quality Education</h2>
                    <TextField
                        variant="outlined"
                        value={meetingCode}
                        onChange={(e) => setMeetingCode(e.target.value)}
                        placeholder="Meeting Code" >
                    </TextField>

                    <Button onClick={handleJoinVideoCall} variant="contained">JOIN</Button>
                    <div>
                        <p style={{textDecoration : "underline" , marginTop: "20px", color : "gray", cursor : "pointer"}} onClick={getRandom}>Generate Random code?</p>
                    </div>
                </div>
                

                <div>
                    <img src={Img1} style={{width : "90vh"}}/>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Home);