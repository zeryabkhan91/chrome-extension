import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Home from './components/Home';
import Redirect from './components/Redirect';

function App() {
  return (
    <div className="App">
      <>
      <Redirect />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      </BrowserRouter>
      </>
    </div>
  );
}

export default App;
