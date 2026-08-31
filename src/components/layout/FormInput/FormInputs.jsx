import "./FormInputs.css";
import GeneralInfo from "../../../Forms/GeneralInfo.jsx";
import EducationalExpperience from "../../../Forms/EducationExp.jsx";

export default function FormInputs({ generalInfo, setGeneralInfo,educationList,setEducationList }) {
  return (
    <section className="leftSidebarForm">
      <GeneralInfo generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} />
      <EducationalExpperience
        educationList={educationList}
        setEducationList={setEducationList}
      />
    </section>
  );
}
