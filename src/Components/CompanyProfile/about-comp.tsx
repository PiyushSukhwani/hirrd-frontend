import { companyData } from "../../Data/Company";

const AboutComp = () => {
  const company: { [key: string]: any } = companyData;
  return (
    <div className="flex flex-col gap-5">
      {Object.keys(company).map(
        (key: string, index: number) =>
          key != "Name" && (
            <div key={index}>
              <div className="text-xl  mb-3 font-semibold">{key}</div>
              {key != "Website" && (
                <div className="text-sm text-mine-shaft-300 text-justify">
                  {key != "Specialties"
                    ? company[key]
                    : company[key].map((item: string, val: number) => (
                        <span key={val}> &bull; {item}</span>
                      ))}
                </div>
              )}
              {key == "Website" && (
                <a
                  href={company[key]}
                  target="_blank"
                  className="text-sm text-blue-400 underline text-justify"
                >
                  {company[key]}
                </a>
              )}
            </div>
          )
      )}
    </div>
  );
};

export default AboutComp;
