import FormCard from "../reusables/FormCard.jsx";
import FormBox from "../reusables/FormBox.jsx";
import DynamicList from "../reusables/DynamicList.jsx";
import ActionButtons from "../reusables/ActionButton.jsx";

import "../Common.css";

export default function Skill({
  skillList,
  setSkillList,
  sectionOrder,
  isReordering,
  onMoveUp,
  onMoveDown,
}) {
  function addCategory() {
    setSkillList([
      ...skillList,
      {
        id: crypto.randomUUID(),
        category: "",
        skills: [],
      },
    ]);
  }

  function updateCategory(id, value) {
    setSkillList(
      skillList.map((category) =>
        category.id === id ? { ...category, category: value } : category,
      ),
    );
  }

  function removeCategory(id) {
    setSkillList(skillList.filter((category) => category.id !== id));
  }

  function addSkill(categoryId) {
    setSkillList(
      skillList.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              skills: [
                ...category.skills,
                {
                  id: crypto.randomUUID(),
                  name: "",
                },
              ],
            }
          : category,
      ),
    );
  }

  function updateSkill(categoryId, skillId, value) {
    setSkillList(
      skillList.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              skills: category.skills.map((skill) =>
                skill.id === skillId ? { ...skill, name: value } : skill,
              ),
            }
          : category,
      ),
    );
  }

  function removeSkill(categoryId, skillId) {
    setSkillList(
      skillList.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              skills: category.skills.filter((skill) => skill.id !== skillId),
            }
          : category,
      ),
    );
  }

  return (
    <FormCard
      title="Skills"
      sectionKey="skills"
      sectionOrder={sectionOrder}
      isReordering={isReordering}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    >
      <DynamicList
        items={skillList}
        emptyMessage="No skill categories added."
        renderItem={(category) => (
          <SkillCategory
            key={category.id}
            entry={category}
            updateCategory={updateCategory}
            removeCategory={removeCategory}
            addSkill={addSkill}
            updateSkill={updateSkill}
            removeSkill={removeSkill}
          />
        )}
      />

      <div className="action-buttons left">
        <ActionButtons
          text="+ Add Category"
          variant="primary"
          onClick={addCategory}
        />
      </div>
    </FormCard>
  );
}

function SkillCategory({
  entry,
  updateCategory,
  removeCategory,
  addSkill,
  updateSkill,
  removeSkill,
}) {
  return (
    <div className="entry-card">
      <FormBox label="Category Name">
        <input
          type="text"
          placeholder="Programming Languages"
          value={entry.category}
          onChange={(e) => updateCategory(entry.id, e.target.value)}
        />
      </FormBox>

      <DynamicList
        items={entry.skills}
        emptyMessage="No skills added."
        renderItem={(skill) => (
          <div className="skill-item" key={skill.id}>
            <input
              type="text"
              placeholder="React"
              value={skill.name}
              onChange={(e) => updateSkill(entry.id, skill.id, e.target.value)}
            />

            <div className="action-buttons right">
              <ActionButtons
                text="×"
                variant="icon"
                onClick={() => removeSkill(entry.id, skill.id)}
              />
            </div>
          </div>
        )}
      />

      <div className="action-buttons left">
        <ActionButtons
          text="+ Add Skill"
          variant="subtle"
          onClick={() => addSkill(entry.id)}
        />
      </div>

      <div className="action-buttons right">
        <ActionButtons
          text="Remove Category"
          variant="link"
          onClick={() => removeCategory(entry.id)}
        />
      </div>
    </div>
  );
}
