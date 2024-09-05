
import './App.css';
import AdminPortal from './components/AdminPortal';
import AdminSignLog from './components/AdminSignLog';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import { UserContextProvider } from './components/UserContext';
import React,{useState} from 'react';
import {Routes,Route} from 'react-router-dom';


function App() {
  const [token,setToken]=useState(null);
  return (


    <UserContextProvider value={{token,setToken}}>
      <Routes>
        <Route path='/' element={<AuthPage/>}/>
        <Route path='/emp' element={<AuthPage/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
        <Route path='/adminpage' element={<AdminSignLog/>}/>
        <Route path='/adminportal' element={<AdminPortal/>}/>
      </Routes>

    </UserContextProvider>
      
      
  
  );
}

export default App;
