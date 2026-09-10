import "./App.css";
import HeaderBar from "./components/layout/HeaderBar/HeaderBar.jsx";
import FormInputs from "./components/layout/FormInput/FormInputs.jsx";
import CvPreview from "./components/layout/CvReview/CvPreview.tsx";
import * as Sample from "../src/data/sampleData.js";
import { useRef, useState } from "react";

type Skill = {
  id: string;
  name: string;
};

type SkillCategory = {
  id: string;
  category: string;
  skills: Skill[];
};

function App() {
  const cvRef = useRef(null);
  const [generalInfo, setGeneralInfo] = useState({
    firstName: "",
    lastName: "",
    headline: "",
    phone: "",
    email: "",
    location: "",
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
      subTitle: "",
      linkText: "",
      linkUrl: "",
      bullets: "",
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
      location: "",
      companyDescription: "",
      linkText: "",
      linkUrl: "",
    },
  ]);
  const [projectList, setProjectList] = useState([]);
  const [skillList, setSkillList] = useState<SkillCategory[]>([]);

  function loadSampleCV() {
    setGeneralInfo(Sample.sampleGeneralInfo);
    setEducationList(Sample.sampleEducation);
    setSkillList(Sample.sampleSkills);
    setWorkList(Sample.sampleWork);
  }
  return (
    <>
      <HeaderBar
        cvRef={cvRef} //Now HeaderBar can print that element.
        loadSampleCV={loadSampleCV}
      />
      <div className="mainContent">
        <FormInputs
          generalInfo={generalInfo}
          setGeneralInfo={setGeneralInfo}
          educationList={educationList}
          setEducationList={setEducationList}
          workList={workList}
          setWorkList={setWorkList}
          projectList={projectList}
          setProjectList={setProjectList}
          skillList={skillList}
          setSkillList={setSkillList}
        />
        <CvPreview
          generalInfo={generalInfo}
          ref={cvRef}
          educationList={educationList}
          workList={workList}
          projectList={projectList}
          skillList={skillList}
        />
      </div>
    </>
  );
}

export default App;
