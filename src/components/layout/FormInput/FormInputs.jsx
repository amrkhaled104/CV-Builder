import "./FormInputs.css";
import GeneralInfo from "../../../Forms/GeneralInfo.jsx";

export default function FormInputs({ generalInfo, setGeneralInfo }) {
  return (
    <section className="leftSidebarForm">
      <GeneralInfo generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} />
    </section>
  );
}
