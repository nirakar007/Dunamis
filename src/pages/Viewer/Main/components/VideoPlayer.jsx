import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BookmarkPlus,
  Clock,
  Eye,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { useRef, useState } from "react";

const VideoPlayer = ({ video, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const playerRef = useRef(null);

  // Handle iframe load completion
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Extract video ID from YouTube URL
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    // Handle different YouTube URL formats
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`
      : url;
  };

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href,
        });
      } catch (error) {
        setShowShareOptions(true);
      }
    } else {
      setShowShareOptions(true);
    }
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 w-full max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <button
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back to Videos</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Video Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{video.title}</h1>

        {/* Video Stats */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Clock className="w-4 h-4 mr-1" />
          <span>{video.duration}</span>
          <span className="mx-2">•</span>
          <Eye className="w-4 h-4 mr-1" />
          <span>{video.views} views</span>
          <span className="mx-2">•</span>
          <span>Published: {video.published}</span>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-gray-900 rounded-lg overflow-hidden mb-6">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}
          <iframe
            ref={playerRef}
            src={getYoutubeEmbedUrl(video.youtubeEmbedUrl)}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
          ></iframe>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              liked
                ? "bg-blue-50 text-blue-600"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
            <span>Like</span>
          </button>

          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              bookmarked
                ? "bg-blue-50 text-blue-600"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <BookmarkPlus
              className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`}
            />
            <span>Save</span>
          </button>

          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>

            <AnimatePresence>
              {showShareOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 p-2 z-10"
                >
                  <button
                    onClick={copyToClipboard}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {copySuccess ? "✓ Copied!" : "Copy link"}
                  </button>
                  {/* Add more share options as needed */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Video Info */}
        <div className="space-y-6">
          {/* Author Info */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl font-medium text-gray-600">
                {video.author[0]}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{video.author}</h3>
              <p className="text-sm text-gray-500">Instructor</p>
            </div>
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {video.description}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {video.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Course Content */}
          {video.courseContent && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Course Content
              </h2>
              <div className="space-y-4">
                {video.courseContent.map((content, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                  >
                    <h3 className="font-medium text-gray-900 mb-2">
                      {content.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {content.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
