import "./FormField.css";

// one input in the contact form (label + input + error message)
function FormField(props) {
  // red border if got error, green border if valid
  let inputClass = "form-input";
  if (props.error) {
    inputClass = "form-input input-error";
  } else if (props.isValid) {
    inputClass = "form-input input-valid";
  }

  return (
    <div className="form-field">
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
        />
      )}

      {props.error && <p className="error-text">{props.error}</p>}
    </div>
  );
}

export default FormField;
