import './App.css';
import { Landing } from './components/Landing';
import ConnectedFetchData from './components/FetchData';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cities" element={<ConnectedFetchData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
