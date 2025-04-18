import './App.css'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ContactPage from './pages/ContactPage'
import DisplayBooks from './pages/DisplayBooks'
import OpenRoute from './components/Auth/OpenRoute'
import Dashboard from './pages/Dashboard'
import PostedBooks from './components/Profile/PostedBooks'
import BorrowedBooks from './components/Profile/BorrowedBooks'
import PrivateRoute from './components/Auth/PrivateRoute'
import {VerifyEmail} from './pages/VerifyEmail'
import AddBook from './components/Book/AddBook'
function App() {

  return (
    <>

      <div className='w-scren min-h-screen flex flex-col font-inter bg-indigo-100'>
        <Navbar />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/signup' element={<OpenRoute><SignupPage /></OpenRoute>} />
          <Route path='/login' element={<OpenRoute><LoginPage /></OpenRoute>} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/explore-books' element={<DisplayBooks />} />
          <Route path="/verify-otp" element={<OpenRoute><VerifyEmail/></OpenRoute>}/>


          <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="/dashboard/user-books" element={<PostedBooks />} />
            <Route path="/dashboard/borrowed-books" element={<BorrowedBooks />} />
          </Route>
          <Route path='/post-book' element={<PrivateRoute><AddBook/></PrivateRoute>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
