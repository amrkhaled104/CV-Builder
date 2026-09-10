import "./CvPreview.css";

type LinkInfo = {
  id: string;
  title: string;
  customTitle: string;
  url: string;
};

type GeneralInfo = {
  firstName: string;
  lastName: string;
  headline: string;
  phone?: string;
  email: string;
  location: string;
  bio: string;
  links: LinkInfo[];
};

type EducationItem = {
  id: string;
  schoolName: string;
  study: string;
  place: string;
  grade: string;
  subTitle?: string;
  linkText?: string;
  linkUrl?: string;
  bullets?: string;
  durationType: "date" | "hours" | string;
  startDate: string;
  endDate: string;
  customDuration: string;
  isCurrent: boolean;
};
type ExperienceItem = {
  id: string;
  companyName: string;
  position: string;
  responsibilities: string;
  durationType: "date" | string;
  startDate: string;
  endDate: string;
  customDuration: string;
  isCurrent: boolean;
};
type ProjectLink = {
  id: string;
  title: string;
  customTitle: string;
  url: string;
};
type ProjectItem = {
  id: string;
  title: string;
  description: string;
  durationType: "date" | "hours" | "custom" | string;
  startDate: string;
  endDate: string;
  customDuration: string;
  isCurrent: boolean;
  links: ProjectLink[];
};
type SkillItem = {
  id: string;
  name: string;
};

type SkillCategory = {
  id: string;
  category: string;
  skills: SkillItem[];
};
type CvPreviewProps = {
  generalInfo: GeneralInfo;
  ref?: React.Ref<HTMLDivElement>;
  educationList: EducationItem[];
  workList: ExperienceItem[];
  projectList: ProjectItem[];
  skillList: SkillCategory[];
};

function CvPreview({
  generalInfo,
  ref,
  educationList,
  workList,
  projectList,
  skillList,
}: CvPreviewProps) {
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

  function getDuration(
    entry: Pick<
      EducationItem | ExperienceItem,
      "durationType" | "customDuration" | "isCurrent" | "startDate" | "endDate"
    >,
  ) {
    if (entry.durationType === "custom") return entry.customDuration;

    if (entry.isCurrent) {
      return `${formatDate(entry.startDate)}${entry.startDate ? " – " : ""}Present`;
    }

    return `${formatDate(entry.startDate)}${entry.startDate && entry.endDate ? " – " : ""}${formatDate(entry.endDate)}`;
  }

  function getLinkLabel(link: LinkInfo) {
    if (link.title === "Other") return link.customTitle || link.url;

    try {
      const url = new URL(link.url);
      return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "")}`;
    } catch {
      return link.url;
    }
  }

  function renderBullet(bullet: string) {
    const colonIndex = bullet.indexOf(":");
    if (colonIndex === -1) return <>{bullet}</>;

    return (
      <>
        <strong>{bullet.slice(0, colonIndex)}:</strong>
        {bullet.slice(colonIndex + 1)}
      </>
    );
  }

  const visibleLinks = generalInfo.links.filter(
    (link) => link.title && link.url,
  );

  return (
    <section className="cvPreview" ref={ref}>
      {/* ================= HEADER ================= */}
      <header className="cv-header">
        <h1 className="cv-name">
          {generalInfo.firstName} {generalInfo.lastName}
        </h1>
        {generalInfo.headline && (
          <div className="cv-headline">{generalInfo.headline}</div>
        )}
        {(generalInfo.phone || generalInfo.email || generalInfo.location) && (
          <div className="cv-header-row cv-contact">
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
            {generalInfo.location && <span>{generalInfo.location}</span>}
          </div>
        )}
        {visibleLinks.length > 0 && (
          <div className="cv-header-row cv-links">
            {visibleLinks.map((link) => (
              <span key={link.id}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {getLinkLabel(link)}
                </a>
              </span>
            ))}
          </div>
        )}

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
          <h2 className="cv-section-title">Education</h2>
          {educationList.map((edu) => {
            const educationBullets =
              edu.bullets
                ?.split("\n")
                .map((bullet) => bullet.trim())
                .filter(Boolean) ?? [];

            return (
              <div className="entry" key={edu.id}>
                <div className="entry-header">
                  <div className="entry-left">
                    <strong>{edu.study}</strong>
                    {edu.study && edu.schoolName && ", "}
                    {edu.schoolName}
                    {edu.place && (
                      <>
                        {edu.study || edu.schoolName ? ", " : ""}
                        <em>{edu.place}</em>
                      </>
                    )}
                    {!educationBullets.length && edu.grade && (
                      <span> (GPA: {edu.grade})</span>
                    )}
                  </div>
                  <div className="entry-right">{getDuration(edu)}</div>
                </div>
                {(edu.subTitle || edu.linkText) && (
                  <div className="education-subrow">
                    {edu.subTitle && <span>{edu.subTitle}</span>}
                    {edu.linkText && (
                      <span>
                        {edu.linkUrl ? (
                          <a
                            href={edu.linkUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {edu.linkText}
                          </a>
                        ) : (
                          edu.linkText
                        )}
                      </span>
                    )}
                  </div>
                )}
                {educationBullets.length > 0 && (
                  <ul className="bullet-list education-bullets">
                    {educationBullets.map((bullet, index) => (
                      <li key={`${edu.id}-bullet-${index}`}>
                        {renderBullet(bullet)}
                        {index === 0 && edu.grade && (
                          <span> (GPA: {edu.grade})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>
      )}
      {/* ================= EXPERIENCE ================= */}
      {workList.length > 0 && (
        <>
          <h2 className="cv-section-title">Experience</h2>
          {workList.map((work) => (
            <div className="entry" key={work.id}>
              <div className="entry-header">
                <div className="entry-left">
                  <h3>{work.position}</h3>
                </div>

                <div className="entry-right">
                  <p>{getDuration(work)}</p>
                </div>
              </div>

              <div className="entry-subheader">
                <div className="entry-left">
                  <em>{work.companyName}</em>
                </div>
              </div>

              {work.responsibilities && (
                <ul className="bullet-list">
                  {work.responsibilities
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* ================= PROJECTS ================= */}
      {projectList.length > 0 && (
        <>
          <h2 className="cv-section-title">Projects</h2>

          {projectList.map((project) => (
            <div className="entry" key={project.id}>
              <div className="entry-header">
                <div className="entry-left">
                  <h3>{project.title}</h3>
                </div>

                <div className="entry-right">
                  <p>{getDuration(project)}</p>
                </div>
              </div>

              {project.links.length > 0 && (
                <div className="project-links">
                  {project.links.map((link, index) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {index !== 0 && " | "}
                      {link.title === "Other" ? link.customTitle : link.title}
                    </a>
                  ))}
                </div>
              )}

              {project.description && (
                <ul className="bullet-list">
                  {project.description
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* =================  SKILLS ================= */}

      {skillList.length > 0 && (
        <>
          <h2 className="cv-section-title">Skills</h2>

          <div className="skills-container">
            {skillList.map((category) => (
              <div className="skill-category" key={category.id}>
                <span className="skill-category-title">
                  {category.category}:
                </span>

                <span className="skill-category-skills">
                  {category.skills.map((skill) => skill.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default CvPreview;
