import './LandingPage.css'
import moblieImg from '../assets/mobile.png';
import {Link, useNavigate} from "react-router-dom"

function LandingPage() {

    let router = useNavigate();

    let getRandom = () => {
        let code = Math.floor(Math.random() * 900000000) + 1;
        return code;
    }

    return ( 
        <div className="LandingPageContainer">
            <nav>
                <div className='navHeader'>
                    VidChat
                </div>
                <div className='navLists'>
                    <p onClick={() => {
                        router(`/meet/${getRandom()}`)
                    }}>Join as guest</p>
                    <p onClick={() => {
                        router("/auth")
                    }} >Register</p>
                    <div onClick={() => {
                        router("/auth")
                    }} >
                        <p  >Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div className='mainDescription'>
                    <h1><span style={{color : '#d97500'}}>Connect</span> With your <br /> Loved Onces</h1>
                    <p>Cover a distance by VidChat</p>
                    <div role='button'>
                        <Link to={"/home"}>Get Started</Link>
                    </div>
                </div>
                <div className='mainImg'>
                    <img src={moblieImg} alt="" />
                </div>
            </div>
        </div>
     );
}

export default LandingPage;