import * as React from "react";
import { FormControlProps } from "rsuite";
import { Field } from "react-final-form";

type Props = FormControlProps & React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
}

export const Textarea: React.FC<Props> = ({ name, children, ...outerProps }) => (
  <Field name={name}>
    {({ input: { children, ...input } }) => (
    // @ts-ignore
      <textarea {...input} {...outerProps} />
    )}
  </Field>
);
