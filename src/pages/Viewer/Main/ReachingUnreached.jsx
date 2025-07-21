import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Camera,
  ChevronRight,
  Map,
  PlayCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  churchPlantingPrograms,
  outreachGalleries,
  teamTrips,
} from "../../../data/outreachContent";

const ReachingUnreached = () => {
  const [activeTab, setActiveTab] = useState("outreach");
  const [selectedGallery, setSelectedGallery] = useState(null);

  const GalleryCard = ({ gallery }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
      onClick={() => setSelectedGallery(gallery)}
    >
      <div className="relative aspect-video">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <img
          src={gallery.coverImage || "placeholder.jpg"}
          alt={gallery.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-semibold">{gallery.title}</h3>
          <p className="text-sm opacity-90">{gallery.description}</p>
        </div>
      </div>
    </motion.div>
  );

  const ProgramCard = ({ program }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
      <p className="text-gray-600 mb-4">{program.description}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-custom-blue font-medium">
          Duration: {program.duration}
        </span>
        <span className="px-3 py-1 bg-gray-100 rounded-full capitalize">
          {program.type}
        </span>
      </div>
    </div>
  );

  const TripCard = ({ trip }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group">
      <div className="relative aspect-video">
        <img
          src={trip.thumbnail}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <a
            href={trip.youtubeUrl || trip.dropboxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white bg-red-600 px-4 py-2 rounded-lg"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Watch Video</span>
          </a>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{trip.title}</h3>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{trip.date}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-custom-blue rounded-2xl p-8 mb-12 text-white">
        <h1 className="text-4xl font-bold mb-4">Reaching the Unreached</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Exploring our outreach programs, church planting initiatives, and
          mission trips to reach communities with the Gospel.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
        {[
          { id: "outreach", icon: Camera, label: "Outreach Gallery" },
          { id: "church-planting", icon: Users, label: "Church Planting" },
          { id: "trips", icon: Map, label: "Team Trips" },
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
          {activeTab === "outreach" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(outreachGalleries).map((gallery) => (
                <GalleryCard key={gallery.id} gallery={gallery} />
              ))}
            </div>
          )}

          {activeTab === "church-planting" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {churchPlantingPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold mb-2">
                  Interested in Church Planting?
                </h3>
                <p className="text-gray-600 mb-4">
                  For more information about our church planting programs,
                  please contact Dunamis International Nepal.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center text-custom-blue hover:underline"
                >
                  Contact Us <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          )}

          {activeTab === "trips" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ReachingUnreached;
