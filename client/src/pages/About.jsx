import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Lead Energy Analyst",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
      description: "Expert in energy optimization with 8+ years of experience in sustainable solutions.",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    },
    {
      name: "Michael Chen",
      role: "AI Research Lead",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
      description: "Pioneering AI solutions for energy efficiency and smart grid optimization.",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      description: "Specializing in predictive analytics and energy consumption patterns.",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    },
    {
      name: "David Park",
      role: "Software Architect",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      description: "Building robust and scalable systems for energy management solutions.",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    }
  ];

  const stats = [
    {
      number: "10+",
      label: "Years Experience"
    },
    {
      number: "500+",
      label: "Projects Completed"
    },
    {
      number: "30%",
      label: "Average Energy Savings"
    },
    {
      number: "24/7",
      label: "Support Available"
    }
  ];

  return (
    <div className="about-container">
      <img
        className="about-background"
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
        alt="City Background"
      />
      
      <div className="about-content">
        <div className="about-header">
          <h1 className="about-title">Meet Our Team</h1>
          <p className="about-subtitle">
            We're a diverse team of experts dedicated to revolutionizing energy efficiency through
            innovative AI solutions and data-driven strategies.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img
                src={member.image}
                alt={member.name}
                className="card-image"
              />
              <div className="card-content">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
                <div className="social-links">
                  <a href={member.social.linkedin} className="social-link">
                    <FaLinkedin />
                  </a>
                  <a href={member.social.github} className="social-link">
                    <FaGithub />
                  </a>
                  <a href={member.social.twitter} className="social-link">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-section">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
