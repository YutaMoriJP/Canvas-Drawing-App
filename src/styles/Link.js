import styled from "styled-components";

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
  transition: 1s;
  :hover {
    text-decoration-color: seagreen;
  }
`;

export default Link;
