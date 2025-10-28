import { Route, Routes } from "react-router-dom";
import Header from './componets/Header';
import Login from './componets/Login';
import Blogs from './componets/Blogs';
import UserBlogs from './componets/UserBlogs'
import AddBlogs from './componets/AddBlogs'



function App() {
  
  return (
  <>
    <header>
      <Header/>
    </header>
    <main>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/myBlogs" element={<UserBlogs/>}></Route>
      <Route path="/blogs/add" element={<AddBlogs />}/>
    </Routes>
    </main>

  </>
)};

export default App;
