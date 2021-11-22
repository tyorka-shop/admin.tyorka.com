import * as React from "react";
import { Form, FormControlProps } from "rsuite";
import { Field } from "react-final-form";

interface Props extends FormControlProps{
  name: string;
}

export const Input: React.FC<Props> = ({ name, children, ...outerProps }) => (
  <Field name={name}>{({input: {children, ...input}}) => <Form.Control {...input} {...outerProps}  />}</Field>
);
