import "./App.css";
import HeaderBar from "./components/layout/HeaderBar/HeaderBar.jsx";
import FormInputs from "./components/layout/FormInput/FormInputs.jsx";
import CvPreview from "./components/layout/CvReview/CvPreview.tsx";
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
  const [educationList, setEducationList] = useState([
    {
      id: crypto.randomUUID(),
      schoolName: "",
      study: "",
      place: "",
      grade: "",
      durationType: "date",
      startDate: "",
      endDate: "",
      customDuration: "",
      isCurrent: false,
    },
  ]);
  const [workList, setWorkList] = useState([
    {
      id: crypto.randomUUID(),
      companyName: "",
      position: "",
      responsibilities: "",
      durationType: "date",
      startDate: "",
      endDate: "",
      customDuration: "",
      isCurrent: false,
    },
  ]);

  return (
    <>
      <HeaderBar
        cvRef={cvRef} //Now HeaderBar can print that element.
      />
      <div className="mainContent">
        <FormInputs
          generalInfo={generalInfo}
          setGeneralInfo={setGeneralInfo}
          educationList={educationList}
          setEducationList={setEducationList}
          workList={workList}
          setWorkList={setWorkList}
        />
        <CvPreview
          generalInfo={generalInfo}
          ref={cvRef}
          educationList={educationList}
        />
      </div>
    </>
  );
}

export default App;
