import FormCard from "../reusables/FormCard.jsx";
import SectionTitle from "../reusables/SectionTitle.jsx";
import DynamicList from "../reusables/DynamicList.jsx";
import FormBox from "../reusables/FormBox.jsx";
import InputRow from "../reusables/InptRow.jsx";
import ActionButtons from "../reusables/ActionButton.jsx";

export default function EducationalExperience({
  educationList,
  setEducationList,
}) {
  function updateEntry(id, field, value) {
    setEducationList(
      educationList.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    );
  }

  function removeEntry(id) {
    setEducationList(educationList.filter((entry) => entry.id !== id));
  }
  return (
    <FormCard title="Education">
      <SectionTitle
        title="Educational Qualifications"
        subtitle="Add all your schools, colleges and universities."
      />
      <DynamicList
        items={educationList}
        renderItem={(education) => (
          <EducationInfo key={education.id} entry={education} />
        )}
      />
    </FormCard>
  );
}

function EducationInfo({ entry }) {
  return (
    <>
      <InputRow>
        <FormBox label="School / University">
          <input
            type="text"
            value={entry.schoolName}
            onChange={(e) =>
              updateEntry(entry.id, "schoolName", e.target.value)
            }
          />
        </FormBox>
        <FormBox label="Place">
          <input
            type="text"
            value={entry.place}
            onChange={(e) => updateEntry(entry.id, "place", e.target.value)}
          />
        </FormBox>
      </InputRow>
      <InputRow>
        <FormBox label="Degree / Course">
          <input
            type="text"
            value={entry.study}
            onChange={(e) => updateEntry(entry.id, "study", e.target.value)}
          />
        </FormBox>
        <FormBox label="Grade">
          <input
            type="text"
            placeholder="8.92 CGPA / 91% / First Class"
            value={entry.grade}
            onChange={(e) => updateEntry(entry.id, "grade", e.target.value)}
          />
        </FormBox>
      </InputRow>
      
      <div className="action-buttons right">
        <ActionButtons
          text="Remove Education"
          variant="secondary"
          onClick={() => removeEntry(entry.id)}
        />
      </div>
    </>
  );
}
