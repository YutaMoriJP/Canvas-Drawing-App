import React from "react";
import FixedRight from "../styles/FixedRight";
import styled from "styled-components";

const Text = styled.p`
  padding: 0 10px;
  cursor: pointer;
  ::after {
    content: " 🗑️";
  }
`;

const ClearCanvas = ({ toggle }) => {
  return (
    <FixedRight>
      <Text onClick={toggle}>CLEAR</Text>
    </FixedRight>
  );
};

export default ClearCanvas;
