import "./App.css";
import HeaderBar from "./components/layout/HeaderBar/HeaderBar.jsx";
import FormInputs from "./components/layout/FormInput/FormInputs.jsx";
import { useState } from "react";

function App() {
  const [generalInfo, setGeneralInfo] = useState({
    firstName: "",
    lastName: "",
    email:"",
    bio:"",
    links: [
      {
        id: crypto.randomUUID(),
        title: "",
        customTitle: "",
        url: "",
      },
    ],
  });
  return (
    <>
      <HeaderBar />
      <div className="mainContent">
        <FormInputs generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} />
      </div>
    </>
  );
}

export default App;
