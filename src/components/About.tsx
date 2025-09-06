import React from 'react';
import { Music, Users } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import SectionTitle from './SectionTitle';

type FeatureCardProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
  delay?: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, text, delay = 0 }) => (
  <RevealOnScroll delay={delay}>
    <div
      tabIndex={0}
      className="
        group relative overflow-hidden
        rounded-2xl border border-white/10 bg-black/50 p-6
        transition-all duration-300 will-change-transform
        hover:-translate-y-0.5 hover:border-[#9B2CBA]/60 hover:bg-black/60
        hover:shadow-[0_0_0_1px_rgba(155,44,186,0.35),0_22px_60px_-18px_rgba(155,44,186,0.35)]
        focus:outline-none focus:-translate-y-0.5
        focus:shadow-[0_0_0_2px_rgba(155,44,186,0.6),0_22px_60px_-18px_rgba(155,44,186,0.35)]
      "
    >
      {/* yumuşak üst parıltı */}
      <div
        className="
          pointer-events-none absolute -inset-x-6 -top-20 h-40
          opacity-0 blur-2xl transition-opacity duration-300
          group-hover:opacity-100 group-focus:opacity-100
          bg-[radial-gradient(120px_80px_at_50%_0%,rgba(155,44,186,0.25),transparent_70%)]
        "
      />

      <div className="flex items-center gap-4">
        <div
          className="
            shrink-0 p-3 rounded-xl bg-[#9B2CBA]/20 text-[#9B2CBA]
            transition-all duration-300 will-change-transform
            group-hover:bg-[#9B2CBA]/30 group-hover:rotate-3 group-hover:scale-105
            group-focus:bg-[#9B2CBA]/30 group-focus:rotate-3 group-focus:scale-105
          "
        >
          <Icon className="w-6 h-6" />
        </div>

        <div>
          <h3
            className="
              text-xl font-semibold mb-2 text-white transition-colors duration-300
              relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#9B2CBA]
              after:w-0 group-hover:after:w-12 group-focus:after:w-12
              after:transition-[width] after:duration-300
            "
          >
            {title}
          </h3>
          <p className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300 group-focus:text-gray-300">
            {text}
          </p>
        </div>
      </div>
    </div>
  </RevealOnScroll>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 scroll-mt-24 md:scroll-mt-56">
      <div className="container mx-auto px-6">
        {/* SectionTitle içinde centered => hem başlık hem alt metin ortalanır */}
        <SectionTitle
          title="Redefining Music Culture"
          subtitle="We're building the next generation platform where sound meets innovation, connecting artists and audiences through immersive digital experiences."
          centered
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
          <FeatureCard
            Icon={Users}
            title="Curated Artists"
            text="Hand-picked talent from emerging scenes worldwide"
            delay={200}
          />
          <FeatureCard
            Icon={Music}
            title="Exclusive Releases"
            text="Premium content drops and early access experiences"
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
