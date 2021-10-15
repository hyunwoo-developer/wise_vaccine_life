import styled from "styled-components";

const BlockBox = styled.div`
  height: ${(props) => (props.height ? props.height : "0px")};
  width: 100%;
`;

export default BlockBox;
