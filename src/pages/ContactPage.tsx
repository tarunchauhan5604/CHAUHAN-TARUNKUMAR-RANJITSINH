import React, { useState } from 'react';
import { Mail, MessageSquare, CheckCircle, Send, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="border-b border-slate-200 pb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Contact & Inquiries
        </h1>
        <p className="mt-2 text-base text-slate-600 max-w-2xl leading-relaxed">
          Have an idea for a new calculator, found a mathematical discrepancy, or want to partner
          with us? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="md:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out, {name}. Our engineering and editorial team usually responds
                within 24–48 business hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setName('');
                  setEmail('');
                  setMessage('');
                  setSubmitted(false);
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 rounded-xl"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="contact-full-name" className="text-xs font-semibold text-slate-700">Full Name</label>
                <input
                  id="contact-full-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tarun Chauhan"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-email-addr" className="text-xs font-semibold text-slate-700">Email Address</label>
                <input
                  id="contact-email-addr"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-inquiry-topic" className="text-xs font-semibold text-slate-700">Inquiry Topic</label>
                <select
                  id="contact-inquiry-topic"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none"
                >
                  <option value="Feedback">General Feedback & Suggestion</option>
                  <option value="Feature Request">Request New Calculator Tool</option>
                  <option value="Bug / Math Report">Report Math / Formula Issue</option>
                  <option value="Partnership">Commercial & Ad Inquiries</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message-body" className="text-xs font-semibold text-slate-700">Message</label>
                <textarea
                  id="contact-message-body"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your suggestion or question here..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition-colors shadow-xs"
              >
                <Send className="h-4 w-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact info & channels */}
        <div className="md:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Direct Contact
            </h3>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
              <Mail className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Editorial & Technical:</span>
                <span className="text-slate-500 font-mono">support@dailycalculatorhub.com</span>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
              <MessageSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Typical Response Time:</span>
                <span className="text-slate-500">Under 24 hours Monday through Friday</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <HelpCircle className="h-4 w-4 text-sky-600" />
              <span>Did You Know?</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              If you notice any formula differences compared to your specific regional banking
              institution, please include your bank name and loan documentation parameters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
