import React from 'react';
import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';

const Field = ({
    name,
    value,
    attribute,
    onChange,
  }) => {

  const {
    // All our custom field config are here
    placeholder,
    label,
    hint,
  } = attribute.customFieldConfig || {};

  return (
    <>
      <TextInput
        id={name}
        placeholder={placeholder}
        label={label || name}
        name={name}
        hint={hint}
        onChange={e => {
          const arg = {
            target: {
              name,
              value: e.target.value,
            },
          }
          onChange(arg);
        }}
        value={value}
      />
      <Button
          onClick={() => {
            alert(value);
          }}
      >Hello World</Button>
    </>
  );
}

export default Field;
