import "./FormInputs.css";
import GeneralInfo from "../../../Forms/GeneralInfo.jsx";
import EducationalExpperience from "../../../Forms/EducationExp.jsx";
import PracticalExperience from "../../../Forms/PracticalExp.jsx";

export default function FormInputs({
  generalInfo,
  setGeneralInfo,
  educationList,
  setEducationList,
  workList,
  setWorkList,
}) {
  return (
    <section className="leftSidebarForm">
      <GeneralInfo generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} />
      <EducationalExpperience
        educationList={educationList}
        setEducationList={setEducationList}
      />
      <PracticalExperience workList={workList} setWorkList={setWorkList} />
    </section>
  );
}
