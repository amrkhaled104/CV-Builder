import SectionTitle from "../reusables/SectionTitle";
import DynamicList from "../reusables/DynamicList";
import InputRow from "../reusables/InptRow";
import DurationInput from "../reusables/DurationInput";
import ActionButtons from "../reusables/ActionButton";
import FormBox from "../reusables/FormBox";
import FormCard from "../reusables/FormCard";
export default function PracticalExperience({ workList, setWorkList }) {
  function addWork() {
    setWorkList([
      ...workList,
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
      },
    ]);
  }
  function updateEntry(id, field, value) {
    setWorkList(
      workList.map((work) =>
        work.id === id ? { ...work, [field]: value } : work,
      ),
    );
  }

  function removeEntry(id) {
    setWorkList(workList.filter((work) => work.id !== id));
  }
  return (
    <FormCard title="Work Experience">
      <SectionTitle
        title="Professional Experience"
        subtitle="Add internships, jobs or freelance work."
      />

      <DynamicList
        items={workList}
        renderItem={(work) => (
          <WorkInfo
            key={work.id}
            entry={work}
            updateEntry={updateEntry}
            removeEntry={removeEntry}
          />
        )}
      />
      <div className="action-buttons left">
        <ActionButtons text="+ Add Work" variant="primary" onClick={addWork} />
      </div>
    </FormCard>
  );
}

function WorkInfo({ entry, updateEntry, removeEntry }) {
  return (
    <div className="entry-card">
      <InputRow>
        <FormBox label="Company Name">
          <input
            type="text"
            value={entry.companyName}
            onChange={(e) =>
              updateEntry(entry.id, "companyName", e.target.value)
            }
          />
        </FormBox>

        <FormBox label="Position">
          <input
            type="text"
            value={entry.position}
            onChange={(e) => updateEntry(entry.id, "position", e.target.value)}
          />
        </FormBox>
      </InputRow>
      <DurationInput entry={entry} updateEntry={updateEntry} />
      <FormBox label="Responsibilities">
        <textarea
          rows={5}
          placeholder="Write one responsibility per line..."
          value={entry.responsibilities}
          onChange={(e) =>
            updateEntry(entry.id, "responsibilities", e.target.value)
          }
        />
      </FormBox>
      <div className="action-buttons right">
        <ActionButtons
          text="Remove Experience"
          variant="secondary"
          onClick={() => removeEntry(entry.id)}
        />
      </div>
    </div>
  );
}
