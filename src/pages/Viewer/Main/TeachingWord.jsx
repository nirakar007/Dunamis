import { AnimatePresence, motion } from "framer-motion";
import {
  BookmarkPlus,
  Clock,
  Eye,
  Globe,
  PlayCircle,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  courseCategories,
  courseOutline,
  teachingVideos,
} from "../../../data/teachingContent";
import VideoPlayer from "../Main/components/VideoPlayer";

const TeachingWord = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [savedVideos, setSavedVideos] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("newest");

  // Load saved videos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedVideos");
    if (saved) {
      setSavedVideos(JSON.parse(saved));
    }
  }, []);

  // Save video to localStorage
  const handleSaveVideo = (videoId) => {
    const newSavedVideos = savedVideos.includes(videoId)
      ? savedVideos.filter((id) => id !== videoId)
      : [...savedVideos, videoId];

    setSavedVideos(newSavedVideos);
    localStorage.setItem("savedVideos", JSON.stringify(newSavedVideos));
  };

  // Filter and sort videos
  const filteredVideos = teachingVideos
    .filter((video) => {
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || video.category === selectedCategory;
      const matchesLanguage =
        selectedLanguage === "all" || video.language === selectedLanguage;
      return matchesSearch && matchesCategory && matchesLanguage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.published) - new Date(a.published);
        case "oldest":
          return new Date(a.published) - new Date(b.published);
        case "popular":
          return b.views - a.views;
        default:
          return 0;
      }
    });

  // Course Progress Component
  const CourseProgress = ({ courseId }) => {
    const course = courseOutline[courseId];
    const progress = 0; // TODO: Implement progress tracking

    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className="bg-custom-blue h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600">{progress}% Complete</span>
      </div>
    );
  };

  // Video Card Component
  const VideoCard = ({ video, layout = "grid" }) => {
    const isSaved = savedVideos.includes(video.id);

    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all
          ${layout === "grid" ? "flex flex-col" : "flex flex-row"}`}
      >
        <div
          className={`relative ${
            layout === "grid" ? "w-full" : "w-64 flex-shrink-0"
          }`}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={() => setSelectedContent(video)}
              className="bg-custom-blue text-white px-4 py-2 rounded-lg flex items-center"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Watch Now
            </button>
          </div>
        </div>

        <div className="p-4 flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{video.title}</h3>
            <button
              onClick={() => handleSaveVideo(video.id)}
              className={`p-2 rounded-full transition-colors ${
                isSaved
                  ? "text-custom-blue"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <BookmarkPlus
                className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
              />
            </button>
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Clock className="w-4 h-4 mr-1" />
            <span>{video.duration}</span>
            <span className="mx-2">•</span>
            <Eye className="w-4 h-4 mr-1" />
            <span>{video.views} views</span>
            <span className="mx-2">•</span>
            <Globe className="w-4 h-4 mr-1" />
            <span className="capitalize">{video.language}</span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {video.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {video.courseContent.map((content, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {content.title}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-custom-blue to-blue-600 rounded-2xl p-8 mb-12 text-white">
        <h1 className="text-4xl font-bold mb-4">Teaching the Word</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Explore our comprehensive biblical teaching series, designed to equip
          and empower believers with strong foundations in God's Word.
        </p>
      </div>

      {!selectedContent ? (
        <>
          {/* Filters and Controls */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teachings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Viewed</option>
                </select>

                <button
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {viewMode === "grid" ? "List View" : "Grid View"}
                </button>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2">
              {courseCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-custom-blue text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}

              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-custom-blue focus:border-transparent"
              >
                <option value="all">All Languages</option>
                <option value="english">English</option>
                <option value="nepali">Nepali</option>
              </select>
            </div>
          </div>

          {/* Video Grid/List */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            <AnimatePresence>
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} layout={viewMode} />
              ))}
            </AnimatePresence>
          </div>

          {/* No Results */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No videos found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
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
