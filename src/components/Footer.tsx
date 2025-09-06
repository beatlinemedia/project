import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black/90 text-white/70 text-sm">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Sol kısım: Logo + telif */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.ibb.co/pBg5q8Tv/Transparent-Logo.png" // kendi logo url'ini koy
            alt="Beatline Media Logo"
            className="h-28 w-auto"
          />
          <span className="text-xs md:text-sm">
            © {new Date().getFullYear()} Beatline Media. All rights reserved.
          </span>
        </div>

        {/* Orta kısım: Menü linkleri */}
        <div className="flex items-center gap-6 text-xs md:text-sm">
          <a
            href="#"
            className="hover:text-[#9B2CBA] transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-[#9B2CBA] transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-[#9B2CBA] transition-colors duration-300"
          >
            Press Kit
          </a>
        </div>

        {/* Sağ kısım: slogan */}
        <div className="text-xs md:text-sm italic text-white/80">
          Sound. Culture. Forward.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
