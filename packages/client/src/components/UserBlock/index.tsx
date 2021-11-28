import React from "react";
import b_ from 'b_';
import { useMe } from "./hooks";
import { SignInButton } from "../SignInButton";

import './styles.scss';

const b = b_.with('user-block');

export const UserBlock: React.FC = () => {
  const { email, loading } = useMe();
  
  if(loading){
    return null;
  }

  if(!email) {
    return <SignInButton />;
  }
  return <div className={b()}>{email}</div>
};
