import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';

const PUBLIC_KEY  = 'K7Sn7C0SdES2PY1Ns';
const SERVICE_ID  = 'service_33b3uk9';
const TEMPLATE_ID = 'template_b4h5rfv';

emailjs.init({ publicKey: PUBLIC_KEY });

function ContactComponent() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Please enter your name.';
    if (!form.email.trim())   e.email   = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = 'That email address doesn\'t look all right.';
    if (!form.message.trim()) e.message = 'Please write a message.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async () => {
    const validation = validate();
    if (Object.keys(validation).length) { setErrors(validation); return; }

    setStatus('sending');
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        reply_to:  form.email,
        message:   form.message,
      });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="spiel-wrap">
      <div className="contact-inner">
        <h2 className="contact-heading">Get in touch</h2>
        <p className="contact-subtext">
          Fill in the form below and we'll get back to you as soon as possible.  I am writing random crap here to prove to you this is not ai generated. It might convince you but it might also not.
        </p>

        <div className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              autoComplete="name"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              autoComplete="email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What's on your mind?"
              rows={5}
              className={errors.message ? 'input-error' : ''}
            />
            {errors.message && <span className="field-error">{errors.message}</span>}
          </div>

          {status === 'success' && (
            <div className="status-msg status-success">
              Message sent! We'll be in touch soon.
            </div>
          )}
          {status === 'error' && (
            <div className="status-msg status-error">
              Something went wrong. Please try again.
            </div>
          )}

          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactComponent;
