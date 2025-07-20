import { motion } from "framer-motion";
import {
  Bell,
  Book,
  BookOpen,
  Calendar,
  ClipboardList,
  Clock,
  CreditCard,
  FileText,
  LogIn,
  LogOut,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Assignment Due",
      message: "Redemption course assignment due tomorrow",
      type: "warning",
    },
    {
      id: 2,
      title: "New Class Schedule",
      message: "Updated schedule for next week available",
      type: "info",
    },
  ]);

  const menuItems = [
    {
      title: "Class Schedule",
      icon: Calendar,
      link: "/students/schedule",
      description: "View your weekly class schedule",
    },
    {
      title: "Classroom",
      icon: BookOpen,
      link: "/students/classroom",
      description: "Access virtual classroom",
    },
    {
      title: "Missed Class Form",
      icon: FileText,
      link: "/students/missed-class",
      description: "Submit missed class reports",
    },
    {
      title: "Missed Class Audios",
      icon: Clock,
      link: "/students/missed-audios",
      description: "Access recordings of missed classes",
    },
    {
      title: "Assignments",
      icon: ClipboardList,
      link: "/students/assignments",
      description: "View and submit assignments",
    },
    {
      title: "Exams",
      icon: FileText,
      link: "/students/exams",
      description: "Access exams and results",
    },
    {
      title: "Attendance",
      icon: UserCheck,
      link: "/students/attendance",
      description: "Check your attendance record",
    },
    {
      title: "Digital Library",
      icon: Book,
      link: "/students/library",
      description: "Access study materials",
    },
    {
      title: "Make Payment",
      icon: CreditCard,
      link: "/students/payment",
      description: "Pay tuition fees",
    },
    {
      title: "Student Handbook",
      icon: BookOpen,
      link: "/students/handbook",
      description: "Access student guidelines",
    },
    {
      title: "Volunteer Signup",
      icon: Users,
      link: "/students/volunteer",
      description: "Sign up for volunteer opportunities",
    },
  ];

  const DormSignOut = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Dorm Sign Out/In</h3>
      <div className="flex space-x-4">
        <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </button>
        <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome, Student Name</h1>
        <p className="opacity-90">Batch 16 | Current Semester: 2</p>
      </div>

      {/* Notifications */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                notification.type === "warning"
                  ? "bg-yellow-50 border-l-4 border-yellow-400"
                  : "bg-blue-50 border-l-4 border-blue-400"
              }`}
            >
              <h3 className="font-medium text-gray-900">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dorm Sign Out/In */}
      <DormSignOut />

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg">
                <item.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
