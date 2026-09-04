import "./FormInputs.css";
import GeneralInfo from "../../../Forms/GeneralInfo.jsx";
import EducationalExpperience from "../../../Forms/EducationExp.jsx";
import PracticalExperience from "../../../Forms/PracticalExp.jsx";
import Project from "../../../Forms/Projects.jsx";

export default function FormInputs({
  generalInfo,
  setGeneralInfo,
  educationList,
  setEducationList,
  workList,
  setWorkList,
  projectList,
  setProjectList,
}) {
  return (
    <section className="leftSidebarForm">
      <GeneralInfo generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} />
      <EducationalExpperience
        educationList={educationList}
        setEducationList={setEducationList}
      />
      <PracticalExperience workList={workList} setWorkList={setWorkList} />
      <Project projectList={projectList} setProjectList={setProjectList} />
    </section>
  );
}
