import { getBase64 } from "@/misc/function";
import StyledDiv from "./styled";
import { useRef } from "react";
import FileSelect, { I_FileSelectHandler } from "@/components/file-select";
import api from "../../../../../../api";

interface I_Props {
  userData: I_User;
  disable?: boolean;
}

const AvatarUpload = (props: I_Props) => {
  const fileSelectRef = useRef<I_FileSelectHandler>();
  const onSelect = (files: FileList) => {
    api.post(
      "/@me/avatar",
      {
        avatar: files[0],
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  };
  return (
    <StyledDiv>
      <img
        className="__avatar"
        src={props.userData.avatar}
        onClick={() => !props.disable && fileSelectRef.current?.open()}
      />
      <div className="__border" hidden={props.disable}>
        <div className="__icon" />
      </div>
      <FileSelect onSelect={onSelect} ref={fileSelectRef} />
    </StyledDiv>
  );
};

export default AvatarUpload;
