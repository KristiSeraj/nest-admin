import React from 'react';
import Dashboard from './components/Dashboard';
import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} Component={SignIn} />
          <Route path={'/dashboard'} Component={Dashboard} />
          <Route path={'/login'} Component={SignIn} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
