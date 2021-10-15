import React, { useEffect } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
const LoadingWrap = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 1;
`;

function LoadingComponent() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <LoadingWrap>
      <ReactLoading type={"spin"} />
    </LoadingWrap>
  );
}

export default LoadingComponent;
