import React, { useEffect, useRef, useState } from 'react';
import { Mail, Instagram, Twitter, Youtube, X, CheckCircle2, AlertCircle } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import SectionTitle from './SectionTitle';

const FORM_ENDPOINT = 'https://formspree.io/f/mwpnjwpz';

const Contact: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // ESC ile kapatma
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setSuccessOpen(false);
        setErrorOpen(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // modal dışında tıkla → kapat
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [isModalOpen]);

  const postToFormspree = async (fd: FormData) => {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || `Request failed (${res.status})`);
      }
      setSuccessOpen(true);
      setTimeout(() => setSuccessOpen(false), 2600);
    } catch (err: any) {
      setErrorOpen(err?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('form_source', 'email_us_card_modal');
    fd.append('full_name', fullName);
    fd.append('email', email);
    fd.append('message', message);
    fd.append('_subject', 'New message from Beatline Media (Email Us modal)');
    fd.append('_gotcha', '');
    await postToFormspree(fd);
    setIsModalOpen(false);
    setFullName('');
    setEmail('');
    setMessage('');
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/beatlinemedia', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900/20">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Get In Touch"
          subtitle="Ready to shape the future of music together?"
          centered
        />

        {/* Email Card */}
        <div className="max-w-xl mx-auto">
          <RevealOnScroll delay={200}>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="
                w-full text-left group relative overflow-hidden
                rounded-2xl border border-white/10 bg-black/50 px-6 py-6
                transition-all duration-300 hover:border-[#9B2CBA]/60 hover:bg-black/60
                hover:shadow-[0_0_0_1px_rgba(155,44,186,0.35),0_22px_60px_-18px_rgba(155,44,186,0.35)]
              "
            >
              <div
                className="
                  pointer-events-none absolute -inset-x-6 -top-20 h-40
                  opacity-0 blur-2xl transition-opacity duration-300
                  group-hover:opacity-100
                  bg-[radial-gradient(120px_80px_at_50%_0%,rgba(155,44,186,0.25),transparent_70%)]
                "
              />
              <div className="flex items-center gap-5">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#9B2CBA]/20 flex items-center justify-center text-[#9B2CBA]">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">Let’s Talk!</div>
                  <div className="text-white/70 mt-1">Click to send a message.</div>
                </div>
              </div>
            </button>
          </RevealOnScroll>

          {/* Follow Us */}
          <div className="mt-14 text-center">
            <h4 className="text-xl font-semibold mb-6">Follow Us</h4>
            <div className="flex items-center justify-center gap-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="
                    w-12 h-12 rounded-full border border-white/10
                    flex items-center justify-center
                    hover:border-[#9B2CBA]/60 hover:shadow-[0_0_24px_rgba(155,44,186,0.35)]
                    transition-all duration-300 group
                  "
                >
                  <s.icon className="w-5 h-5 text-white/80 group-hover:text-[#9B2CBA]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6" role="dialog" aria-modal="true">
          <div
            ref={modalRef}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_-20px_rgba(155,44,186,0.35)]"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-3 top-3 p-2 rounded-lg hover:bg-white/5"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>

            <h3 className="text-2xl font-bold mb-2">Send us a message</h3>
            <p className="text-white/60 mb-6">We’ll get back to you as soon as possible.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[#9B2CBA] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[#9B2CBA] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="userMessage" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="userMessage"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[#9B2CBA] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-xl px-5 py-3 bg-[#9B2CBA] text-black font-semibold hover:text-white hover:shadow-[0_0_16px_rgba(155,44,186,0.6)] transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {successOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/85 p-6 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_-20px_rgba(155,44,186,0.35)]">
            <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-[#9B2CBA]/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#9B2CBA]" />
            </div>
            <h4 className="text-xl font-bold mb-2">Message received</h4>
            <p className="text-white/70">Thanks for reaching out. We’ve received your message and will get back to you shortly.</p>
            <button
              onClick={() => setSuccessOpen(false)}
              className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-xl bg-[#9B2CBA] text-black font-semibold hover:text-white hover:shadow-[0_0_16px_rgba(155,44,186,0.6)] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ERROR POPUP */}
      {errorOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/85 p-6 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_-20px_rgba(255,0,0,0.15)]">
            <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <h4 className="text-xl font-bold mb-2">Submission failed</h4>
            <p className="text-white/70">{errorOpen}</p>
            <button
              onClick={() => setErrorOpen(null)}
              className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
