import AddArticles from "./components/AddArticles";
import Articles from "./components/Articles";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Article from "./components/Article";
import News from "./components/News";
import React from "react";

function App() {
  return (
    <div className="container">
    <Router>
      <Routes>
        <Route path='/register' element={
          <Register/>
        }/>
        <Route path='/news' element={<News/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path="/article/:id" element={<Article/>}/>
        <Route path='/' element={
          <div className="row mt-5">
        <div className="col-md-8">
          <Articles/>
        </div>
        <div className="col-md-4">
          <AddArticles/>
        </div>
      </div>
        } />
      </Routes>
      <Navbar/>
      </Router>
    </div>
  );
}

export default App;
