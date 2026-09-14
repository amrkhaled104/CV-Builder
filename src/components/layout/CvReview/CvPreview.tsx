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
  onLoadSample?: () => void;
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
  onLoadSample,
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

  const hasName = Boolean(
    generalInfo.firstName?.trim() || generalInfo.lastName?.trim(),
  );
  const hasHeadline = Boolean(generalInfo.headline?.trim());
  const hasContact = Boolean(
    generalInfo.phone?.trim() ||
      generalInfo.email?.trim() ||
      generalInfo.location?.trim(),
  );
  const visibleLinks = (generalInfo.links || []).filter(
    (link) =>
      (link.title?.trim() || link.customTitle?.trim()) && link.url?.trim(),
  );
  const hasHeader =
    hasName || hasHeadline || hasContact || visibleLinks.length > 0;
  const hasSummary = Boolean(generalInfo.bio?.trim());

  const validEducation = educationList.filter(
    (edu) =>
      Boolean(
        edu.schoolName?.trim() ||
          edu.study?.trim() ||
          edu.place?.trim() ||
          edu.subTitle?.trim() ||
          edu.bullets?.trim() ||
          edu.grade?.trim() ||
          edu.linkText?.trim(),
      ),
  );

  const validWork = workList.filter(
    (work) =>
      Boolean(
        work.companyName?.trim() ||
          work.position?.trim() ||
          work.responsibilities?.trim() ||
          work.companyDescription?.trim() ||
          work.location?.trim() ||
          work.linkText?.trim(),
      ),
  );

  const validProjects = projectList.filter(
    (project) =>
      Boolean(
        project.title?.trim() ||
          project.tagline?.trim() ||
          project.description?.trim() ||
          project.links?.some(
            (l) =>
              l.url?.trim() && (l.title?.trim() || l.customTitle?.trim()),
          ),
      ),
  );

  const validSkills = skillList
    .map((category) => ({
      ...category,
      skills: (category.skills || []).filter((s) => s.name?.trim()),
    }))
    .filter(
      (category) => category.category?.trim() && category.skills.length > 0,
    );

  const validCustomSections = customSections.map((cs) => ({
    ...cs,
    items: (cs.items || []).filter(
      (item) =>
        Boolean(
          item.title?.trim() ||
            item.tagline?.trim() ||
            item.description?.trim() ||
            item.links?.some(
              (l) =>
                l.url?.trim() && (l.title?.trim() || l.customTitle?.trim()),
            ),
        ),
    ),
  }));

  const hasAnyData =
    hasHeader ||
    hasSummary ||
    validEducation.length > 0 ||
    validWork.length > 0 ||
    validProjects.length > 0 ||
    validSkills.length > 0 ||
    validCustomSections.some((cs) => cs.items.length > 0);

  if (!hasAnyData) {
    return (
      <section className="cvPreview cvPreview--empty" ref={ref}>
        <div className="cv-empty-state">
          <div className="cv-empty-icon-wrap" aria-hidden="true">
            <svg
              className="cv-empty-icon"
              viewBox="0 0 24 24"
              width="44"
              height="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <h2 className="cv-empty-title">CV Preview is Empty</h2>
          <p className="cv-empty-text">
            Your live CV preview will appear here once you enter data in the form
            or click <strong>Sample Cv</strong>.
          </p>
          {onLoadSample && (
            <button
              type="button"
              className="cv-empty-btn"
              onClick={onLoadSample}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              <span>Load Sample CV</span>
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="cvPreview" ref={ref}>
      {/* ================= HEADER ================= */}
      {hasHeader && (
        <header className="cv-header">
          {hasName && (
            <h1 className="cv-name">
              {[generalInfo.firstName?.trim(), generalInfo.lastName?.trim()]
                .filter(Boolean)
                .join(" ")}
            </h1>
          )}
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
      )}
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
            return validEducation.length > 0 ? (
              <section className="education-section" key={section}>
                <h2 className="cv-section-title">Education</h2>
                {validEducation.map((edu) => {
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
            return validWork.length > 0 ? (
              <section className="experience-section" key={section}>
                <h2 className="cv-section-title">Experience</h2>
                {validWork.map((work) => (
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
              </section>
            ) : null;

          case "projects":
            return validProjects.length > 0 ? (
              <section className="projects-section" key={section}>
                <h2 className="cv-section-title">Projects</h2>

                {validProjects.map((project) => (
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
              </section>
            ) : null;

          case "skills":
            return validSkills.length > 0 ? (
              <section className="skills-section" key={section}>
                <h2 className="cv-section-title">Skills</h2>

                <div className="skills-container">
                  {validSkills.map((category) => (
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
              </section>
            ) : null;

          default: {
            const customSection = validCustomSections.find(
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
