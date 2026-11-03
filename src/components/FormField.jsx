import "./FormField.css";

// Reusable form field: label + input (or textarea) + error message.
// Props:
//   props.label, props.id, props.name, props.type, props.placeholder
//   props.value, props.onChange – make it a CONTROLLED input
//   props.error      – error text; empty means no error
//   props.isValid    – true = show a green border (valid entry)
//   props.isTextarea – true = show a multi-line <textarea>
function FormField(props) {
  // CSS class: red border for invalid, green border for valid
  let inputClass = "form-input";
  if (props.error) {
    inputClass = "form-input input-error";
  } else if (props.isValid) {
    inputClass = "form-input input-valid";
  }

  const errorId = props.id + "-error";

  return (
    <div className="form-field">
      {/* htmlFor links the label to the input with the same id */}
      <label htmlFor={props.id}>{props.label}</label>

      {props.isTextarea ? (
        <textarea
          id={props.id}
          name={props.name}
          rows="5"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className={inputClass}
          aria-invalid={props.error ? true : false}
          aria-describedby={props.error ? errorId : undefined}
        />
      ) : (
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className={inputClass}
          aria-invalid={props.error ? true : false}
          aria-describedby={props.error ? errorId : undefined}
        />
      )}

      {/* Error message shown next to (under) the field */}
      {props.error && (
        <p className="error-text" id={errorId}>
          {props.error}
        </p>
      )}
    </div>
  );
}

export default FormField;
