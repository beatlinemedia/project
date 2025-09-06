import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import SectionTitle from './SectionTitle';
import Card from './Card';
import { Instagram } from 'lucide-react';

const Artists: React.FC = () => {
  const artists = [
    {
      name: 'Sahte9',
      genre: 'Hip-Hop',
      image: 'https://i.ibb.co/B582fr35/sahte9profile.jpg?auto=compress&cs=tinysrgb&w=400&h=400',
      instagram: 'https://instagram.com/sahte9.wav'
    },
    {
      name: 'Cindy',
      genre: 'Hip-Hop',
      image: 'https://i.ibb.co/yBQJKk2c/cindyprofile.jpg?auto=compress&cs=tinysrgb&w=400&h=400',
      instagram: 'https://instagram.com/iamcindyofficial'
    },
    {
      name: 'Ester',
      genre: 'Producer/DJ',
      image: 'https://i.ibb.co/Y7z74SmJ/esterprofile.jpg?auto=compress&cs=tinysrgb&w=400&h=400',
      instagram: 'https://instagram.com/djester.wav'
    }
  ];

  return (
    <section id="artists" className="py-20 bg-gray-900/20">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Featured Artists"
          subtitle="Discover the voices shaping tomorrow's sound"
          centered={true}
        />
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {artists.map((artist, index) => (
            <RevealOnScroll key={artist.name} delay={200 + (index * 100)}>
              <Card className="flex flex-col items-center">
                <div className="aspect-square mb-4 overflow-hidden rounded-xl w-full">
                  <img 
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-1">{artist.name}</h3>
                <p className="text-[#9B2CBA] font-medium mb-4">{artist.genre}</p>
                
                {/* Instagram Button */}
                <a
                  href={artist.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-auto inline-flex items-center gap-2
                    px-4 py-2 rounded-lg
                    bg-[#9B2CBA]/20 text-[#9B2CBA] font-medium
                    transition-all duration-300
                    hover:bg-[#9B2CBA] hover:text-white
                    hover:shadow-[0_0_20px_rgba(155,44,186,0.6)]
                  "
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Artists;
