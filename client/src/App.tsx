import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home/home'
import User from './routes/User/user'
import CreateUser from './routes/User/createUser'
import UpdateUser from './routes/User/updateUser'
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/user/list' element={<User />} />
          <Route path='/user' element={<CreateUser />} />
          <Route path='/user/:id' element={<UpdateUser />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
