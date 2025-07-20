import { useState } from "react";
import { reachingVideos } from "../../../data/mediaContent";
import VideoCard from "./components/VideoCard";
import VideoPlayer from "./components/VideoPlayer";

const ReachingUnreached = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [expandedVideo, setExpandedVideo] = useState(null);

  return (
    <div className="space-y-8">
      {!selectedContent ? (
        <>
          <div className="prose max-w-none mb-8">
            <h1>Reaching the Unreached</h1>
            <p>
              Explore our outreach programs and church planting initiatives.
            </p>
          </div>

          {/* Outreach Videos Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Outreach Programs</h2>
            <div className="space-y-4">
              {reachingVideos.map((video) => (
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

          {/* Church Planting Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              Church Planting Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Add church planting project cards */}
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

export default ReachingUnreached;
