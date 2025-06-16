import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

export function VideoSection() {
  const videos: VideoItem[] = [
    {
      id: "1",
      title: "Barcelona Home Jersey 2024 - Behind the Scenes",
      description: "Watch how the iconic Blaugrana jersey is made with Nike's latest technology",
      thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: "2", 
      title: "Real Madrid vs Barcelona - Jersey Collection",
      description: "El Clasico rivalry showcased through their iconic home jerseys",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: "3",
      title: "Argentina World Cup 2022 Jersey Story",
      description: "The journey of Messi's World Cup winning jersey from Qatar 2022",
      thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ];

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="mb-12" id="videos">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-secondary-custom mb-2">Jersey Stories</h2>
        <p className="text-gray-600">Watch the stories behind your favorite football jerseys</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer"
            onClick={() => handleVideoClick(video.videoUrl)}
          >
            <div className="relative overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button className="rounded-full w-16 h-16 bg-white bg-opacity-90 hover:bg-opacity-100">
                  <Play className="h-6 w-6 text-primary-custom ml-1" />
                </Button>
              </div>
              <div className="absolute top-3 right-3 bg-black bg-opacity-70 rounded-full p-2">
                <Play className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}