import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Landing'
import Authentication from './pages/Authentication'
import { AuthProvider } from './contexts/AuthContext'
import VideoMeetComponent from './pages/VideoMeet'
import HomeComponenet from './pages/Home'
import { UserProvider } from './contexts/UserContext'
import History from './pages/History'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/auth' element={<Authentication />} />
                        <Route path='/home' element={<HomeComponenet />} />
                        <Route path='/:url' element={<VideoMeetComponent />} />
                        <Route path='/history' element={<History/>} />
                    </Routes>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
