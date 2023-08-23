import './App.css';
import { Landing } from './components/Landing';
import { FetchData } from './components/FetchData';


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cities" element={<FetchData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
