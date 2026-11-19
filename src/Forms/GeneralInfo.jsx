import FormCard from "../reusables/FormCard.jsx";
import InputRow from "../reusables/InputRow.jsx";
import FormBox from "../reusables/FormBox.jsx";
import DynamicList from "../reusables/DynamicList.jsx";
import LinkCard from "../reusables/LinkCard.jsx";
import ActionButtons from "../reusables/ActionButton.jsx";
import AiEnhanceBox from "../components/common/AiEnhanceSection/AiEnhanceBox.tsx";
import { generateId } from "../utils/id";

export default function GeneralInfo({
  generalInfo,
  setGeneralInfo,
  sectionOrder,
  isReordering,
  onMoveUp,
  onMoveDown,
  onMissingKey,
}) {
  function handleChange(field, value) {
    setGeneralInfo({ ...generalInfo, [field]: value });
  }

  function updateLink(id, field, value) {
    setGeneralInfo((prev) => ({
      ...prev,
      links: prev.links.map((link) =>
        link.id === id ? { ...link, [field]: value } : link,
      ),
    }));
  }

  function removeLink(id) {
    setGeneralInfo((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link.id !== id),
    }));
  }

  function addLink() {
    setGeneralInfo((prev) => ({
      ...prev,
      links: [
        ...prev.links,
        {
          id: generateId(),
          title: "",
          customTitle: "",
          url: "",
        },
      ],
    }));
  }

  return (
    <FormCard
      title="General Information"
      sectionKey="summary"
      sectionOrder={sectionOrder}
      isReordering={isReordering}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    >
      {/* 1. Personal Details */}
      <div className="form-sub-group">
        <h3 className="form-sub-heading">Personal Details</h3>
        <InputRow columns={2}>
          <FormBox label="First Name">
            <input
              type="text"
              placeholder="e.g., FIRST"
              value={generalInfo.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </FormBox>

          <FormBox label="Last Name">
            <input
              type="text"
              placeholder="e.g., LAST"
              value={generalInfo.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </FormBox>
        </InputRow>

        <InputRow columns={2}>
          <FormBox label="Headline">
            <input
              type="text"
              placeholder="e.g., Software Engineer | CSE"
              value={generalInfo.headline}
              onChange={(e) => handleChange("headline", e.target.value)}
            />
          </FormBox>

          <FormBox label="Location">
            <input
              type="text"
              placeholder="e.g., Cairo, Egypt"
              value={generalInfo.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </FormBox>
        </InputRow>
      </div>

      {/* 2. Contact Details */}
      <div className="form-sub-group">
        <h3 className="form-sub-heading">Contact Details</h3>
        <InputRow columns={2}>
          <FormBox label="Email">
            <input
              type="email"
              placeholder="e.g., firstname@gmail.com"
              value={generalInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </FormBox>

          <FormBox label="Phone Number">
            <input
              type="tel"
              placeholder="e.g., +20 123 456 7890"
              value={generalInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </FormBox>
        </InputRow>
      </div>

      {/* 3. Professional Bio / Summary */}
      <div className="form-sub-group">
        <h3 className="form-sub-heading">Professional Bio</h3>
        <FormBox label="Short Summary">
          <textarea
            rows={4}
            placeholder="Write a concise professional summary highlighting your core tech background..."
            value={generalInfo.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
          />
        </FormBox>
        <AiEnhanceBox
          sectionType="summary"
          rawContent={generalInfo.bio}
          context={generalInfo.headline}
          onAccept={(improved) => handleChange("bio", improved)}
          onMissingKey={onMissingKey}
        />
      </div>

      {/* 4. Links & Profiles */}
      <div className="form-sub-group">
        <div className="form-sub-heading-row">
          <h3 className="form-sub-heading">Links & Profiles</h3>
        </div>

        <DynamicList
          items={generalInfo.links || []}
          renderItem={(link) => (
            <LinkCard key={link.id}>
              <InputRow columns={2}>
                <FormBox label="Platform">
                  <select
                    value={link.title}
                    onChange={(e) =>
                      updateLink(link.id, "title", e.target.value)
                    }
                  >
                    <option value="">Select Platform</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="LeetCode">LeetCode</option>
                    <option value="Codeforces">Codeforces</option>
                    <option value="HackerRank">HackerRank</option>
                    <option value="Website">Website</option>
                    <option value="Other">Other</option>
                  </select>
                </FormBox>

                <FormBox label="URL">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => updateLink(link.id, "url", e.target.value)}
                  />
                </FormBox>
              </InputRow>

              {link.title === "Other" && (
                <FormBox label="Custom Title">
                  <input
                    type="text"
                    placeholder="e.g., Blog or Portfolio"
                    value={link.customTitle || ""}
                    onChange={(e) =>
                      updateLink(link.id, "customTitle", e.target.value)
                    }
                  />
                </FormBox>
              )}

              <div className="action-buttons right">
                <ActionButtons
                  text="× Remove"
                  variant="link"
                  onClick={() => removeLink(link.id)}
                />
              </div>
            </LinkCard>
          )}
        />

        <div className="action-buttons left">
          <ActionButtons text="+ Add Link" variant="subtle" onClick={addLink} />
        </div>
      </div>
    </FormCard>
  );
}
