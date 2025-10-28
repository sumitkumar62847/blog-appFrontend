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
      <Route path="/" element={<Blogs/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/myBlogs" element={<UserBlogs/>}></Route>
      <Route path="/blogs/add" element={<AddBlogs />}/>
      <Route path="*" element={<Blogs/>}></Route>
    </Routes>
    </main>

  </>
)};

export default App;
