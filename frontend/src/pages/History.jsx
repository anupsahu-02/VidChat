import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useNavigate } from "react-router-dom";

import imgNoData from '../assets/unDrawNoData.png'

function History() {

    const { getUserHistory } = useContext(UserContext);

    const [meetings, setMeetings] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        
        const fetchHistory = async () => {
            let history = await getUserHistory(localStorage.getItem("token"));
            setMeetings(history);
        }


        fetchHistory();
    }, [])

    let formateDate = (dateString) => {
        let day = dateString.slice(8,10);
        let month = dateString.slice(5,7);
        let year = dateString.slice(0,4);

        return `${day}/${month}/${year}`
    }

    return ( 
        <div>
            <IconButton style={{height: "50px"}} onClick={() => {navigate("/home")}}>
                <HomeIcon/>
            </IconButton>

            {meetings.length > 0 ? 
            meetings.map((meeting, index) => (
                <Card key={index} sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Date : {formateDate(meeting.date)}
                        </Typography>
                        <Typography variant="h5" component="div">
                        </Typography>
                        <Typography  sx={{ color: 'text.secondary', mb: 1.5 }}>
                            code : {meeting.meeting_code}
                        </Typography>
                    </CardContent>
                </Card>
            )) : <div style={{display : "flex", flexDirection: "column", alignItems: "center", marginTop: "100px"}}>
                    <h1>No Data</h1>
                    <img style={{height: "50vh"}} src={imgNoData} alt="" />
                </div>}
        </div>
     );
}

export default History;