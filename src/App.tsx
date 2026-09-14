import { useRef, useState } from "react";
import "./App.css";
import HeaderBar from "./components/layout/HeaderBar/HeaderBar.jsx";
import FormInputs from "./components/layout/FormInput/FormInputs.jsx";
import CvPreview from "./components/layout/CvReview/CvPreview.tsx";
import { useSectionOrder } from "./hooks/useSectionOrder";
import { useCustomSections } from "./hooks/useCustomSections";
import * as Sample from "./data/sampleData.js";

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
  const cvRef = useRef<HTMLDivElement>(null);
  const [hasSavedDraft, setHasSavedDraft] = useState(() =>
    Boolean(localStorage.getItem("cv_draft")),
  );
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [, setIsSampleMode] = useState(false);

  const {
    sectionOrder,
    setSectionOrder,
    isReordering,
    toggleReordering,
    moveUp,
    moveDown,
    addSection: addSectionKey,
    removeSection: removeSectionKey,
  } = useSectionOrder();

  const {
    customSections,
    setCustomSections,
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

  function handleSave() {
    const cvData = {
      generalInfo,
      educationList,
      workList,
      projectList,
      skillList,
      customSections,
      sectionOrder,
    };
    try {
      localStorage.setItem("cv_draft", JSON.stringify(cvData));
      setHasSavedDraft(true);
      setIsSavedRecently(true);
      setTimeout(() => setIsSavedRecently(false), 1500);
    } catch (err) {
      console.error("Failed to save CV draft:", err);
    }
  }

  function handleResume() {
    try {
      const raw = localStorage.getItem("cv_draft");
      if (!raw) return;
      const cvData = JSON.parse(raw);
      if (cvData.generalInfo) setGeneralInfo(cvData.generalInfo);
      if (cvData.educationList) setEducationList(cvData.educationList);
      if (cvData.workList) setWorkList(cvData.workList);
      if (cvData.projectList) setProjectList(cvData.projectList);
      if (cvData.skillList) setSkillList(cvData.skillList);
      if (cvData.customSections) setCustomSections(cvData.customSections);
      if (cvData.sectionOrder) setSectionOrder(cvData.sectionOrder);
      setIsSampleMode(false);
    } catch (err) {
      console.error("Failed to load CV draft:", err);
    }
  }

  function handleSample() {
    setGeneralInfo(Sample.sampleGeneralInfo);
    setEducationList(Sample.sampleEducation);
    setSkillList(Sample.sampleSkills);
    setWorkList(Sample.sampleWork);
    setProjectList(Sample.sampleProjects);
    const sample = Sample.sampleCustomSections[0];
    if (sample) {
      loadSampleSection(sample);
    }
    setIsSampleMode(true);
  }

  return (
    <>
      <HeaderBar
        cvRef={cvRef} //Now HeaderBar can print that element.
        onSave={handleSave}
        isSavedRecently={isSavedRecently}
        hasSavedDraft={hasSavedDraft}
        onResume={handleResume}
        onSample={handleSample}
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
          onLoadSample={handleSample}
        />
      </div>
    </>
  );
}

export default App;
