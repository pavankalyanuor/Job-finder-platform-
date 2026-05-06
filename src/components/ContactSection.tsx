import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
    consent: false
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
    consent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { name: false, email: false, message: false, consent: false };

    if (formData.name.trim().length < 2) {
      newErrors.name = true;
      isValid = false;
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = true;
      isValid = false;
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = true;
      isValid = false;
    }

    if (!formData.consent) {
      newErrors.consent = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setSuccess(true);
      setFormData({ name: '', email: '', topic: 'general', message: '', consent: false });
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : false;

    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? checked : value
    }));
    
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  return (
    <section id="contact" className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto w-full max-w-[700px] px-6">
        <div className="rounded-2xl bg-white p-8 shadow-md md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Get in Touch</h2>
          <p className="mb-8 text-gray-600">Have questions or feedback? Fill out the form below and we'll get back to you as soon as possible.</p>
          
          {success ? (
            <div className="mb-8 rounded-lg bg-emerald-50 p-4 text-emerald-800 ring-1 ring-emerald-200">
              <i className="fa-solid fa-circle-check mr-2"></i> Thank you! Your message has been sent successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-6">
                <label className="mb-2 block font-medium text-gray-700" htmlFor="contact-name">
                  Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInput}
                  className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-indigo-600'}`}
                  placeholder="E.g., Jane Doe" 
                />
                {errors.name && <span className="mt-1 block text-sm text-red-500">Please enter your name.</span>}
              </div>

              <div className="mb-6">
                <label className="mb-2 block font-medium text-gray-700" htmlFor="contact-email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInput}
                  className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 ${errors.email ? 'border-red-500' : 'border-gray-300 focus:border-indigo-600'}`}
                  placeholder="jane@example.com" 
                />
                {errors.email && <span className="mt-1 block text-sm text-red-500">Please enter a valid email address.</span>}
              </div>

              <div className="mb-6">
                <label className="mb-2 block font-medium text-gray-700" htmlFor="contact-topic">Topic</label>
                <select 
                  id="contact-topic" 
                  name="topic" 
                  value={formData.topic}
                  onChange={handleInput}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="mb-2 block font-medium text-gray-700" htmlFor="contact-message">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleInput}
                  className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 ${errors.message ? 'border-red-500' : 'border-gray-300 focus:border-indigo-600'}`}
                  placeholder="How can we help?"
                ></textarea>
                {errors.message && <span className="mt-1 block text-sm text-red-500">Message must be at least 10 characters long.</span>}
              </div>

              <div className="mb-8">
                <label className="flex cursor-pointer items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="contact-consent" 
                    name="consent" 
                    checked={formData.consent}
                    onChange={handleInput}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <span className="text-sm text-gray-600 leading-tight">
                    I consent to having this website store my submitted information so they can respond to my inquiry (GDPR Compliant). <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consent && <span className="mt-1 block text-sm text-red-500">You must consent before submitting.</span>}
              </div>

              <button type="submit" className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:-translate-y-[1px] hover:bg-indigo-700 hover:shadow-md">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
