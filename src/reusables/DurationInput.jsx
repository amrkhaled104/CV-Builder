import FormBox from "./FormBox";
import DateRow from "./DateRow";
import "./DurationInput.css";
export default function DurationInput({ entry, updateEntry, stacked = false }) {
  return (
    <div>
      <div className="duration-toggle">
        <button
          type="button"
          className={entry.durationType === "date" ? "active" : ""}
          onClick={() => updateEntry(entry.id, "durationType", "date")}
        >
          Date Range
        </button>
        <button
          type="button"
          className={entry.durationType === "custom" ? "active" : ""}
          onClick={() => updateEntry(entry.id, "durationType", "custom")}
        >
          Custom
        </button>
      </div>

      {entry.durationType === "date" ? (
        <>
          <DateRow className={stacked ? "stacked" : ""}>
            <FormBox label="Start Date">
              <input
                type="date"
                value={entry.startDate}
                onChange={(e) =>
                  updateEntry(entry.id, "startDate", e.target.value)
                }
              />
            </FormBox>

            <FormBox label="End Date">
              <input
                type="date"
                disabled={entry.isCurrent}
                value={entry.endDate}
                onChange={(e) =>
                  updateEntry(entry.id, "endDate", e.target.value)
                }
              />
            </FormBox>
          </DateRow>

          <label className="current-checkbox">
            <input
              type="checkbox"
              checked={entry.isCurrent}
              onChange={(e) =>
                updateEntry(entry.id, "isCurrent", e.target.checked)
              }
            />
            Present
          </label>
        </>
      ) : (
        <FormBox label="Duration">
          <input
            type="text"
            placeholder="3 Months / 40 Hours / Summer 2025"
            value={entry.customDuration}
            onChange={(e) =>
              updateEntry(entry.id, "customDuration", e.target.value)
            }
          />
        </FormBox>
      )}
    </div>
  );
}
