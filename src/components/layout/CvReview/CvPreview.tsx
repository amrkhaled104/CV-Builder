import "./CvPreview.css";
import type { CustomSection } from "../../../types/customSection";

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
  location?: string;
  companyDescription?: string;
  linkText?: string;
  linkUrl?: string;
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
  tagline?: string;
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
type SectionName =
  | "summary"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | (string & {});
type CvPreviewProps = {
  generalInfo: GeneralInfo;
  ref?: React.Ref<HTMLDivElement>;
  educationList: EducationItem[];
  workList: ExperienceItem[];
  projectList: ProjectItem[];
  skillList: SkillCategory[];
  customSections?: CustomSection[];
  sections: SectionName[];
};

function CvPreview({
  generalInfo,
  ref,
  educationList,
  workList,
  projectList,
  skillList,
  customSections = [],
  sections,
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
      </header>
      {sections.map((section) => {
        switch (section) {
          case "summary":
            return generalInfo.bio ? (
              <section key={section}>
                <h2 className="cv-section-title">Summary</h2>
                <p className="cv-summary">{generalInfo.bio}</p>
              </section>
            ) : null;

          case "education":
            return educationList.length > 0 ? (
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
            ) : null;

          case "experience":
            return workList.length > 0 ? (
              <>
                <h2 className="cv-section-title">Experience</h2>
                {workList.map((work) => (
                  <div className="entry" key={work.id}>
                    <div className="entry-header">
                      <div className="entry-left">
                        <strong>{work.position}</strong>
                        {work.position && work.companyName && ", "}
                        {work.companyName}
                        {work.location && (
                          <>
                            {work.position || work.companyName ? ", " : ""}
                            <em>{work.location}</em>
                          </>
                        )}
                        {work.linkText && work.linkUrl && (
                          <>
                            {work.position || work.companyName || work.location
                              ? " | "
                              : ""}
                            <a
                              href={work.linkUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {work.linkText}
                            </a>
                          </>
                        )}
                      </div>

                      <div className="entry-right">{getDuration(work)}</div>
                    </div>

                    {work.companyDescription && (
                      <p className="entry-description">
                        {work.companyDescription}
                      </p>
                    )}

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
            ) : null;

          case "projects":
            return projectList.length > 0 ? (
              <>
                <h2 className="cv-section-title">Projects</h2>

                {projectList.map((project) => (
                  <div className="entry" key={project.id}>
                    <div className="entry-header">
                      <div className="entry-left">
                        <strong>{project.title}</strong>
                        {project.tagline && <>. {project.tagline}</>}
                      </div>

                      <div className="entry-right">
                        {project.links
                          .filter(
                            (link) =>
                              link.url && (link.title || link.customTitle),
                          )
                          .map((link, index) => (
                            <span key={link.id}>
                              {index > 0 && " | "}
                              <a
                                className="cv-link"
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {link.title === "Other"
                                  ? link.customTitle || link.url
                                  : link.title}
                              </a>
                            </span>
                          ))}
                      </div>
                    </div>

                    {project.description && (
                      <ul className="bullet-list">
                        {project.description
                          .split("\n")
                          .map((line) =>
                            line.replace(/^\s*[-*•]\s*/, "").trim(),
                          )
                          .filter(Boolean)
                          .map((line, index) => (
                            <li key={index}>{line}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </>
            ) : null;

          case "skills":
            return skillList.length > 0 ? (
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
            ) : null;

          default: {
            const customSection = customSections.find(
              (cs) => cs.id === section,
            );
            if (!customSection || customSection.items.length === 0) return null;

            return (
              <section key={customSection.id}>
                <h2 className="cv-section-title">{customSection.title}</h2>
                {customSection.items.map((item) => (
                  <div className="entry" key={item.id}>
                    <div className="entry-header">
                      <div className="entry-left">
                        <strong>{item.title}</strong>
                        {item.tagline && <>. {item.tagline}</>}
                      </div>

                      <div className="entry-right">
                        {item.links &&
                        item.links.some(
                          (link) => link.url && (link.title || link.customTitle),
                        ) ? (
                          item.links
                            .filter(
                              (link) =>
                                link.url && (link.title || link.customTitle),
                            )
                            .map((link, index) => (
                              <span key={link.id}>
                                {index > 0 && " | "}
                                <a
                                  className="cv-link"
                                  href={link.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {link.title === "Other"
                                    ? link.customTitle || link.url
                                    : link.title}
                                </a>
                              </span>
                            ))
                        ) : item.startDate ||
                          item.isCurrent ||
                          item.customDuration ? (
                          getDuration(item)
                        ) : null}
                      </div>
                    </div>

                    {item.description && (
                      <ul className="bullet-list">
                        {item.description
                          .split("\n")
                          .map((line) =>
                            line.replace(/^\s*[-*•]\s*/, "").trim(),
                          )
                          .filter(Boolean)
                          .map((line, index) => (
                            <li key={index}>{line}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            );
          }
        }
      })}
    </section>
  );
}

export default CvPreview;
