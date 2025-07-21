import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Heart,
  Music,
  Pause,
  Play,
  UserCheck,
  Volume2,
} from "lucide-react";
import { useRef, useState } from "react";
import { sosWorship, testimonies } from "../../../data/awakeningContent";

const AwakeningNations = () => {
  const [activeTab, setActiveTab] = useState("worship");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const TestimonyCard = ({ testimony }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden group"
    >
      <div className="relative aspect-video">
        <img
          src={testimony.thumbnail}
          alt={testimony.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => setSelectedVideo(testimony)}
            className="flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-lg"
          >
            <Play className="w-5 h-5" />
            <span>Watch Testimony</span>
          </button>
        </div>
        {testimony.batch && (
          <div className="absolute top-2 right-2 px-3 py-1 bg-white/90 rounded-full text-sm font-medium">
            Batch {testimony.batch}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {testimony.title}
        </h3>
        <p className="text-sm text-gray-600">
          Experience the transformative journey of faith and ministry
        </p>
      </div>
    </motion.div>
  );

  const WorshipTrack = ({ track }) => {
    const isCurrentTrack = audioPlayer?.id === track.id;

    const handlePlay = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setAudioPlayer(track);
      setIsPlaying(true);
      // In a real implementation, you would handle audio playback here
    };

    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`bg-white rounded-lg p-4 flex items-center space-x-4 ${
          isCurrentTrack
            ? "border-2 border-custom-blue"
            : "border border-gray-200"
        }`}
      >
        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={track.thumbnail}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
            {track.title}
          </h3>
          <p className="text-sm text-gray-500">{track.language}</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePlay}
            className={`p-2 rounded-full ${
              isCurrentTrack && isPlaying
                ? "bg-custom-blue text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    );
  };

  const VideoPlayer = ({ video, onClose }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="aspect-video">
          <iframe
            src={`${video.youtubeUrl}?autoplay=1`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-custom-blue to-cyan-200 rounded-2xl p-8 mb-12 text-white">
        <h1 className="text-4xl font-bold mb-4">Awakening the Nations</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Experience powerful testimonies and worship as we witness God's work
          across nations.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
        {[
          { id: "worship", icon: Music, label: "SOS Worship" },
          { id: "testimonies", icon: UserCheck, label: "Testimonies" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? "border border-custom-blue bg-custom-blue bg-opacity-15 text-gray-900"
                : "text-gray-400 bg-gray-200 hover:text-gray-900"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "worship" && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  School of the Spirit (SOS) Worship
                </h2>
                <p className="text-gray-600">
                  Experience anointed worship in multiple languages, led by our
                  dedicated worship team.
                </p>
              </div>

              {/* Audio Player */}
              {audioPlayer && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
                  <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={audioPlayer.thumbnail}
                        alt={audioPlayer.title}
                        className="w-12 h-12 rounded"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {audioPlayer.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {audioPlayer.language}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-full bg-custom-blue text-white"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100">
                        <Volume2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-4">
                {sosWorship.map((track) => (
                  <WorshipTrack key={track.id} track={track} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "testimonies" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonies.map((testimony) => (
                <TestimonyCard key={testimony.id} testimony={testimony} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoPlayer
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AwakeningNations;
