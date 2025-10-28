import { Route, Routes } from "react-router-dom";
import Header from './componets/Header';
import React, { useEffect } from 'react';
import Login from './componets/Login';
import Blogs from './componets/Blogs';
import UserBlogs from './componets/UserBlogs'
import AddBlogs from './componets/AddBlogs'
import { useDispatch } from 'react-redux';
import { authActions } from './store';



function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    if(userId){
      dispatch(authActions.login());
    }
  },[dispatch]);
  
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
