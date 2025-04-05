import React, { useState, useRef, useEffect } from 'react';
import demoVideo from '../assets/videos/lion-king.mp4';
import LockIcon from '../assets/images/Lock.svg';
import UnlockIcon from '../assets/images/Unlock.svg';
import CanvasLogo from '../assets/images/canvas-logo.svg';
import './CanvasAEM.css';

export default function CanvasAEMLanding() {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [showUnlockedMessage, setShowUnlockedMessage] = useState(false);
  const [wasFullScreen, setWasFullScreen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [submitError, setSubmitError] = useState(null);
  const [activeTab, setActiveTab] = useState("ott");

  const videoRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const formTimeThreshold = 10;

  useEffect(() => {
    const tabInterval = setInterval(() => {
      setActiveTab(prev => prev === "ott" ? "ovp" : "ott");
    }, 3000);
    
    return () => clearInterval(tabInterval);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      window.scrollTo({
        top: scrollPosition < windowHeight / 2 ? 0 : windowHeight,
        behavior: 'smooth'
      });
    };
    let timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleScroll({ preventDefault: () => {} });
      }, 100);
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isVideoFullScreen = () => document.fullscreenElement || document.webkitFullscreenElement;
  const exitFullscreen = () => document.exitFullscreen?.() || document.webkitExitFullscreen?.();
  const enterFullscreen = (element) => element.requestFullscreen?.() || element.webkitRequestFullscreen?.();

  const handleTimeUpdate = () => {
    if (videoRef.current?.currentTime >= formTimeThreshold && !formSubmitted && !unlocking) {
      videoRef.current.pause();
      if (isVideoFullScreen()) {
        setWasFullScreen(true);
        exitFullscreen();
      }
      setShowForm(true);
    }
  };

  const handleSeeking = () => {
    if (videoRef.current?.currentTime >= formTimeThreshold && !formSubmitted && !unlocking) {
      videoRef.current.currentTime = formTimeThreshold;
      videoRef.current.pause();
      if (isVideoFullScreen()) {
        setWasFullScreen(true);
        exitFullscreen();
      }
      setShowForm(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUnlocking(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('https://resplendent-strudel-d7b326.netlify.app/.netlify/functions/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      console.log('Form submission successful:', data);
      
      setFormSubmitted(true);
      setShowForm(false);
      setUnlocking(false);
      if (wasFullScreen && videoRef.current) enterFullscreen(videoRef.current);
      if (videoRef.current) videoRef.current.play();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Failed to submit form. Please try again.');
      setUnlocking(false);
    }
  };

  const handleUnlockExperience = () => {
    if (formSubmitted) {
      setShowUnlockedMessage(true);
      setTimeout(() => setShowUnlockedMessage(false), 350);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        setShowForm(true);
      }
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="canvas-container">
      <img src={CanvasLogo} alt="Canvas Logo" className="canvas-logo" />
      
      {/* First Section */}
      <section ref={section1Ref} className="canvas-section">
        <h1 className="gradient-heading heading-main">
          Stop Losing Viewers After the Play
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">
          Canvas AEL helps OTT, OVP, and media platforms capture first-party data
          and monetize smarter — right inside the video
        </p>
        <div className="video-container">
          <video 
            ref={videoRef}
            src={demoVideo}
            className="canvas-video"
            controls
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onSeeking={handleSeeking}
            controlsList="nodownload nopictureinpicture"
            disablePictureInPicture
          />
          
          {showForm && (
            <div className="form-overlay">
              <div className="overlay-content">
                <div className="mb-4 flex justify-center">
                  <img 
                    src={unlocking ? UnlockIcon : LockIcon}
                    alt={unlocking ? "Unlock Icon" : "Lock Icon"}
                    className="overlay-icon"
                  />
                </div>
                <h3 className="overlay-heading">
                  {unlocking ? "Unlocking your content..." : "AEL in action to collect your First-Party Data by"}
                </h3>
                <form onSubmit={handleSubmit} className={`form-container ${unlocking ? 'unlocking' : ''}`}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="form-input"
                    required
                    disabled={unlocking}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="form-input"
                    required
                    disabled={unlocking}
                  />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                    className="form-input"
                    required
                    disabled={unlocking}
                  />
                  {submitError && <p className="text-red-400 text-sm">{submitError}</p>}
                  <div className="flex justify-center">
                    <button type="submit" className="form-button" disabled={unlocking}>
                      {unlocking ? <div className="loading-spinner"></div> : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {showUnlockedMessage && (
            <div className="form-overlay">
              <div className="overlay-content">
                <div className="mb-4 flex justify-center">
                  <img src={UnlockIcon} alt="Unlock Icon" className="overlay-icon" style={{ width: '6rem', height: '6rem' }} />
                </div>
                <h3 className="overlay-heading">Content Already Unlocked</h3>
              </div>
            </div>
          )}
        </div>
        
        <p className="text-sm text-gray-400 my-6 italic">
          Experience how Canvas AEL turns passive plays into active conversions.
        </p>
        
        <button onClick={handleUnlockExperience} className="gradient-button">
          Unlock Full Experience
        </button>
      </section>

      {/* Second Section */}
      <section ref={section2Ref} className="canvas-section second-section">
        <h2 className="gradient-heading heading-secondary">
          Your content already captivates. Now let it CONVERT!
        </h2>

        <div className="content-container">
          <div className="tabs-container">
            <button 
              onClick={() => handleTabChange("ovp")}
              className={`tab ${activeTab === "ovp" ? "tab-gradient" : "tab-outline"}`}
            >
              For OVP & Backend Platforms
            </button>
            <button 
              onClick={() => handleTabChange("ott")}
              className={`tab ${activeTab === "ott" ? "tab-gradient" : "tab-outline"}`}
            >
              For OTT & SVOD/AVOD Platforms
            </button>
          </div>

          {activeTab === "ott" && (
            <div className="cards-grid">
              <div className="feature-card">
                <div className="card-border"></div>
                <div className="card-bg"></div>
                <div className="card-bottom-border"></div>
                <div className="card-icon-container">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M16 44H8V56H16V44Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M32 36H24V56H32V36Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M48 28H40V56H48V28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 56H52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M26 18L32 12L56 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M44 12H56V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="card-title">
                  Capture valuable post-play insights without disrupting UX
                </h3>
              </div>

              <div className="feature-card">
                <div className="card-border"></div>
                <div className="card-bg"></div>
                <div className="card-bottom-border"></div>
                <div className="card-icon-container">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M42 24H22L14 38H50L42 24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M32 8L40 18H24L32 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="card-title">
                  First party data to make customized offers
                </h3>
              </div>

              <div className="feature-card">
                <div className="card-border"></div>
                <div className="card-bg"></div>
                <div className="card-bottom-border"></div>
                <div className="card-icon-container">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M8 56H56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 38V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 28V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M32 22V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M32 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M48 32V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="32" cy="20" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="48" cy="24" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M48 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M44 12H52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="card-title">
                  Boost retention and CPMs with smart triggers
                </h3>
              </div>
            </div>
          )}

          {activeTab === "ovp" && (
            <div className="cards-grid">
              <div className="feature-card">
                <div className="card-border"></div>
                <div className="card-bg"></div>
                <div className="card-bottom-border"></div>
                <div className="card-icon-container">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M32 42C37.5228 42 42 37.5228 42 32C42 26.4772 37.5228 22 32 22C26.4772 22 22 26.4772 22 32C22 37.5228 26.4772 42 32 42Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M32 26C33.1046 26 34 26.8954 34 28C34 29.1046 33.1046 30 32 30C30.8954 30 30 29.1046 30 28C30 26.8954 30.8954 26 32 26Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M32 34C33.1046 34 34 34.8954 34 36C34 37.1046 33.1046 38 32 38C30.8954 38 30 37.1046 30 36C30 34.8954 30.8954 34 32 34Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28 30C26.8954 30 26 30.8954 26 32C26 33.1046 26.8954 34 28 34C29.1046 34 30 33.1046 30 32C30 30.8954 29.1046 30 28 30Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M36 30C34.8954 30 34 30.8954 34 32C34 33.1046 34.8954 34 36 34C37.1046 34 38 33.1046 38 32C38 30.8954 37.1046 30 36 30Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="card-title">
                  Blend AEL seamlessly with existing stacks
                </h3>
              </div>

              <div className="feature-card">
                <div className="card-border"></div>
                <div className="card-bg"></div>
                <div className="card-bottom-border"></div>
                <div className="card-icon-container">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M8 16H56V48H8V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 24H56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 20C16.5523 20 17 19.5523 17 19C17 18.4477 16.5523 18 16 18C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20Z" fill="currentColor"/>
                    <path d="M22 20C22.5523 20 23 19.5523 23 19C23 18.4477 22.5523 18 22 18C21.4477 18 21 18.4477 21 19C21 19.5523 21.4477 20 22 20Z" fill="currentColor"/>
                    <path d="M15 36L21 30L26 35L32 29L39 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="card-title">
                  Offer first-party engagement & retain audiences
                </h3>
              </div>

              <div className="feature-card">
                <div className="card-border"></div>
                <div className="card-bg"></div>
                <div className="card-bottom-border"></div>
                <div className="card-icon-container">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M8 16H24V32H8V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M40 16H56V32H40V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M24 32H40V48H24V32Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 32V40H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M48 32V40H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M40 24H24V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="card-title">
                  Compatible with REST, and existing APIs
                </h3>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Third Section - Flexibility */}
      <section ref={section3Ref} className="flexibility-section">
        <h2 className="gradient-heading heading-flexibility">Flexibility at Your Fingertips</h2>
        
        <div className="deployment-options">
          <div className="deployment-option">
            <div className="cloud-icon">
              <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M75 65C82.1797 65 88 59.1797 88 52C88 44.8203 82.1797 39 75 39C74.6588 39 74.3212 39.0142 73.9873 39.0422C72.2165 30.3104 64.4355 24 55.3333 24C44.8133 24 36.3333 32.9695 36.3333 44.0204C36.3333 44.688 36.3647 45.3462 36.4259 45.9924C35.9526 45.9322 35.4694 45.9 34.9778 45.9C27.7426 45.9 21.9 51.7426 21.9 58.9778C21.9 66.213 27.7426 72.0556 34.9778 72.0556H75V65Z" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="23" y1="48" x2="87" y2="48" gradientUnits="userSpaceOnUse">
                    <stop offset="0.05" stopColor="#F5841F"/>
                    <stop offset="0.35" stopColor="#EBC554"/>
                    <stop offset="0.53" stopColor="#00B3A6"/>
                    <stop offset="0.87" stopColor="#5B5FD1"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="deployment-title">On Cloud</div>
            <div className="deployment-description">
              For quicker integration with<br />REST APIs
            </div>
          </div>
          
          <div className="deployment-option">
            <div className="onprem-icon">
              <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 75V25C40 23.3431 41.3431 22 43 22H77C78.6569 22 80 23.3431 80 25V75C80 76.6569 78.6569 78 77 78H43C41.3431 78 40 76.6569 40 75Z" stroke="url(#paint0_linear)" strokeWidth="3"/>
                <line x1="41" y1="35" x2="79" y2="35" stroke="url(#paint1_linear)" strokeWidth="3"/>
                <line x1="41" y1="65" x2="79" y2="65" stroke="url(#paint2_linear)" strokeWidth="3"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="40" y1="50" x2="80" y2="50" gradientUnits="userSpaceOnUse">
                    <stop offset="0.05" stopColor="#F5841F"/>
                    <stop offset="0.35" stopColor="#EBC554"/>
                    <stop offset="0.53" stopColor="#00B3A6"/>
                    <stop offset="0.87" stopColor="#5B5FD1"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="41" y1="35.5" x2="79" y2="35.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0.05" stopColor="#F5841F"/>
                    <stop offset="0.35" stopColor="#EBC554"/>
                    <stop offset="0.53" stopColor="#00B3A6"/>
                    <stop offset="0.87" stopColor="#5B5FD1"/>
                  </linearGradient>
                  <linearGradient id="paint2_linear" x1="41" y1="65.5" x2="79" y2="65.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0.05" stopColor="#F5841F"/>
                    <stop offset="0.35" stopColor="#EBC554"/>
                    <stop offset="0.53" stopColor="#00B3A6"/>
                    <stop offset="0.87" stopColor="#5B5FD1"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="deployment-title">On Prem</div>
            <div className="deployment-description">
              For customisable integration with<br />more control
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div>© 2025 Canvas Space Inc.</div>
            <div>hello@canvas.space</div>
            <div>5548, Abington Drive, Newark, California, 94560</div>
          </div>
        </footer>
      </section>
    </div>
  );
}