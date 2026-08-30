import "./CvPreview.css";
import { forwardRef } from "react";
const CvPreview = forwardRef((props, ref) => {
  return (
    <section className="cvPreview" ref={ref}>
      <header className="cv-header">
        <h1 className="cv-name">
          {props.generalInfo.firstName} {props.generalInfo.lastName}
        </h1>
        <div className="cv-contact">
          {props.generalInfo.phone && <span>{props.generalInfo.phone}</span>}
          {props.generalInfo.email && (
            <span>
              <a
                href={`mailto:${props.generalInfo.email}`}
                target="_blank"
                rel="noreferrer"
              >
                {props.generalInfo.email}
              </a>
            </span>
          )}
          {props.generalInfo.links
            .filter((link) => link.title && link.url)
            .map((link) => (
              <span key={link.id}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.title === "Other" ? link.customTitle : link.title}
                </a>
              </span>
            ))}
        </div>

        {props.generalInfo.bio && (
          <>
            <h2 className="cv-section-title">Summary</h2>
            <p className="cv-summary">{props.generalInfo.bio}</p>
          </>
        )}
      </header>
    </section>
  );
});
export default CvPreview;
