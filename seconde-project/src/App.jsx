import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './component/Comment/Home/Home'
import Footer from './component/Comment/Footer/Footer'
import Header from './component/Comment/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Join from './component/Member/Join/Join'
import Login from './component/Member/Login/Login'
import { AuthProvider } from './component/context/AuthContext'
import Info from './component/Member/Info/info'
import BoardList from './component/Board/BoardList'
import BoardForm from './component/Board/BoardForm'
import BoardDetail from './component/Board/BoardDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <Header/>

        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/join" element={<Join/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/info" element={<Info/>}></Route>
          <Route path="/boards" element={<BoardList/>}></Route>
          <Route path="/boardForm" element={<BoardForm/>}></Route>
          <Route path="/boards/:id" element={<BoardDetail/>}></Route>
        </Routes>

        <Footer/>
      </AuthProvider>
    </>
  )
}
export default App;
