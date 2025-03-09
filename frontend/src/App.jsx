import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

import Layout from 'src/components/Layout'
import Home from 'src/pages/Home'
import Search from 'src/pages/Search';
import Reports from 'src/pages/Reports';
import Setting from 'src/pages/Setting';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/search-score" element={<Search />}/>
          <Route path="/reports" element={<Reports />}/>
          <Route path="/settings" element={<Setting />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
