import styled, { css } from "styled-components";

const Link = styled.a`
  font-size: 1.3rem;
  color: black;
  font-weight: 900;
  padding: 20px;
  display: block;
  margin: auto;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-decoration-thickness: 3px;
  transition: color 2s ease-in-out;
  :hover {
    text-decoration-color: seagreen;
  }
  ${props =>
    props.ready &&
    css`
      color: #087f5b;
      ::after {
        content: " 🎨";
      }
    `}
`;

export default Link;
