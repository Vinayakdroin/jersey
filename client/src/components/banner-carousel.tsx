import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Banner } from '@shared/schema';

interface BannerCarouselProps {
  banners: Banner[];
}

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) {
    return null;
  }

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const previousBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const banner = banners[currentBanner];

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-64 md:h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${banner.imageUrl}')` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative h-full flex items-center justify-center text-center text-white">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h2>
              {banner.subtitle && (
                <p className="text-xl md:text-2xl mb-6">{banner.subtitle}</p>
              )}
              {banner.ctaText && banner.ctaLink && (
                <Button 
                  className="bg-accent-custom hover:bg-red-600 text-white px-8 py-3 text-lg"
                  onClick={() => {
                    if (banner.ctaLink.startsWith('#')) {
                      document.querySelector(banner.ctaLink)?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.open(banner.ctaLink, '_blank');
                    }
                  }}
                >
                  {banner.ctaText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Carousel Controls */}
      {banners.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full"
            onClick={previousBanner}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full"
            onClick={nextBanner}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-opacity ${
                  index === currentBanner ? 'bg-white opacity-100' : 'bg-white opacity-50 hover:opacity-100'
                }`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
