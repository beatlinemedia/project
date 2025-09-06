import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import PrimaryButton from './PrimaryButton';

const Hero: React.FC = () => {
  // Smooth scroll handler with header offset
  const scrollToAbout = () => {
    const section = document.getElementById('about');
    if (section) {
      const header = document.querySelector('header') as HTMLElement | null;
      const offset = header ? header.offsetHeight : 0;

      const targetY =
        section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero-bg-fixed.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Mist Overlay */}
      <div className="absolute inset-0 gradient-mist opacity-30 z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center relative z-20">
        <RevealOnScroll delay={200}>
          <h1 className="text-4xl md:text-7xl font-bold headline-tight mb-6 space-x-2">
            <span className="text-white hover:text-[#9B2CBA] transition-colors duration-300 cursor-pointer">
              Sound.
            </span>{' '}
            <span className="text-white hover:text-[#9B2CBA] transition-colors duration-300 cursor-pointer">
              Culture.
            </span>{' '}
            <span className="text-white hover:text-[#9B2CBA] transition-colors duration-300 cursor-pointer">
              Forward.
            </span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Future-minded music platform with fluid micro-interactions.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={600}>
          <PrimaryButton className="text-lg" onClick={scrollToAbout}>
            Experience the Future
          </PrimaryButton>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Hero;
