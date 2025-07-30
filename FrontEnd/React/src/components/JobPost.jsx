// src/components/JobPost.jsx

import React from 'react';
import './JobPost.css'; // Don't forget to create this CSS file!

const JobPost = ({ jobData }) => {
  const {
    jobTitle = "Job Title",
    company = "Company Name Inc.",
    status = "is active",
    description = "Develop innovative solutions for our clients. ",
    requiredSkills = "rails",
    jobType = "backend",
    salaryMin = "N/A",
    salaryMax = "N/A",
    location = "remote",
    deadline = "August 2"
  } = jobData || {};

  // You might want to format the description to truncate it if it's very long
  const formattedDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

  return (
    <div className="job-post-card">
      <div className="job-post-header">
        <h3 className="job-title">{jobTitle} at {company}</h3>
        <span className={`job-status ${status.replace(/\s+/g, '-').toLowerCase()}`}>{status}</span>
      </div>
      <div className="job-post-body">
        <p className="job-description">{formattedDescription}</p>
        <div className="job-details-row">
          <span className="job-detail-tag">required skills: {requiredSkills}</span>
          <span className="job-detail-tag">job type: {jobType}</span>
        </div>
        <div className="job-details-row">
          <span className="job-detail-tag">salary min: {salaryMin}</span>
          <span className="job-detail-tag">salary max: {salaryMax}</span>
        </div>
        <div className="job-details-row">
          <span className="job-detail-tag">location: {location}</span>
          <span className="job-detail-tag">deadline: {deadline}</span>
        </div>
      </div>
      <div className="job-post-actions">
        <button className="apply-button">Apply Now</button>
      </div>
    </div>
  );
};

export default JobPost;