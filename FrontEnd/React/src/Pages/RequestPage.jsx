
// import React from 'react'; // <--- UPDATED: Removed useRef, useEffect, useState
// import './PageStyle.css';

// import Profile from '../components/Profile';

// const RequestPage = () => {



//     const sampleProfiles = [
//         {
//             profileImage: "https://i.ibb.co/L89Y3wY/emily-wong.png",
//             name: "Emily Wong",
//             title: "Software Engineer",
//             skills: "React, Node.js, Python",
//             startingSalary: "$1200",
//             experience: "5 years"
//         },
//         {
//             profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
//             name: "John Doe",
//             title: "Fullstack Developer",
//             skills: "Node.js, Express, MongoDB, Angular",
//             startingSalary: "$1500",
//             experience: "8 years"
//         },
//         {
//             profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
//             name: "Alice Smith",
//             title: "DevOps Engineer",
//             skills: "AWS, Docker, Kubernetes, Jenkins",
//             startingSalary: "$1300",
//             experience: "6 years"
//         },
//         {
//             profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
//             name: "Bob Johnson",
//             title: "Mobile App Developer",
//             skills: "React Native, Flutter, Firebase",
//             startingSalary: "$1100",
//             experience: "4 years"
//         },
//         {
//             profileImage: "https://randomuser.me/api/portraits/men/70.jpg",
//             name: "Charlie Brown",
//             title: "Data Scientist",
//             skills: "Python, R, Machine Learning, SQL",
//             startingSalary: "$1600",
//             experience: "7 years"
//         },
//         {
//             profileImage: "https://randomuser.me/api/portraits/women/22.jpg",
//             name: "Diana Prince",
//             title: "UI/UX Designer",
//             skills: "Figma, Sketch, Adobe XD, HTML, CSS",
//             startingSalary: "$1000",
//             experience: "3 years"
//         },
//         {
//             profileImage: "https://randomuser.me/api/portraits/men/11.jpg",
//             name: "Frank Castle",
//             title: "Backend Engineer",
//             skills: "Java, Spring Boot, PostgreSQL, Kafka",
//             startingSalary: "$1450",
//             experience: "6 years"
//         },
//         {
//             profileImage: "https://randomuser.me/api/portraits/women/55.jpg",
//             name: "Grace Hopper",
//             title: "Cloud Architect",
//             skills: "Azure, GCP, Cloud Security, Terraform",
//             startingSalary: "$1700",
//             experience: "9 years"
//         }
//     ];

//     return (
//         <div className="page-content">
//             <p>Manage your requests here.</p>

//             {/* <--- UPDATED: This wrapper will now be a CSS Grid container */}
//             <div className="profile-cards-grid-wrapper">
//                 {sampleProfiles.map((profile, index) => (
//                     <Profile key={index} profileData={profile} />
//                 ))}
//             </div>


//         </div>
//     );
// };

// export default RequestPage;
// src/pages/RequestPage.jsx

import React from 'react';
import Profile from '../components/Profile';
import'./PageStyle.css';

const RequestPage = () => {
  const sampleProfiles = [
    {
      profileImage: "",
      name: "Emily Wong",
      title: "Software Engineer",
      skills: "React, Node.js, Python",
      link: "https://emilywong.com/portfolio", // <--- NEW: Link added
      startingSalary: "$1200",
      experience: "5 years",
      status: "Available" // <--- NEW: Status added
    },
    {
      profileImage: "",
      name: "John Doe",
      title: "Fullstack Developer",
      skills: "Node.js, Express, MongoDB, Angular",
      link: "https://johndoe.dev", // <--- NEW: Link added
      startingSalary: "$1500",
      experience: "8 years",
      status: "Engaged" // <--- NEW: Status added
    },
    {
      profileImage: "",
      name: "Alice Smith",
      title: "DevOps Engineer",
      skills: "AWS, Docker, Kubernetes, Jenkins",
      link: "https://alicesmith.io", // <--- NEW: Link added
      startingSalary: "$1300",
      experience: "6 years",
      status: "Inter" // <--- NEW: Status added
    },
    {
      profileImage: "",
      name: "Bob Johnson",
      title: "Mobile App Developer",
      skills: "React Native, Flutter, Firebase",
      link: "https://bobjohnson.app", // <--- NEW: Link added
      startingSalary: "$1100",
      experience: "4 years",
      status: "Available" // <--- NEW: Status added
    },
    {
      profileImage: "",
      name: "Charlie Brown",
      title: "Data Scientist",
      skills: "Python, R, Machine Learning, SQL",
      link: "https://charliebrown.data", // <--- NEW: Link added
      startingSalary: "$1600",
      experience: "7 years",
      status: "Engaged" // <--- NEW: Status added
    },
    {
      profileImage: "",
      name: "Diana Prince",
      title: "UI/UX Designer",
      skills: "Figma, Sketch, Adobe XD, HTML, CSS",
      link: "https://dianaprince.design", // <--- NEW: Link added
      startingSalary: "$1000",
      experience: "3 years",
      status: "Available" // <--- NEW: Status added
    },
    {
      profileImage: "",
      name: "Frank Castle",
      title: "Backend Engineer",
      skills: "Java, Spring Boot, PostgreSQL, Kafka",
      link: "https://frankcastle.backend", // <--- NEW: Link added
      startingSalary: "$1450",
      experience: "6 years",
      status: "Inter" // <--- NEW: Status added
    },
    {
      profileImage: "",
      name: "Grace Hopper",
      title: "Cloud Architect",
      skills: "Azure, GCP, Cloud Security, Terraform",
      link: "https://gracehopper.cloud", // <--- NEW: Link added
      startingSalary: "$1700",
      experience: "9 years",
      status: "Available" // <--- NEW: Status added
    }
  ];

  return (
    <div className="page-content">
      <h1>Requests</h1>
      <p>Manage your requests here.</p>

      <div className="profile-cards-grid-wrapper">
        {sampleProfiles.map((profile, index) => (
          <Profile key={index} profileData={profile} />
        ))}
      </div>

      <p>More content for the Requests page...</p>
    </div>
  );
};

export default RequestPage;