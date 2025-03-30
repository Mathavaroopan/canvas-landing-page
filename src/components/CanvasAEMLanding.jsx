// Canvas AEM Landing Page - Fully Responsive with Footer & Layout Fixes
import React, { useState, useRef, useEffect } from 'react';
import demoVideo from '../assets/videos/lion-king.mp4';
import LockIcon from '../assets/images/Lock.svg';
import UnlockIcon from '../assets/images/Unlock.svg';

export default function CanvasAEMLanding() {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [showUnlockedMessage, setShowUnlockedMessage] = useState(false);
  const [wasFullScreen, setWasFullScreen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  const videoRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const formTimeThreshold = 10;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setUnlocking(true);
    setTimeout(() => {
      setFormSubmitted(true);
      setShowForm(false);
      setUnlocking(false);
      if (wasFullScreen && videoRef.current) enterFullscreen(videoRef.current);
      if (videoRef.current) videoRef.current.play();
    }, 1000);
  };

  const handleUnlockExperience = () => {
    if (formSubmitted) {
      setShowUnlockedMessage(true);
      setTimeout(() => setShowUnlockedMessage(false), 350);
    } else {
      if (videoRef.current) {
        videoRef.current.currentTime = formTimeThreshold;
        videoRef.current.pause();
        setShowForm(true);
      }
    }
  };

  return (
    <div className="bg-black text-white font-sans snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth">
      <section ref={section1Ref} className="snap-start min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="py-2.5 text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-green-400 to-blue-500 text-transparent bg-clip-text mb-4">
          Stop Losing Viewers After the Play.
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">
          Canvas AEM is a plug-and-play conditional access layer that lets OTT platforms, OVPs, and media tech vendors unlock engagement, capture verified user data, and monetize smarter — right inside the video experience.
        </p>
        <div className="w-full max-w-3xl aspect-video bg-gray-800 rounded-2xl overflow-hidden mb-4 relative">
          <video ref={videoRef} src={demoVideo} className="w-full h-full object-cover" controls autoPlay muted playsInline onTimeUpdate={handleTimeUpdate} onSeeking={handleSeeking} controlsList="nodownload nopictureinpicture" disablePictureInPicture />
          {showForm && (
            <div className="fixed inset-0 md:absolute md:inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center backdrop-blur-sm z-50 p-4">
              <div className="w-full max-w-sm p-6 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <img src={unlocking ? UnlockIcon : LockIcon} alt="Lock" className="w-16 h-16 transition-all duration-300" />
                </div>
                <h3 className="text-xl text-white font-bold mb-4">
                  {unlocking ? "Unlocking your content..." : "Here you can collect your First-Party Data by"}
                </h3>
                <form onSubmit={handleSubmit} className={`space-y-3 mt-2 ${unlocking ? 'opacity-70 pointer-events-none' : ''}`}>
                  {['name', 'email', 'company'].map((field) => (
                    <input key={field} name={field} type="text" value={formData[field]} onChange={handleInputChange} placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`} className="px-4 py-2 bg-gray-700 bg-opacity-50 w-full rounded-full text-white text-sm" required disabled={unlocking} />
                  ))}
                  <div className="flex justify-center mt-4">
                    <button type="submit" className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-full flex items-center justify-center" disabled={unlocking}>
                      {unlocking ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {showUnlockedMessage && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center backdrop-blur-sm z-50">
              <div className="w-full max-w-sm p-6 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <img src={UnlockIcon} alt="Unlock Icon" className="w-24 h-24" />
                </div>
                <h3 className="text-xl text-white font-bold mb-2">Content Already Unlocked</h3>
              </div>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-400 mb-4">Experience how Canvas AEM turns passive plays into active conversions.</p>
        <button onClick={handleUnlockExperience} className="bg-gradient-to-r from-orange-400 to-blue-500 text-white py-3 px-6 rounded-full text-lg font-medium shadow-lg">
          Unlock Full Experience
        </button>
      </section>

      <section ref={section2Ref} className="snap-start min-h-screen bg-gradient-to-br from-zinc-900 to-black px-6 py-20 flex flex-col justify-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12">Built for Modern Media Workflows</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto text-center md:text-left">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-orange-300">For OVPs & Backend Platforms</h3>
            <ul className="list-disc list-inside text-lg text-gray-300">
              <li>Add Canvas AEM as a layer on top of your player stack</li>
              <li>Offer first-party engagement tools to your customers</li>
              <li>Plug into your existing APIs — REST, GraphQL, etc.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-300">For OTT & SVOD/AVOD Platforms</h3>
            <ul className="list-disc list-inside text-lg text-gray-300">
              <li>Capture viewer data post-play without disrupting UX</li>
              <li>Unlock access to premium content, episodes, or offers</li>
              <li>Drive retention and monetization with intent-based triggers</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h4 className="text-xl font-semibold mb-4">Deployment Options</h4>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="bg-zinc-800 p-6 rounded-xl w-64">
              <h5 className="text-lg font-medium mb-2">☁️ On Cloud</h5>
              <p className="text-sm text-gray-400">Ready-to-integrate via REST APIs</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-xl w-64">
              <h5 className="text-lg font-medium mb-2">🏢 On Prem</h5>
              <p className="text-sm text-gray-400">Full control with custom integration options</p>
            </div>
          </div>
        </div>

        {/* Footer included in section 2 */}
        <footer className="text-center py-6 text-gray-500 text-sm mt-20">
          ©2024 Canvas Space Inc. | hello@canvas.space | Terms & Privacy
        </footer>
      </section>
    </div>
  );
} 