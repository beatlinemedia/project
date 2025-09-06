import React from 'react';
import { Play, ExternalLink } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import SectionTitle from './SectionTitle';
import Card from './Card';
import PrimaryButton from './PrimaryButton';

const Releases: React.FC = () => {
  const releases = [
    {
      name: 'ALEVSEN',
      genre: 'Single from Sahte9',
      image: 'https://i.ibb.co/8Dqp615z/alevsen.jpg?auto=compress&cs=tinysrgb&w=400&h=400'
    },
    {
      name: 'ALTIPATLAR',
      genre: 'Single from Cindy',
      image: 'https://i.ibb.co/BKdgk1Yj/altipatlar.jpg?auto=compress&cs=tinysrgb&w=400&h=400'
    },
    {
      name: 'KARADULA',
      genre: 'Single from Ester',
      image: 'https://i.ibb.co/p6MBWd4n/karadula.jpg?auto=compress&cs=tinysrgb&w=400&h=400'
    }
  ];

  return (
    <section id="releases" className="py-20">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Coming Soon"
          subtitle="Exclusive releases dropping soon. Be the first to experience the future."
          centered={true}
        />
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {releases.map((release, index) => (
            <RevealOnScroll key={release.title} delay={200 + (index * 100)}>
              <Card>
                <div className="relative aspect-square mb-4 overflow-hidden rounded-xl">
                  <img 
                    src={release.image}
                    alt={release.title}
                    className="w-full h-full object-cover blurred-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="coming-soon-badge text-xs font-bold px-3 py-1 rounded-full text-white">
                      COMING SOON
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{release.title}</h3>
                <p className="text-gray-400 mb-4">{release.genre}</p>
                
                <div className="flex space-x-3">
                  <PrimaryButton disabled className="flex items-center space-x-2 text-sm py-2 px-4">
                    <Play size={16} />
                    <span>Spotify</span>
                  </PrimaryButton>
                  <PrimaryButton disabled className="flex items-center space-x-2 text-sm py-2 px-4">
                    <ExternalLink size={16} />
                    <span>YouTube</span>
                  </PrimaryButton>
                </div>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Releases;