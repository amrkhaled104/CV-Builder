import FormBox from "../reusables/FormBox";
import FormCard from "../reusables/FormCard";
import DurationInput from "../reusables/DurationInput";
import SectionTitle from "../reusables/SectionTitle";
import DynamicList from "../reusables/DynamicList";
import ActionButtons from "../reusables/ActionButton";
import InputRow from "../reusables/InptRow";
import LinkCard from "../reusables/LinkCard";

export default function CustomSections({
  customSections = [],
  addSection,
  removeSection,
  updateSectionTitle,
  onLoadSampleSection,
  addItem,
  updateItem,
  removeItem,
  sectionOrder,
  isReordering,
  onMoveUp,
  onMoveDown,
}) {
  const isSampleLoaded = customSections.some(
    (sec) =>
      sec.id === "custom-open-source-projects" ||
      sec.title?.trim().toLowerCase() === "open source projects",
  );
  function addLink(sectionId, itemId) {
    const targetSection = customSections.find((s) => s.id === sectionId);
    const targetItem = targetSection?.items.find((i) => i.id === itemId);
    const currentLinks = targetItem?.links || [];
    updateItem(sectionId, itemId, "links", [
      ...currentLinks,
      {
        id: crypto.randomUUID(),
        title: "",
        customTitle: "",
        url: "",
      },
    ]);
  }

  function updateLink(sectionId, itemId, linkId, field, value) {
    const targetSection = customSections.find((s) => s.id === sectionId);
    const targetItem = targetSection?.items.find((i) => i.id === itemId);
    const updatedLinks = (targetItem?.links || []).map((link) =>
      link.id === linkId ? { ...link, [field]: value } : link,
    );
    updateItem(sectionId, itemId, "links", updatedLinks);
  }

  function removeLink(sectionId, itemId, linkId) {
    const targetSection = customSections.find((s) => s.id === sectionId);
    const targetItem = targetSection?.items.find((i) => i.id === itemId);
    const updatedLinks = (targetItem?.links || []).filter(
      (link) => link.id !== linkId,
    );
    updateItem(sectionId, itemId, "links", updatedLinks);
  }

  return (
    <>
      {customSections.map((section) => (
        <FormCard
          key={section.id}
          title={section.title || "Custom Section"}
          sectionKey={section.id}
          sectionOrder={sectionOrder}
          isReordering={isReordering}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        >
          <FormBox label="Section Title">
            <input
              type="text"
              placeholder="e.g. OPEN SOURCE PROJECTS, CERTIFICATIONS"
              value={section.title}
              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
            />
          </FormBox>

          <DynamicList
            items={section.items}
            renderItem={(item) => (
              <CustomItemInfo
                key={item.id}
                sectionId={section.id}
                item={item}
                updateItem={updateItem}
                removeItem={removeItem}
                addLink={addLink}
                updateLink={updateLink}
                removeLink={removeLink}
              />
            )}
          />

          <div className="action-buttons left">
            <ActionButtons
              text="+ Add Item"
              variant="primary"
              onClick={() => addItem(section.id)}
            />
            <ActionButtons
              text="Delete Section"
              variant="link"
              onClick={() => removeSection(section.id)}
            />
          </div>
        </FormCard>
      ))}

      <div
        className="action-buttons"
        style={{
          marginTop: "12px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <ActionButtons
          text="+ Add Custom Section"
          variant="primary"
          onClick={() => addSection("NEW SECTION")}
        />
        {onLoadSampleSection && (
          <ActionButtons
            text="Load Sample Section"
            variant="subtle"
            onClick={onLoadSampleSection}
            disabled={isSampleLoaded}
            title={
              isSampleLoaded
                ? "Sample section is already loaded"
                : "Load sample Open Source Projects section"
            }
          />
        )}
      </div>
    </>
  );
}

function CustomItemInfo({
  sectionId,
  item,
  updateItem,
  removeItem,
  addLink,
  updateLink,
  removeLink,
}) {
  return (
    <div className="entry-card">
      <FormBox label="Title / Name">
        <input
          type="text"
          placeholder="e.g. Chromium, AWS Certified Developer"
          value={item.title}
          onChange={(e) => updateItem(sectionId, item.id, "title", e.target.value)}
        />
      </FormBox>

      <FormBox label="Subtitle / Tagline / Overview">
        <input
          type="text"
          placeholder="e.g. Open-source browser engine, Role, or Organization"
          value={item.tagline || ""}
          onChange={(e) => updateItem(sectionId, item.id, "tagline", e.target.value)}
        />
      </FormBox>

      <FormBox label="Description">
        <textarea
          rows={4}
          placeholder="Write one bullet point per line..."
          value={item.description}
          onChange={(e) =>
            updateItem(sectionId, item.id, "description", e.target.value)
          }
        />
      </FormBox>

      <SectionTitle title="Links" />
      <DynamicList
        items={item.links || []}
        renderItem={(link) => (
          <LinkCard key={link.id}>
            <InputRow>
              <FormBox label="Link Type">
                <select
                  value={link.title}
                  onChange={(e) =>
                    updateLink(sectionId, item.id, link.id, "title", e.target.value)
                  }
                >
                  <option value="">Select Link Type</option>
                  <option value="GitHub Repo">GitHub Repo</option>
                  <option value="GitHub Mirror">GitHub Mirror</option>
                  <option value="PR #">Pull Request</option>
                  <option value="Live Demo">Live Demo</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Other">Other</option>
                </select>
              </FormBox>

              <FormBox label="URL">
                <input
                  type="url"
                  placeholder="https://..."
                  value={link.url}
                  onChange={(e) =>
                    updateLink(sectionId, item.id, link.id, "url", e.target.value)
                  }
                />
              </FormBox>
            </InputRow>

            {link.title === "Other" && (
              <FormBox label="Custom Title">
                <input
                  type="text"
                  placeholder="PR #14285 / Portfolio / Article"
                  value={link.customTitle || ""}
                  onChange={(e) =>
                    updateLink(
                      sectionId,
                      item.id,
                      link.id,
                      "customTitle",
                      e.target.value,
                    )
                  }
                />
              </FormBox>
            )}

            <div className="action-buttons right">
              <ActionButtons
                text="×"
                variant="icon"
                onClick={() => removeLink(sectionId, item.id, link.id)}
              />
            </div>
          </LinkCard>
        )}
      />

      <div className="action-buttons left">
        <ActionButtons
          text="+ Add Link"
          variant="subtle"
          onClick={() => addLink(sectionId, item.id)}
        />
      </div>

      <DurationInput
        entry={item}
        updateEntry={(id, field, value) => updateItem(sectionId, id, field, value)}
      />

      <div className="action-buttons right">
        <ActionButtons
          text="Remove Item"
          variant="link"
          onClick={() => removeItem(sectionId, item.id)}
        />
      </div>
    </div>
  );
}
