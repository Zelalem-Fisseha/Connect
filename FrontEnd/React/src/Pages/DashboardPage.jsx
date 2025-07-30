// src/pages/DashboardPage.jsx
import React from 'react';
import './PageStyle.css'; // We'll create this common CSS file
import JobPost from '../components/JobPost';
const DashboardPage = () => {
  const sampleJobs = [
    {
      jobTitle: "Software Engineer",
      company: "Tech Innovators Inc.",
      status: "is active",
      description: "Develop innovative solutions for our clients. Our team focuses on cutting-edge technologies to deliver high-quality software products. Join us to make a real impact!",
      requiredSkills: "Java, Spring Boot, Microservices",
      jobType: "Backend",
      salaryMin: "$1200",
      salaryMax: "$2000",
      location: "Remote",
      deadline: "August 15"
    },
    {
      jobTitle: "Frontend Developer",
      company: "Creative Solutions Co.",
      status: "is active",
      description: "Design and implement user-friendly interfaces for web applications. Work with a vibrant team on exciting new projects using modern frontend frameworks.",
      requiredSkills: "React, JavaScript, HTML, CSS",
      jobType: "Frontend",
      salaryMin: "$1000",
      salaryMax: "$1800",
      location: "Addis Ababa, Ethiopia",
      deadline: "August 20"
    },
    {
      jobTitle: "Data Scientist",
      company: "Analytics Hub",
      status: "pending",
      description: "Analyze large datasets, build predictive models, and provide actionable insights. We are looking for someone passionate about data-driven decision making.",
      requiredSkills: "Python, R, SQL, Machine Learning",
      jobType: "Data Science",
      salaryMin: "$1500",
      salaryMax: "$2500",
      location: "Remote",
      deadline: "September 1"
    },
    {
      jobTitle: "DevOps Engineer",
      company: "CloudOps Systems",
      status: "is active",
      description: "Automate and optimize our cloud infrastructure. Experience with CI/CD pipelines, containerization, and cloud providers is essential.",
      requiredSkills: "AWS, Docker, Kubernetes, Jenkins",
      jobType: "DevOps",
      salaryMin: "$1300",
      salaryMax: "$2200",
      location: "New York, USA",
      deadline: "August 10"
    },
    {
      jobTitle: "UI/UX Designer",
      company: "User Experience Labs",
      status: "closed",
      description: "Create intuitive and aesthetically pleasing user interfaces. Collaborate with developers and product managers to define user flows and design systems.",
      requiredSkills: "Figma, Sketch, Adobe XD, Prototyping",
      jobType: "Design",
      salaryMin: "$900",
      salaryMax: "$1600",
      location: "Remote",
      deadline: "July 25"
    }
  ];

  return (
    <>
    <div className=" dash-page-content">
      {/* <--- UPDATED: Change the heading for the new Dashboard */}
      <h1>Job Seeker Dashboard</h1>
      <p>Welcome! Find and apply for jobs that match your skills.</p>

      <h2>Available Job Posts</h2>
      <div className="job-posts-grid-wrapper">
        {sampleJobs.map((job, index) => (
          <JobPost key={index} jobData={job} />
        ))}
      </div>

      <p>More content for your dashboard...</p>
    </div>
    </>
  );
};
export default DashboardPage;
