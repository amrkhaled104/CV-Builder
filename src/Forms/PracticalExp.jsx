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
        location: "",
        companyDescription: "",
        linkText: "",
        linkUrl: "",
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
      {/* <SectionTitle
        title="Professional Experience"
        subtitle="Add internships, jobs or freelance work."
      /> */}
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
            placeholder="Google"
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
        <FormBox label="Location">
          <input
            type="text"
            placeholder="e.g., Mansoura, Egypt"
            value={entry.location || ""}
            onChange={(e) => updateEntry(entry.id, "location", e.target.value)}
          />
        </FormBox>
      </InputRow>
      <FormBox label="Company Description">
        <input
          type="text"
          placeholder="Brief description of the company or team"
          value={entry.companyDescription || ""}
          onChange={(e) =>
            updateEntry(entry.id, "companyDescription", e.target.value)
          }
        />
      </FormBox>
      <InputRow>
        <FormBox label="Company / Project Link Text">
          <input
            type="text"
            placeholder="Company website"
            value={entry.linkText || ""}
            onChange={(e) => updateEntry(entry.id, "linkText", e.target.value)}
          />
        </FormBox>
        <FormBox label="Company / Project Link URL">
          <input
            type="url"
            placeholder="https://..."
            value={entry.linkUrl || ""}
            onChange={(e) => updateEntry(entry.id, "linkUrl", e.target.value)}
          />
        </FormBox>
      </InputRow>
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
      <DurationInput entry={entry} updateEntry={updateEntry} />
      <div className="action-buttons right">
        <ActionButtons
          text="Remove Experience"
          variant="link"
          onClick={() => removeEntry(entry.id)}
        />
      </div>
    </div>
  );
}
