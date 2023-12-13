import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogInForm from "./Components/Forms/Login/LogInForm";
import SignupForm from "./Components/Forms/SignUp/SignupForm";
import Welcome from "./Components/Welcome/Welcome";
import Mails from "./Components/Mails/Mails";
import AllEmails from "./Components/Mails/AllEmails";
import Header from "./Components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<AllEmails />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/compose" element={<Mails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
