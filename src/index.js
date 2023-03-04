import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Blog from './Components/Blog/Blog';
import BlogDetail from './Components/Blog/BlogDetail';
import Home from './Components/Home/Home';
import DetailPagination from './Components/Blog/DetailPagination';
import Member from './Components/Member';
import Account from './Components/Account';
import Myproduct from './Components/Account/Myproduct';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/member/' element={<Member/>}/>
          <Route path='/blog/list/' element={<Blog/>}/>
          <Route path='/blog/detail/:id' element={<BlogDetail/>}/>
          <Route path='/blog/detail/Pagi/:id' element={<DetailPagination/>}/>
          <Route path='/account/update/' element={<Account/>}/>
          <Route path='/account/myproduct/' element={<Myproduct/>}/>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
