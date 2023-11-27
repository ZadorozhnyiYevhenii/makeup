import React from 'react';
import './App.scss';
import {Header} from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/makeup/'>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
