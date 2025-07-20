import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  ExternalLink,
  Facebook,
  FileText,
  Heart,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

const AlumniDashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Alumni Reunion 2025",
      date: "2025-08-15",
      location: "Main Campus",
      description: "Annual gathering of Dunamis alumni",
    },
    {
      id: 2,
      title: "Ministry Conference",
      date: "2025-09-20",
      location: "Virtual Event",
      description: "Online conference featuring alumni speakers",
    },
  ]);

  const menuItems = [
    {
      title: "Ministry Opportunities",
      icon: Briefcase,
      link: "/alumni/opportunities",
      description: "Browse and apply for ministry positions",
      type: "form",
    },
    {
      title: "Alumni Facebook Page",
      icon: Facebook,
      link: "https://facebook.com/dunamisalumni",
      description: "Connect with fellow graduates",
      type: "external",
    },
    {
      title: "Request Marksheet",
      icon: FileText,
      link: "/alumni/marksheet",
      description: "Get your academic records",
      type: "form",
    },
    {
      title: "Give",
      icon: Heart,
      link: "/alumni/give",
      description: "Support current students",
      type: "action",
    },
    {
      title: "Counselling Appointment",
      icon: MessageSquare,
      link: "/alumni/counselling",
      description: "Schedule a counselling session",
      type: "form",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Dunamis Alumni Network</h1>
        <p className="opacity-90">Stay connected, grow together</p>
      </div>

      {/* Upcoming Events */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                <p>📍 {event.location}</p>
                <p>{event.description}</p>
              </div>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <a
            key={item.title}
            href={item.type === "external" ? item.link : "#"}
            target={item.type === "external" ? "_blank" : "_self"}
            rel={item.type === "external" ? "noopener noreferrer" : ""}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 bg-purple-50 rounded-lg">
                <item.icon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  {item.title}
                  {item.type === "external" && (
                    <ExternalLink className="w-4 h-4 ml-2" />
                  )}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AlumniDashboard;
