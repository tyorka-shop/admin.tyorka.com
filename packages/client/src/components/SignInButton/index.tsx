import React from "react";
import b_ from 'b_';
import { useButton } from "./hooks";

import './styles.scss';

const b = b_.with('sign-in-button');

export const SignInButton: React.FC = () => {
  const { container } = useButton();
  return <div className={b()} ref={container} />;
};
