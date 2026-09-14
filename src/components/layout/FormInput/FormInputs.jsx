import "./FormInputs.css";
import GeneralInfo from "../../../Forms/GeneralInfo.jsx";
import EducationalExperience from "../../../Forms/EducationExp.jsx";
import PracticalExperience from "../../../Forms/PracticalExp.jsx";
import Project from "../../../Forms/Projects.jsx";
import Skill from "../../../Forms/Skills.jsx";
import CustomSections from "../../../Forms/CustomSections.jsx";

export default function FormInputs({
  generalInfo,
  setGeneralInfo,
  educationList,
  setEducationList,
  workList,
  setWorkList,
  projectList,
  setProjectList,
  skillList,
  setSkillList,
  customSections,
  addSection,
  removeSection,
  updateSectionTitle,
  addItem,
  updateItem,
  removeItem,
  onLoadSampleSection,
  sectionOrder,
  isReordering,
  onMoveUp,
  onMoveDown,
}) {
  return (
    <section className="leftSidebarForm">
      <GeneralInfo
        generalInfo={generalInfo}
        setGeneralInfo={setGeneralInfo}
        sectionOrder={sectionOrder}
        isReordering={isReordering}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
      <EducationalExperience
        educationList={educationList}
        setEducationList={setEducationList}
        sectionOrder={sectionOrder}
        isReordering={isReordering}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
      <PracticalExperience
        workList={workList}
        setWorkList={setWorkList}
        sectionOrder={sectionOrder}
        isReordering={isReordering}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
      <Project
        projectList={projectList}
        setProjectList={setProjectList}
        sectionOrder={sectionOrder}
        isReordering={isReordering}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
      <Skill
        skillList={skillList}
        setSkillList={setSkillList}
        sectionOrder={sectionOrder}
        isReordering={isReordering}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
      <CustomSections
        customSections={customSections}
        addSection={addSection}
        removeSection={removeSection}
        updateSectionTitle={updateSectionTitle}
        onLoadSampleSection={onLoadSampleSection}
        addItem={addItem}
        updateItem={updateItem}
        removeItem={removeItem}
        sectionOrder={sectionOrder}
        isReordering={isReordering}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
    </section>
  );
}
