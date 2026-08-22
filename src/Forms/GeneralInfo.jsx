import FormCard from "../reusables/FormCard.jsx";
import SectionTitle from "../reusables/SectionTitle.jsx";

export default function GeneralInfo() {
  return (
    <FormCard title="General Information">
      <SectionTitle
        title="Personal Information"
        subtitle="Basic details about you"
      />

      <SectionTitle title="Contact Information" />

      <SectionTitle
        title="Professional Bio"
        subtitle="Write a short introduction about yourself."
      />

      <SectionTitle
        title="Useful Links"
        subtitle="Portfolio, GitHub, LinkedIn, etc."
      />
    </FormCard>
  );
}
