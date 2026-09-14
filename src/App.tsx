import "./App.css";
import HeaderBar from "./components/layout/HeaderBar/HeaderBar.jsx";
import FormInputs from "./components/layout/FormInput/FormInputs.jsx";
import CvPreview from "./components/layout/CvReview/CvPreview.tsx";
import { useSectionOrder } from "./hooks/useSectionOrder";
import { useCustomSections } from "./hooks/useCustomSections";
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

type ProjectLink = {
  id: string;
  title: string;
  customTitle: string;
  url: string;
};

type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  durationType: string;
  startDate: string;
  endDate: string;
  customDuration: string;
  isCurrent: boolean;
  links: ProjectLink[];
};

function App() {
  const cvRef = useRef(null);
  const {
    sectionOrder,
    isReordering,
    toggleReordering,
    moveUp,
    moveDown,
    addSection: addSectionKey,
    removeSection: removeSectionKey,
  } = useSectionOrder();

  const {
    customSections,
    addSection,
    removeSection,
    updateSectionTitle,
    loadSampleSection,
    addItem,
    updateItem,
    removeItem,
  } = useCustomSections([], {
    onSectionAdded: addSectionKey,
    onSectionRemoved: removeSectionKey,
  });

  function handleLoadSampleSection() {
    const sample = Sample.sampleCustomSections[0];
    if (sample) {
      loadSampleSection(sample);
    }
  }

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
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [skillList, setSkillList] = useState<SkillCategory[]>([]);
  function loadSampleCV() {
    setGeneralInfo(Sample.sampleGeneralInfo);
    setEducationList(Sample.sampleEducation);
    setSkillList(Sample.sampleSkills);
    setWorkList(Sample.sampleWork);
    setProjectList(Sample.sampleProjects);
    const sample = Sample.sampleCustomSections[0];
    if (sample) {
      loadSampleSection(sample);
    }
  }
  return (
    <>
      <HeaderBar
        cvRef={cvRef} //Now HeaderBar can print that element.
        loadSampleCV={loadSampleCV}
        isReordering={isReordering}
        onToggleReordering={toggleReordering}
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
          customSections={customSections}
          addSection={addSection}
          removeSection={removeSection}
          updateSectionTitle={updateSectionTitle}
          onLoadSampleSection={handleLoadSampleSection}
          addItem={addItem}
          updateItem={updateItem}
          removeItem={removeItem}
          sectionOrder={sectionOrder}
          isReordering={isReordering}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
        />
        <CvPreview
          generalInfo={generalInfo}
          ref={cvRef}
          educationList={educationList}
          workList={workList}
          projectList={projectList}
          skillList={skillList}
          customSections={customSections}
          sections={sectionOrder}
          onLoadSample={loadSampleCV}
        />
      </div>
    </>
  );
}

export default App;
