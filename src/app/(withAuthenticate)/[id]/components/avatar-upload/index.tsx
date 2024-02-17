import StyledDiv from "./styled";

interface I_Props {
  userData: I_User;
}

const AvatarUpload = (props: I_Props) => {
  return (
    <StyledDiv>
      <img className="__avatar" src={props.userData.avatar} onClick={alert} />
      <div className="__border">
        <div className="__icon" />
      </div>
    </StyledDiv>
  );
};

export default AvatarUpload;
