import * as React from "react";
import { Form, FormControlProps } from "rsuite";
import { Field } from "react-final-form";

interface Props extends FormControlProps {
  name: string;
}

export const Input: React.FC<Props> = ({ name, children, ...outerProps }) => {
  return (
    <Field name={name}>
      {({ input: { children, ...input }, meta }) => (
        <Form.Control
          {...input}
          {...outerProps}
          errorMessage={meta.touched && meta.error?.message}
        />
      )}
    </Field>
  );
};
