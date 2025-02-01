import React, { ChangeEventHandler, FormEventHandler } from 'react';

interface AuthFormProps {
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  fields: {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  }[];
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, fields }) => {
  return (
    <form onSubmit={onSubmit}>
      <h1>{title}</h1>
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
          />
        </div>
      ))}
      <button type="submit">{title}</button>
    </form>
  );
};

export default AuthForm;
