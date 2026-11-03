import { useState } from "react";
import PageHeader from "../components/pageheader.jsx";
import FormField from "../components/formfield.jsx";
import "./contact.css";

// Starting (empty) values for the form
const emptyForm = {
  name: "",
  email: "",
  message: "",
};

// Simple email pattern: something@something.something
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Checks the form and returns an object of error messages.
// If the object is empty, the form is valid.
function validate(values) {
  const errors = {};

  if (values.name.trim() === "") {
    errors.name = "Please enter your name.";
  }

  if (values.email.trim() === "") {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email, e.g. name@example.com.";
  }

  if (values.message.trim() === "") {
    errors.message = "Please enter your message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters.";
  }

  return errors;
}

function Contact() {
  // ----- State -----
  const [formData, setFormData] = useState(emptyForm); // what the user typed
  const [errors, setErrors] = useState({});            // error messages
  const [submitted, setSubmitted] = useState(false);   // show success box?
  const [submittedName, setSubmittedName] = useState("");

  // Runs every time the user types in ANY field.
  // e.target.name tells us WHICH field changed ("name", "email" or "message").
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Remove that field's error as soon as the user starts fixing it
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Hide the old success message if they start a new message
    if (submitted) {
      setSubmitted(false);
    }
  }

  // Runs when the Send button is clicked
  function handleSubmit(e) {
    e.preventDefault(); // stop the browser from reloading the page

    const foundErrors = validate(formData);
    setErrors(foundErrors);

    // Object.keys(...).length === 0 means "no errors"
    if (Object.keys(foundErrors).length === 0) {
      setSubmittedName(formData.name.trim());
      setSubmitted(true);
      setFormData(emptyForm); // clear the form
    }
  }

  return (
    <section className="contact-page">
      <PageHeader
        title="Contact Us"
        subtitle="Have a question or feedback? Send us a message and we'll get back to you."
      />

      <div className="contact-card">
        {/* Success confirmation */}
        {submitted && (
          <div className="success-message" role="status">
            <strong>✅ Thank you, {submittedName}!</strong>
            <p>Your message has been sent. Our team will reply to you soon.</p>
          </div>
        )}

        {/* noValidate turns off the browser's own pop-ups,
            so our custom error messages are shown instead */}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Name"
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <FormField
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <FormField
            label="Message"
            id="message"
            name="message"
            as="textarea"
            placeholder="Tell us about your enquiry or feedback..."
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
          />

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
