import React, { useEffect, useRef, useState } from "react";
import { Upload, X, CheckCircle2, AlertCircle, Send } from "lucide-react";

// .env: VITE_WEB3FORMS_KEY=YOUR_ACCESS_KEY
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "fa98c337-4a2f-45ad-8bd5-5a9b0b3a9cba";
const API_ENDPOINT = "https://api.web3forms.com/submit";

const DemoSubmit: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [okOpen, setOkOpen] = useState(false);
  const [errOpen, setErrOpen] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);

  // ESC + click-outside kapatma
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(false), setErrOpen(null));
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (open && modalRef.current && !modalRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const onFilePick = (f: File | null) => {
    if (!f) return setFile(null);
    // Basit boyut kontrolü (örn. 25MB)
    const maxBytes = 25 * 1024 * 1024;
    if (f.size > maxBytes) {
      setErrOpen("File is too large. Please keep it under 25MB.");
      return;
    }
    setFile(f);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (WEB3FORMS_KEY === "REPLACE_ME") {
      setErrOpen("Please set VITE_WEB3FORMS_KEY in your .env file.");
      return;
    }
    // FormData ile gönder (file dahil)
    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", "New Demo Submission (Beatline Media)");
    fd.append("from_name", fullName || "Anonymous");
    fd.append("message", message || "");
    // İstersen sabit alıcı e-posta da ekleyebilirsin (Web3Forms dashboard -> Routing ile de ayarlanabilir)
    // fd.append("to", "hello@beatline.media");

    if (file) fd.append("attachments", file); // Web3Forms 'attachments' alanını kabul ediyor

    try {
      const res = await fetch(API_ENDPOINT, { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.success === false) throw new Error(data?.message || `Request failed (${res.status})`);

      setOpen(false);
      setFullName("");
      setMessage("");
      setFile(null);

      setOkOpen(true);
      setTimeout(() => setOkOpen(false), 3200);
    } catch (err: any) {
      setErrOpen(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 right-6 z-40
          inline-flex items-center gap-2
          px-4 py-3 rounded-xl
          border border-white/10 bg-black/60 backdrop-blur
          text-white/90
          hover:bg-[#9B2CBA]/70 hover:text-white
          hover:border-[#9B2CBA]/50
          hover:shadow-[0_0_20px_rgba(155,44,186,0.35)]
          transition-all duration-300
        "
        aria-label="Send your demo"
      >
        <Send className="w-5 h-5" />
        <span className="font-medium">Send Your Demo</span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6" role="dialog" aria-modal="true">
          <div
            ref={modalRef}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_-20px_rgba(155,44,186,0.35)]"
          >
            <button onClick={() => setOpen(false)} className="absolute right-3 top-3 p-2 rounded-lg hover:bg-white/5" aria-label="Close">
              <X className="w-5 h-5 text-white/70" />
            </button>

            <h3 className="text-2xl font-bold mb-2">Submit your demo</h3>
            <p className="text-white/60 mb-6">
              Share your track with us. We review every submission.
            </p>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label htmlFor="demo-fullname" className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  id="demo-fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[#9B2CBA] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Track (MP3/WAV/ZIP)</label>
                <label
                  className="flex items-center gap-3 w-full cursor-pointer px-4 py-3 rounded-xl border border-white/10 bg-black/50 hover:border-[#9B2CBA]/50 transition-colors"
                >
                  <Upload className="w-5 h-5 text-[#9B2CBA]" />
                  <span className="text-white/80">{file ? file.name : "Choose a file…"}</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".mp3,.wav,.aiff,.zip,.rar"
                    onChange={(e) => onFilePick(e.target.files?.[0] ?? null)}
                    required
                  />
                </label>
                <p className="text-xs text-white/40 mt-1">Max 25MB. If your file is larger, please send a link inside your message.</p>
              </div>

              <div>
                <label htmlFor="demo-message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="demo-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[#9B2CBA] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about the track, links, socials…"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-xl px-5 py-3 bg-[#9B2CBA] text-black font-semibold hover:text-white hover:shadow-[0_0_16px_rgba(155,44,186,0.6)] transition"
              >
                Submit Demo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {okOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/85 p-6 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_-20px_rgba(155,44,186,0.35)]">
            <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-[#9B2CBA]/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#9B2CBA]" />
            </div>
            <h4 className="text-xl font-bold mb-2">Demo received — thank you!</h4>
            <p className="text-white/70">
              We’ve received your demo and our team will review it. Please note that sending duplicate emails
              won’t speed up the process. If your track fits our vision, we’ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {errOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/85 p-6 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_-20px_rgba(255,0,0,0.15)]">
            <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <h4 className="text-xl font-bold mb-2">Submission failed</h4>
            <p className="text-white/70">{errOpen}</p>
            <button
              onClick={() => setErrOpen(null)}
              className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoSubmit;
