import * as React from "react";
import { Checkbox as RSCheckbox } from "rsuite";
import { Field } from "react-final-form";

interface Props {
  name: string;
  title: string;
}

export const Checkbox: React.FC<Props> = ({ name, title }) => (
  <Field name={name}>
    {(props) => (
      <RSCheckbox
        {...props.input}
        checked={props.input.value}
        onChange={(v, checked) => props.input.onChange(checked)}
      >
        {title}
      </RSCheckbox>
    )}
  </Field>
);
