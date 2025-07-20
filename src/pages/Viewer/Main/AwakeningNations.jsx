import { useState } from "react";
import { awakeningVideos } from "../../../data/mediaContent";
import VideoCard from "./components/VideoCard";
import VideoPlayer from "./components/VideoPlayer";

const AwakeningNations = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [expandedVideo, setExpandedVideo] = useState(null);

  return (
    <div className="space-y-8">
      {!selectedContent ? (
        <>
          <div className="prose max-w-none mb-8">
            <h1>Awakening the Nations</h1>
            <p>
              Discover how God is moving across nations through worship and
              testimony.
            </p>
          </div>

          {/* Worship Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              School of the Spirit (SOS) Worship
            </h2>
            <div className="space-y-4">{/* Map through worship videos */}</div>
          </section>

          {/* Testimonies Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Testimonies</h2>
            <div className="space-y-4">
              {awakeningVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  isExpanded={expandedVideo === video.id}
                  onToggle={(id) =>
                    setExpandedVideo(expandedVideo === id ? null : id)
                  }
                  onPlayVideo={(videoToPlay) => setSelectedContent(videoToPlay)}
                />
              ))}
            </div>
          </section>
        </>
      ) : (
        <VideoPlayer
          video={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  );
};

export default AwakeningNations;
