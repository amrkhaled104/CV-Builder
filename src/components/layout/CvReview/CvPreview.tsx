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

type CvPreviewProps = {
  generalInfo: GeneralInfo;
  ref?: React.Ref<HTMLDivElement>;
};

function CvPreview({ generalInfo, ref }: CvPreviewProps) {
  return (
    <section className="cvPreview" ref={ref}>
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
    </section>
  );
}

export default CvPreview;
