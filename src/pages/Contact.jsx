import { useState } from "react";
import PageHeader from "../components/PageHeader";
import FormField from "../components/FormField";
import "./Contact.css";

// check the inputs and return the errors
function validate(name, email, message) {
  const errors = {};

  if (name.trim() === "") {
    errors.name = "Please enter your name.";
  }

  // check email is not empty and has the right format (abc@abc.com)
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim() === "") {
    errors.email = "Please enter your email.";
  } else if (!emailFormat.test(email)) {
    errors.email = "Please enter a valid email, e.g. name@example.com";
  }

  // message must be at least 10 characters
  if (message.trim() === "") {
    errors.message = "Please enter your message.";
  } else if (message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

function Contact() {
  // controlled inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [triedSubmit, setTriedSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sentName, setSentName] = useState("");

  // after the first submit, keep checking while the user types
  // so the error goes away once they fix it
  const errors = triedSubmit ? validate(name, email, message) : {};

  function handleSubmit(e) {
    e.preventDefault(); // stop the page from refreshing

    const result = validate(name, email, message);

    // if there are errors, don't submit
    if (Object.keys(result).length > 0) {
      setTriedSubmit(true);
      setSuccess(false);
      return;
    }

    // no errors -> show success message and clear the form
    setSentName(name);
    setSuccess(true);
    setTriedSubmit(false);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <section className="contact-page">
      <PageHeader
        title="Contact Us"
        subtitle="Got a question or feedback? Send us a message!"
      />

      <div className="contact-card">
        {success && (
          <div className="success-message">
            <strong>✅ Thank you, {sentName}!</strong>
            <p>Your message has been sent. We will get back to you soon.</p>
          </div>
        )}

        {/* noValidate = use our own error messages instead of the browser ones */}
        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Name"
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
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
            placeholder="Write your message here..."
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
