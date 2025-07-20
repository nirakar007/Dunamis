import { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import { teachingVideos } from "../../../data/mediaContent";
import VideoCard from "../Main/components/VideoCard";

const TeachingWord = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [expandedVideo, setExpandedVideo] = useState(null);

  return (
    <div className="space-y-8">
      {!selectedContent ? (
        <>
          <div className="prose max-w-none mb-8">
            <h1>Teaching the Word</h1>
            <p>Explore our collection of biblical teachings and courses.</p>
          </div>

          {/* Video Grid */}
          <div className="space-y-4">
            {teachingVideos.map((video) => (
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

export default TeachingWord;
