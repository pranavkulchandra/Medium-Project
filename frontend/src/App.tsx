import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { SingIn } from './pages/SignIn'
import { Blog } from './pages/blog'
import { Blogs } from './pages/Blogs'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path='/signin' element={<SingIn />} />
          <Route path='/blog/;id' element={<Blog />} />
          <Route path='/blogs' element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App