import FormCard from "../reusables/FormCard.jsx";
import DynamicList from "../reusables/DynamicList.jsx";
import FormBox from "../reusables/FormBox.jsx";
import InputRow from "../reusables/InptRow.jsx";
import ActionButtons from "../reusables/ActionButton.jsx";
import DurationInput from "../reusables/DurationInput.jsx";

import "../Common.css";

export default function EducationalExperience({
  educationList,
  setEducationList,
  sectionOrder,
  isReordering,
  onMoveUp,
  onMoveDown,
}) {
  function addEducation() {
    setEducationList([
      ...educationList,
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
  }
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
    <FormCard
      title="Education"
      sectionKey="education"
      sectionOrder={sectionOrder}
      isReordering={isReordering}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    >
      <DynamicList
        items={educationList}
        renderItem={(education) => (
          <EducationInfo
            key={education.id}
            entry={education}
            updateEntry={updateEntry}
            removeEntry={removeEntry}
          />
        )}
      />
      <div className="action-buttons left">
        <ActionButtons
          text="+ Add Education"
          variant="primary"
          onClick={addEducation}
        />
      </div>
    </FormCard>
  );
}

function EducationInfo({ entry, updateEntry, removeEntry }) {
  return (
    <div className="entry-card">
      <InputRow columns={1}>
        <FormBox label="School / University">
          <input
            type="text"
            placeholder="e.g., Mansoura University"
            value={entry.schoolName}
            onChange={(e) =>
              updateEntry(entry.id, "schoolName", e.target.value)
            }
          />
        </FormBox>
        <FormBox label="Place / Location">
          <input
            type="text"
            placeholder="e.g., Mansoura, Egypt"
            value={entry.place}
            onChange={(e) => updateEntry(entry.id, "place", e.target.value)}
          />
        </FormBox>
        <FormBox label="Degree / Major">
          <input
            type="text"
            placeholder="e.g., B.S. in Computer Engineering"
            value={entry.study}
            onChange={(e) => updateEntry(entry.id, "study", e.target.value)}
          />
        </FormBox>
        <FormBox label="Grade / GPA">
          <input
            type="text"
            placeholder="e.g., 3.8/4.0 or 94%"
            value={entry.grade}
            onChange={(e) => updateEntry(entry.id, "grade", e.target.value)}
          />
        </FormBox>
        <FormBox label="Subtitle / Department">
          <input
            type="text"
            placeholder="e.g., Computer Systems Engineering Department"
            value={entry.subTitle}
            onChange={(e) => updateEntry(entry.id, "subTitle", e.target.value)}
          />
        </FormBox>
        <FormBox label="Link Text">
          <input
            type="text"
            placeholder="e.g., Portfolio Link or Certificate"
            value={entry.linkText}
            onChange={(e) => updateEntry(entry.id, "linkText", e.target.value)}
          />
        </FormBox>
        <FormBox label="Link URL">
          <input
            type="url"
            placeholder="e.g., https://..."
            value={entry.linkUrl}
            onChange={(e) => updateEntry(entry.id, "linkUrl", e.target.value)}
          />
        </FormBox>
        <FormBox label="Coursework & Highlights">
          <textarea
            rows={4}
            placeholder="e.g., Programming Coursework: DSA, OOP (one per line)"
            value={entry.bullets}
            onChange={(e) => updateEntry(entry.id, "bullets", e.target.value)}
          />
        </FormBox>
        <DurationInput entry={entry} updateEntry={updateEntry} />
      </InputRow>

      <div className="action-buttons right">
        <ActionButtons
          text="Remove Education"
          variant="link"
          onClick={() => removeEntry(entry.id)}
        />
      </div>
    </div>
  );
}
