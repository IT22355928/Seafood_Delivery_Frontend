import React from "react";

export function Textarea({ id, name, value, onChange, placeholder, rows = 3, className }) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full p-2 border rounded-md focus:outline-none ${className}`}
    />
  );
}
