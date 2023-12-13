import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogInForm from "./Components/Forms/Login/LogInForm";
import SignupForm from "./Components/Forms/SignUp/SignupForm";
import Welcome from "./Components/Welcome/Welcome";
import Mails from "./Components/Mails/Mails";
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mails/>}/>
        <Route path="/login" element={<LogInForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
