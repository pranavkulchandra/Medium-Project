import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { SingIn } from './pages/SignIn'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path='/signin' element={<SingIn />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App