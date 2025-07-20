export const courseCategories = [
  {
    id: "foundations",
    name: "Foundation Series",
    description: "Core biblical principles and foundational teachings",
  },
  {
    id: "holy-spirit",
    name: "Holy Spirit Series",
    description: "Understanding the ministry of the Holy Spirit",
  },
  {
    id: "ministry",
    name: "Ministry Training",
    description: "Practical ministry and leadership development",
  },
  {
    id: "prayer",
    name: "Prayer Series",
    description: "Developing a powerful prayer life",
  },
];

export const teachingVideos = [
  // Redemption Series
  {
    id: "redemption-1",
    title: "Redemption: छुट्कारा",
    titleNepali: "छुट्कारा",
    author: "Dunamis Faculty",
    duration: "45 mins",
    category: "foundations",
    published: "2025-03-24",
    views: 245,
    thumbnail: "https://img.youtube.com/vi/VhQd9KvWsv8/maxresdefault.jpg",
    description: "Understanding God's redemptive plan for humanity",
    youtubeEmbedUrl: "https://www.youtube.com/embed/VhQd9KvWsv8",
    language: "nepali",
    courseContent: [
      {
        title: "Introduction to Redemption",
        description: "Biblical foundation of redemption",
      },
      {
        title: "The Power of Covenant",
        description: "Understanding God's covenant with humanity",
      },
    ],
  },
  // Holy Spirit Series
  {
    id: "holy-spirit-1",
    title: "Holy Spirit: पवित्र आत्मा",
    titleNepali: "पवित्र आत्मा",
    author: "Rev. Toni Haskell",
    duration: "35 mins",
    category: "holy-spirit",
    published: "2025-03-20",
    views: 198,
    thumbnail: "https://img.youtube.com/vi/oprXlBvNfhU/maxresdefault.jpg",
    description: "The Spirit Within and Upon",
    youtubeEmbedUrl: "https://www.youtube.com/embed/oprXlBvNfhU",
    language: "nepali",
    courseContent: [
      {
        title: "The Spirit Within",
        description: "Understanding the indwelling of the Holy Spirit",
      },
      {
        title: "The Spirit Upon",
        description: "The empowerment of the Holy Spirit for ministry",
      },
    ],
  },
  // Add all videos from your curriculum list...
];

export const courseOutline = {
  redemption: {
    title: "Redemption Course",
    description: "Complete course on Biblical Redemption",
    lessons: [
      "The Fall of Man",
      "God's Redemptive Plan",
      "The Power of Covenant",
      "Walking in Redemption",
    ],
  },
  holySpirit: {
    title: "Holy Spirit Course",
    description: "Understanding the Ministry of the Holy Spirit",
    lessons: [
      "Introduction to the Holy Spirit",
      "The Spirit Within and Upon",
      "Gifts of the Spirit",
      "Walking in the Spirit",
    ],
  },
  // Add more courses...
};
