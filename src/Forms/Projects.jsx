import FormBox from "../reusables/FormBox";
import FormCard from "../reusables/FormCard";
import DurationInput from "../reusables/DurationInput";
import SectionTitle from "../reusables/SectionTitle";
import DynamicList from "../reusables/DynamicList";
import ActionButtons from "../reusables/ActionButton";
import InputRow from "../reusables/InptRow";
import LinkCard from "../reusables/LinkCard";
export default function Project({ projectList, setProjectList }) {
  function addProject() {
    setProjectList([
      ...projectList,
      {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        durationType: "date",
        startDate: "",
        endDate: "",
        customDuration: "",
        isCurrent: false,
        links: [
          {
            id: crypto.randomUUID(),
            title: "",
            customTitle: "",
            url: "",
          },
        ],
      },
    ]);
  }
  function updateEntry(id, field, value) {
    setProjectList(
      projectList.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    );
  }

  function removeEntry(id) {
    setProjectList(projectList.filter((project) => project.id !== id));
  }
  function addLink(projectId) {
    setProjectList(
      projectList.map((project) =>
        project.id === projectId
          ? {
              ...project,
              links: [
                ...project.links,
                {
                  id: crypto.randomUUID(),
                  title: "",
                  customTitle: "",
                  url: "",
                },
              ],
            }
          : project,
      ),
    );
  }

  function updateLink(projectId, linkId, field, value) {
    setProjectList(
      projectList.map((project) =>
        project.id === projectId
          ? {
              ...project,
              links: project.links.map((link) =>
                link.id === linkId ? { ...link, [field]: value } : link,
              ),
            }
          : project,
      ),
    );
  }

  function removeLink(projectId, linkId) {
    setProjectList(
      projectList.map((project) =>
        project.id === projectId
          ? {
              ...project,
              links: project.links.filter((link) => link.id !== linkId),
            }
          : project,
      ),
    );
  }
  return (
    <FormCard title="Projects">
      {/* <SectionTitle title="Projects" subtitle="Highlight your best work." /> */}
      <DynamicList
        items={projectList}
        renderItem={(project) => (
          <ProjectInfo
            key={project.id}
            entry={project}
            updateEntry={updateEntry}
            addLink={addLink}
            updateLink={updateLink}
            removeLink={removeLink}
            removeEntry={removeEntry}
          />
        )}
      />
      <div className="action-buttons left">
        <ActionButtons
          text="+ Add Project"
          variant="primary"
          onClick={addProject}
        />
      </div>
    </FormCard>
  );
}

function ProjectInfo({
  entry,
  updateEntry,
  addLink,
  updateLink,
  removeLink,
  removeEntry,
}) {
  return (
    <div className="entry-card">
      <FormBox label="Project Title">
        <input
          type="text"
          value={entry.title}
          onChange={(e) => updateEntry(entry.id, "title", e.target.value)}
        />
      </FormBox>
      <FormBox label="Description">
        <textarea
          rows={5}
          placeholder="Write one point per line..."
          value={entry.description}
          onChange={(e) => updateEntry(entry.id, "description", e.target.value)}
        />
      </FormBox>
      <SectionTitle title="Project Links" />
      <DynamicList
        items={entry.links}
        renderItem={(link) => (
          <LinkCard key={link.id}>
            <InputRow>
              <FormBox label="Link Type">
                <select
                  value={link.title}
                  onChange={(e) =>
                    updateLink(entry.id, link.id, "title", e.target.value)
                  }
                >
                  <option value="">Select Link Type</option>
                  <option value="GitHub Repo">GitHub Repo</option>
                  <option value="Live Demo">Live Demo</option>
                  <option value="Other">Other</option>
                </select>
              </FormBox>

              <FormBox label="URL">
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) =>
                    updateLink(entry.id, link.id, "url", e.target.value)
                  }
                />
              </FormBox>
            </InputRow>

            {link.title === "Other" && (
              <FormBox label="Custom Title">
                <input
                  type="text"
                  placeholder="Documentation / Figma / Video Demo"
                  value={link.customTitle || ""}
                  onChange={(e) =>
                    updateLink(entry.id, link.id, "customTitle", e.target.value)
                  }
                />
              </FormBox>
            )}
            <div className="action-buttons right">
              <ActionButtons
                text="×"
                variant="icon"
                onClick={() => removeLink(entry.id, link.id)}
              />
            </div>
          </LinkCard>
        )}
      />
      <div className="action-buttons left">
        <ActionButtons
          text="+ Add Link"
          variant="subtle"
          onClick={() => addLink(entry.id)}
        />
      </div>
      <DurationInput entry={entry} updateEntry={updateEntry} />
      <div className="action-buttons right">
        <ActionButtons
          text="Remove Project"
          variant="link"
          onClick={() => removeEntry(entry.id)}
        />
      </div>
    </div>
  );
}
