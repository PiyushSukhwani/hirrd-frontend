import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Company from "../Components/CompanyProfile/Company";
import SimilarCompanies from "../Components/CompanyProfile/similar-companies";

const CompanyPage = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
        <Button
        onClick={() => navigate(-1)}
          color="brightSun.4"
          my={"md"}
          variant="light"
          leftSection={<IconArrowLeft size={20} />}
        >
          Back
        </Button>
      <div className="flex gap-5 justify-between">
        <Company />
        <SimilarCompanies />
      </div>
    </div>
  );
};

export default CompanyPage;
