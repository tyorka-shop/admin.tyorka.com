import * as React from "react";
import { Form } from "rsuite";
import { Field } from "react-final-form";

interface Props {
  name: string;
}

export const Input: React.FC<Props> = ({ name }) => (
  <Field name={name}>{(props) => <Form.Control {...props.input} />}</Field>
);
