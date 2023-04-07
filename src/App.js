import "./App.css";
import "./index.css";
import Home from "./components/Home";
import { Provider } from "react-redux";
import Login from "./components/Login";
import Redirect from "./components/Redirect";
import MainPage from "./components/MainPage";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Redirect />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </>
    </div>
  );
}

export default App;
