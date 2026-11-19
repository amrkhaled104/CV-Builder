import { useRef, useState, useMemo } from "react";
import "./App.css";
import HeaderBar from "./components/layout/HeaderBar/HeaderBar.jsx";
import FormInputs from "./components/layout/FormInput/FormInputs.jsx";
import CvPreview from "./components/layout/CvReview/CvPreview.tsx";
import AtsAuditModal from "./components/layout/AtsAuditModal/AtsAuditModal.tsx";
import AiKeyModal from "./components/layout/AiKeyModal/AiKeyModal.tsx";
import { hasAiKey } from "./utils/aiKeyStorage";
import { useSectionOrder } from "./hooks/useSectionOrder";
import { useCustomSections } from "./hooks/useCustomSections";
import * as Sample from "./data/sampleData.js";
import {
  saveSessionToStorage,
  loadSessionFromStorage,
  hasSavedSessionInStorage,
  exportCvToJson,
  importCvFromJson,
  type CvSessionData,
  type GeneralInfo,
  type EducationItem,
  type ExperienceItem,
  type ProjectItem,
  type SkillCategory,
} from "./utils/storage";
import { runAtsAudit } from "./utils/atsLinter";

function App() {
  const cvRef = useRef<HTMLDivElement>(null);
  const [hasSavedDraft, setHasSavedDraft] = useState(() =>
    hasSavedSessionInStorage(),
  );
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [, setIsSampleMode] = useState(false);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [hasKey, setHasKey] = useState(() => hasAiKey());

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

  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
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

  const [educationList, setEducationList] = useState<EducationItem[]>([
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

  const [workList, setWorkList] = useState<ExperienceItem[]>([
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

  const [projectList, setProjectList] = useState<ProjectItem[]>([]);
  const [skillList, setSkillList] = useState<SkillCategory[]>([]);

  // Memoized ATS & Omar Shawky's Guide Audit
  const auditResult = useMemo(
    () =>
      runAtsAudit({
        generalInfo,
        educationList,
        workList,
        projectList,
        skillList,
        customSections,
      }),
    [generalInfo, educationList, workList, projectList, skillList, customSections],
  );

  function handleSave() {
    const sessionData: Omit<CvSessionData, "version" | "savedAt"> = {
      generalInfo,
      educationList,
      workList,
      projectList,
      skillList,
      customSections,
      sectionOrder,
    };

    const success = saveSessionToStorage(sessionData);
    if (success) {
      setHasSavedDraft(true);
      setIsSavedRecently(true);
      setTimeout(() => setIsSavedRecently(false), 1500);
    }
  }

  function handleResume() {
    const sessionData = loadSessionFromStorage();
    if (!sessionData) return;

    if (sessionData.generalInfo) setGeneralInfo(sessionData.generalInfo);
    if (sessionData.educationList) setEducationList(sessionData.educationList);
    if (sessionData.workList) setWorkList(sessionData.workList);
    if (sessionData.projectList) setProjectList(sessionData.projectList);
    if (sessionData.skillList) setSkillList(sessionData.skillList);
    if (sessionData.customSections) setCustomSections(sessionData.customSections);
    if (sessionData.sectionOrder) setSectionOrder(sessionData.sectionOrder);
    setIsSampleMode(false);
  }

  function handleExportJson() {
    exportCvToJson({
      generalInfo,
      educationList,
      workList,
      projectList,
      skillList,
      customSections,
      sectionOrder,
    });
  }

  async function handleImportJson(file: File) {
    try {
      const data = await importCvFromJson(file);
      if (data.generalInfo) setGeneralInfo(data.generalInfo);
      if (data.educationList) setEducationList(data.educationList);
      if (data.workList) setWorkList(data.workList);
      if (data.projectList) setProjectList(data.projectList);
      if (data.skillList) setSkillList(data.skillList);
      if (data.customSections) setCustomSections(data.customSections);
      if (data.sectionOrder) setSectionOrder(data.sectionOrder);
      setHasSavedDraft(true);
      setIsSampleMode(false);
      alert("CV data imported successfully!");
    } catch (err: unknown) {
      alert((err as Error).message || "Failed to import CV JSON.");
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
        cvRef={cvRef}
        onSave={handleSave}
        isSavedRecently={isSavedRecently}
        hasSavedDraft={hasSavedDraft}
        onResume={handleResume}
        onSample={handleSample}
        isReordering={isReordering}
        onToggleReordering={toggleReordering}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onOpenAtsModal={() => setIsAtsModalOpen(true)}
        atsScore={auditResult.score}
        hasAiKey={hasKey}
        onOpenAiModal={() => setIsAiModalOpen(true)}
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
          onMissingKey={() => setIsAiModalOpen(true)}
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

      <AtsAuditModal
        isOpen={isAtsModalOpen}
        onClose={() => setIsAtsModalOpen(false)}
        auditResult={auditResult}
      />

      <AiKeyModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onKeyUpdated={(status) => setHasKey(status)}
      />
    </>
  );
}

export default App;
