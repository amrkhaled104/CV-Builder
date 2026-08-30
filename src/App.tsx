import "./App.css";
import HeaderBar from "./components/layout/HeaderBar/HeaderBar.jsx";
import FormInputs from "./components/layout/FormInput/FormInputs.jsx";
import CvPreview from "./components/layout/CvReview/CvPreview.jsx";
import { useRef, useState } from "react";

function App() {
   const cvRef = useRef(null);
  const [generalInfo, setGeneralInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
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
        <CvPreview generalInfo={generalInfo} ref={cvRef} />
      </div>
    </>
  );
}

export default App;
