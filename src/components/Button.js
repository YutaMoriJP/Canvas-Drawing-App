import React from "react";
import ButtonStyled from "../styles/Button";

const Button = ({ children, ...rest }) => {
  return <ButtonStyled {...rest}>{children}</ButtonStyled>;
};

export default Button;
