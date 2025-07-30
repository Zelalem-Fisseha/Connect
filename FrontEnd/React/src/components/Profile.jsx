// src/components/DeveloperCard.jsx

// Import the CSS for this component

// Placeholder for a default profile image if one isn't provided

import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Button } from "@mantine/core";
import { Avatar } from '@mantine/core';
const DEFAULT_PROFILE_IMAGE =
  "https://placehold.co/100x100/A0D9B1/000000?text=DEV";

const Profile = ({ profileData }) => {
  useEffect(() => {
    // ... (your existing useEffect for data fetching placeholder) ...
  }, []);

  const {
    profileImage = DEFAULT_PROFILE_IMAGE,
    name = "Profile Name",
    title = "Title",
    skills = "Skills, Technologies",
    link = "https://github.com/", // <--- NEW: Destructure 'link'
    startingSalary = "N/A",
    experience = "N/A",
    status = " available", // <--- NEW: Destructure 'status'
  } = profileData || {};

  return (
  <>
    
      <div className="profile-card">
        <div className="card-header"><Avatar
          src={profileImage} // Pass the image URL
          alt={`${name}'s profile`} // Always provide alt text for accessibility
          size="lg" // Mantine's predefined sizes: xs, sm, md, lg, xl (you can also use a number like size={100})
          radius="xl" // Makes it perfectly circular (or 'md', 'sm', '0' for square)
          // You can add a fallback if src fails, e.g., children={name.charAt(0)}
          
        />
    </div>
    
        <div className="card-body">
          <h2 className="name">{name}</h2>
          <p className="title">{title}</p>
          <p className="skills">{skills}</p>

          {/* <--- NEW: Add link below skills, only if 'link' exists */}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-link"
            >
             github link
            </a>
          )}

          <div className="info-row">
            <div className="info-box">
              <span className="info-label">Starting Salary</span>
              <span className="info-value">{startingSalary}</span>
            </div>
            <div className="info-box">
              <span className="info-label">Experience</span>
              <span className="info-value">{experience}</span>
            </div>
            {/* <--- NEW: Add Status info-box */}
            <div className="info-box">
              <span className="info-label">Status</span>
              <span className="info-value">{status}</span>
            </div>
          </div>
        </div>
        <div className="card-actions">
          <button className="action-button skip-button">Skip</button>
          <button className="action-button send-request-button">
            Send Request
          </button>
        </div>
      </div>


      </>
  );
};

export default Profile;
