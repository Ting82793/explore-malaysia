import "./formfield.css";

// Reusable form field: a label, an input (or textarea) and an error message.
// Props:
//   label, id, name, type, placeholder – normal input settings
//   value, onChange – make it a CONTROLLED input (React holds the value)
//   error – error text to show; empty means no error
//   as    – set to "textarea" for a multi-line box
function FormField({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  as,
}) {
  const hasError = Boolean(error);

  // Settings shared by <input> and <textarea>
  const fieldProps = {
    id,
    name,
    placeholder,
    value,
    onChange,
    className: hasError ? "form-input input-error" : "form-input",
    "aria-invalid": hasError,
    // Links the input to its error message for screen readers
    "aria-describedby": hasError ? `${id}-error` : undefined,
  };

  return (
    <div className="form-field">
      {/* htmlFor connects the label to the input (click label = focus input) */}
      <label htmlFor={id}>{label}</label>

      {as === "textarea" ? (
        <textarea rows="5" {...fieldProps} />
      ) : (
        <input type={type} {...fieldProps} />
      )}

      {hasError && (
        <p className="error-text" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
