import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formatDate } from "../../Services/Utilities";
import { SuccessNotification } from "../../Services/NotifiationService";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../Services/ProfileService";

const CertificateCard = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = async () => {
    let certi = [...profile.certifications];
    certi.splice(props.index, 1);
    let updatedProfile = { ...profile, certifications: certi };
    // props.edit(false);
    let newProfile = await updateProfile(updatedProfile);
    dispatch(changeProfile(newProfile));
    SuccessNotification("Success", "Certificate Deleted Successfully");
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-800 rounded-md">
          <img src={`/Icons/${props.issuer}.png`} alt="" className="h-7" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">{props.name}</div>
          <div className="text-sm text-mine-shaft-300">{profile.issuer}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <div className="text-sm text-mine-shaft-300">
            Issued {formatDate(`${props.issueDate}`)}
          </div>
          <div className="text-sm text-mine-shaft-300">
            ID: {props.certificateId}
          </div>
        </div>
        {props.edit && (
          <ActionIcon
            size={"lg"}
            color="red.8"
            variant="subtle"
            onClick={handleDelete}
          >
            <IconTrash className="h-4/5 w-4/5" stroke={1.5} />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};

export default CertificateCard;
