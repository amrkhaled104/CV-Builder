import "./CvPreview.css";
// import { forwardRef } from "react";

type LinkInfo = {
  id: string;
  title: string;
  customTitle: string;
  url: string;
};

type GeneralInfo = {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  bio: string;
  links: LinkInfo[];
};

type EducationItem = {
  id: string;
  schoolName: string;
  study: string;
  place: string;
  grade: string;
  courses?: string;
  durationType: "date" | "hours" | string;
  startDate: string;
  endDate: string;
  customDuration: string;
  isCurrent: boolean;
};
type CvPreviewProps = {
  generalInfo: GeneralInfo;
  ref?: React.Ref<HTMLDivElement>;
  educationList: EducationItem[]; // Replace 'any' with the actual type of your education list
};

function CvPreview({ generalInfo, ref, educationList }: CvPreviewProps) {
  function formatDate(date: string) {
    if (!date) return "";

    const [year, month, day] = date.split("-").map(Number);
    if (!year || !month || !day) return date;

    const monthNames = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];
    const monthName = monthNames[month - 1];

    return `${monthName} ${year}`;
  }

  function getDuration(entry: EducationItem) {
    if (entry.durationType === "custom") return entry.customDuration;

    if (entry.isCurrent) {
      return `${formatDate(entry.startDate)}${entry.startDate ? " – " : ""}Present`;
    }

    return `${formatDate(entry.startDate)}${entry.startDate && entry.endDate ? " – " : ""}${formatDate(entry.endDate)}`;
  }
  return (
    <section className="cvPreview" ref={ref}>
      {/* ================= HEADER ================= */}
      <header className="cv-header">
        <h1 className="cv-name">
          {generalInfo.firstName} {generalInfo.lastName}
        </h1>
        <div className="cv-contact">
          {generalInfo.phone && <span>{generalInfo.phone}</span>}
          {generalInfo.email && (
            <span>
              <a
                href={`mailto:${generalInfo.email}`}
                target="_blank"
                rel="noreferrer"
              >
                {generalInfo.email}
              </a>
            </span>
          )}
          {generalInfo.links
            .filter((link) => link.title && link.url)
            .map((link) => (
              <span key={link.id}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.title === "Other" ? link.customTitle : link.title}
                </a>
              </span>
            ))}
        </div>

        {generalInfo.bio && (
          <>
            <h2 className="cv-section-title">Summary</h2>
            <p className="cv-summary">{generalInfo.bio}</p>
          </>
        )}
      </header>
      {/* ================= EDUCATION ================= */}
      {educationList.length > 0 && (
        <section className="education-section">
          <h2 className="education-section-title">
            Education &amp; Specializations
          </h2>
          {educationList.map((edu) => (
            <div className="entry" key={edu.id}>
              <div className="entry-header">
                <div className="entry-left">
                  <strong>
                    {edu.study}
                    {edu.study && edu.schoolName ? ", " : ""}
                    {edu.schoolName}
                  </strong>
                </div>
                <div className="entry-right">{getDuration(edu)}</div>
              </div>
              <div className="entry-details">
                {edu.courses && <em>Relevant Coursework: {edu.courses}</em>}
                {edu.courses && edu.grade && " | "}
                {edu.grade && <em>Score: {edu.grade}</em>}
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
}

export default CvPreview;
