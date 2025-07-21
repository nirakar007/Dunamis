import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Church,
  Crown,
  Globe,
  Heart,
  Music,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Main Homepage Component
export default function Homepage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <FeaturedVideosSection />
        <CategoriesSection />
        <DonationSection />
        <NewsletterSection />
      </motion.div>
    </div>
  );
}

// -------------------------------------------------------------------
// Hero Section
// -------------------------------------------------------------------
const HeroSection = () => {
  return (
    <div className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center bg-gray-900 text-white overflow-hidden">
      {/* Background Carousel */}
      <CustomCarousel />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      {/* Content */}
      <div className="relative container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Grow in Faith & Knowledge
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/80">
            Equipping leaders with the power of the Word and the Holy Spirit to
            impact nations.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for teachings, topics, or testimonies..."
                className="w-full px-5 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-custom-blue/50"
              />
              <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------------
// Custom Carousel for Hero Background
// -------------------------------------------------------------------
const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 7000); // Slower transition for background
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Ministry background ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

// -------------------------------------------------------------------
// Featured Videos Section
// -------------------------------------------------------------------
const FeaturedVideosSection = () => {
  const videos = [
    {
      id: "sS_Yp9c4p0E",
      title: "The Anthem | यो हो गान",
      description: "Experience powerful worship from the School of the Spirit.",
    },
    {
      id: "cMtaP3R9bQ0",
      title: "The Fall of Man | मानिसको पतन",
      description:
        "A foundational teaching on the origins of sin and redemption.",
    },
    {
      id: "F3aVZJDBgI4",
      title: "Life Story and Impact",
      description:
        "Hear a powerful testimony from Eld. Dinesh Lama of Batch 16.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Featured Teachings</h2>
          <p className="text-lg text-gray-600">
            Dive into life-changing content from our ministry.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const VideoCard = ({ id, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 rounded-lg shadow-md overflow-hidden border border-gray-200"
    >
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// -------------------------------------------------------------------
// Categories Section
// -------------------------------------------------------------------
const CategoriesSection = () => {
  const categories = [
    {
      icon: BookOpen,
      title: "Theology & Doctrine",
      courseCount: 25,
      color: "text-custom-blue",
    },
    {
      icon: Users,
      title: "Ministry Skills",
      courseCount: 18,
      color: "text-custom-blue",
    },
    {
      icon: Crown,
      title: "Leadership",
      courseCount: 15,
      color: "text-custom-blue",
    },
    {
      icon: Church,
      title: "Church Planting",
      courseCount: 12,
      color: "text-custom-blue",
    },
    {
      icon: Music,
      title: "Worship & Arts",
      courseCount: 22,
      color: "text-custom-blue",
    },
    {
      icon: Globe,
      title: "Missions & Evangelism",
      courseCount: 30,
      color: "text-custom-blue",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Explore Our Curriculum</h2>
          <p className="text-lg text-gray-600">
            Find courses tailored for your calling.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const CategoryCard = ({ icon: Icon, title, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-transparent hover:border-custom-blue/50 hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer"
    >
      <div className="flex flex-col items-center text-center">
        <div className={`${color} mb-4`}>
          <Icon size={36} strokeWidth={1.5} />
        </div>
        <h3 className="text-md font-semibold text-gray-900">{title}</h3>
      </div>
    </motion.div>
  );
};

// -------------------------------------------------------------------
// Donation Section
// -------------------------------------------------------------------
const DonationSection = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-custom-blue to-cyan-600 rounded-lg p-10 text-center text-white">
          <Heart className="mx-auto mb-4" size={40} />
          <h2 className="text-3xl font-bold mb-4">Partner with Us</h2>
          <p className="mb-8 opacity-90">
            Your support helps us equip leaders and spread the Gospel to
            unreached nations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/donate")}
              className="bg-white/90 text-custom-blue px-8 py-3 rounded-full font-semibold hover:bg-white transition-transform hover:scale-105"
            >
              Give Now
            </button>
            <button
              onClick={() => navigate("/about")}
              className="border border-white/50 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// -------------------------------------------------------------------
// Newsletter Section
// -------------------------------------------------------------------
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const handleSubscribe = () => {
    setSubmitMessage({ type: "", text: "" });
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setSubmitMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({ type: "success", text: "Thank you for subscribing!" });
      setEmail("");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="py-20 bg-gray-100"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Stay Connected
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Receive updates on new teachings, mission trips, and testimonies
          directly to your inbox.
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex gap-2 mb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue"
              disabled={isSubmitting}
            />
            <button
              onClick={handleSubscribe}
              className={`bg-custom-blue text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-cyan-600 hover:scale-105"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
          {submitMessage.text && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 flex items-center justify-center text-sm ${
                submitMessage.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {submitMessage.type === "success" ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <XCircle className="w-4 h-4 mr-2" />
              )}
              {submitMessage.text}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
