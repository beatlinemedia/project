import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={toTop}
      aria-label="Scroll to top"
      className={`
        fixed z-50
        right-4 md:right-6
        bottom-[84px] md:bottom-6   /* 👈 mobilde demo barının üstü */
        p-3 rounded-full border border-white/10
        bg-black/60 backdrop-blur text-white shadow-lg
        transition-all duration-300
        hover:bg-[#9B2CBA]/70 hover:border-[#9B2CBA]/40 hover:shadow-[0_0_20px_rgba(155,44,186,0.35)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}
      `}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTop;
