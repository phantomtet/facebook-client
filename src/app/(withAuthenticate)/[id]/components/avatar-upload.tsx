interface I_Props {
  userData: I_User;
}

const AvatarUpload = (props: I_Props) => {
  return (
    <img
      src={props.userData.avatar}
      style={{
        outline: "5px solid white",
        height: 168,
        width: 168,
        borderRadius: "100%",
        border: "1px solid var(--e5)",
        position: "relative",
        bottom: 30,
        left: 30,
        marginRight: 16,
      }}
    />
  );
};

export default AvatarUpload;
