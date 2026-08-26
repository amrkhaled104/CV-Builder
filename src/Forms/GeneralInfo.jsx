import FormCard from "../reusables/FormCard.jsx";
import SectionTitle from "../reusables/SectionTitle.jsx";
import InputRow from "../reusables/InptRow.jsx";
import FormBox from "../reusables/FormBox.jsx";
import { Input } from "@mui/icons-material";

export default function GeneralInfo({ generalInfo, setGeneralInfo }) {
  function handleChange(field, value) {
    setGeneralInfo({ ...generalInfo, [field]: value });
  }
  return (
    <FormCard title="General Information">
      <SectionTitle
        title="Personal Information"
        subtitle="Basic details about you"
      />
      <InputRow>
        <FormBox label="First Name">
          <input
            type="text"
            value={generalInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </FormBox>
        <FormBox label="Last Name">
          <input
            type="text"
            value={generalInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </FormBox>
      </InputRow>

      <SectionTitle title="Contact Information" />
      <InputRow>
        <FormBox labeel="Email">
          <input
            type="email"
            value={generalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </FormBox>
        <FormGroup label="Phone Number">
          <input
            type="tel"
            value={generalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </FormGroup>
      </InputRow>
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
