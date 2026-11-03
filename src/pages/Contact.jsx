import { useState } from "react";
import PageHeader from "../components/PageHeader";
import FormField from "../components/FormField";
import "./Contact.css";

// Email pattern: something@something.something
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Checks the form and returns an object of error messages.
// If the object is empty, every field is valid.
function validate(name, email, message) {
  const errors = {};

  // Required field
  if (name.trim() === "") {
    errors.name = "Please enter your name.";
  }

  // Required field + email format
  if (email.trim() === "") {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Please enter a valid email, e.g. name@example.com.";
  }

  // Required field + length check
  if (message.trim() === "") {
    errors.message = "Please enter your message.";
  } else if (message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters.";
  }

  return errors;
}

function Contact() {
  // ----- State: one state for each controlled input -----
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ----- State: form status -----
  const [triedSubmit, setTriedSubmit] = useState(false); // clicked Send with errors?
  const [submitted, setSubmitted] = useState(false);     // show success message?
  const [submittedName, setSubmittedName] = useState("");

  // After the first failed submit, check the fields again on every key press,
  // so errors disappear (and borders turn green) as soon as they are fixed.
  const errors = triedSubmit ? validate(name, email, message) : {};

  function handleSubmit(e) {
    e.preventDefault(); // stop the page from refreshing

    const foundErrors = validate(name, email, message);

    // Object.keys(...).length > 0 means there is at least one error
    if (Object.keys(foundErrors).length > 0) {
      setTriedSubmit(true);
      setSubmitted(false);
      return; // stop here, do not submit
    }

    // Everything is valid: show the success message and clear the form
    setSubmittedName(name.trim());
    setSubmitted(true);
    setTriedSubmit(false);
    setName("");
    setEmail("");
    setMessage("");
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

        {/* onSubmit (not onClick) so pressing Enter also works.
            noValidate turns off the browser's own pop-ups,
            so our own error messages are shown instead. */}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Name"
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            isValid={triedSubmit && !errors.name}
          />

          <FormField
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            isValid={triedSubmit && !errors.email}
          />

          <FormField
            label="Message"
            id="message"
            name="message"
            isTextarea={true}
            placeholder="Tell us about your enquiry or feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={errors.message}
            isValid={triedSubmit && !errors.message}
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
