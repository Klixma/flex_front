import React from "react";

function TextFields({
  id,
  label,
  setValue,
  value,
  onKeyDown,
  type,
  className,
  placeholder,
  onKeyUp,
  onBlur,
  disabled,
}) {
  const getDataTextq = (e) => {
    // Add your logic here
    setValue(e.target.value);
  };

  // Directly use the disabled prop for the disabled attribute
  return (
    <div className="mb-1 mt-1">
      <label htmlFor={id} className="form-label">
        {label}:
      </label>
      <input
        onChange={(e) => getDataTextq(e, setValue)}
        type={type == "" ? "text" : type}
        className={`form-control form-control-sm ${className}`}
        id={id}
        placeholder={placeholder == "" ? `Enter ${label}` : placeholder}
        name={id}
        value={value}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        required
        disabled={disabled} // Set disabled directly from the prop
      />
    </div>
  );
}

export default TextFields;
