import styled from "styled-components";

const StyledDiv = styled.div`
  position: relative;
  .__avatar {
    &:hover {
      filter: brightness(120%);
    }
    cursor: pointer;
    outline: 5px solid white;
    height: 168px;
    width: 168px;
    border-radius: 100%;
    border: 1px solid var(--e5);
    position: relative;
    bottom: 30px;
    left: 30px;
    margin-right: 16px;
  }
  .__border {
    padding: 5px;
    position: absolute;
    bottom: 40px;
    right: 0;
    background: white;
    border-radius: 100%;
  }
  .__icon {
    background-image: url(icons-1.png);
    background-position: 0 -88px;
    width: 20px;
    height: 20px;
  }
`;
export default StyledDiv;
