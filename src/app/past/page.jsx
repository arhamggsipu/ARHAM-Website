"use client"
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EventData } from '../../../public/eventAssets/assets';

const PastEventsPage = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [galleryModalEvent, setGalleryModalEvent] = useState(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(null);
  const memoizedEvents = useMemo(() => EventData, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (galleryModalEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [galleryModalEvent]);

  // Keyboard navigation: Escape to close, arrows to browse photos
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxImageIndex !== null) {
          setLightboxImageIndex(null);
        } else {
          setGalleryModalEvent(null);
        }
      } else if (lightboxImageIndex !== null && galleryModalEvent) {
        if (e.key === 'ArrowLeft') {
          setLightboxImageIndex((prev) => (prev === 0 ? galleryModalEvent.images.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setLightboxImageIndex((prev) => (prev === galleryModalEvent.images.length - 1 ? 0 : prev + 1));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImageIndex, galleryModalEvent]);

  const handleVideoClick = (eventId) => {
    setPlayingVideo(playingVideo === eventId ? null : eventId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A231F] to-[#232E26] font-sans">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
                Our <span className="text-[#4ADE80]">Memories</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                A visual journey through our club&apos;s most memorable events and activities
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#4ADE80] rounded-full"></div>
                  <span className="text-gray-300">{EventData.length} Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#4ADE80] rounded-full"></div>
                  <span className="text-gray-300">500+ Photos</span>
                </div>
              </div>
            </div>
            <Link
              href="/"
              className="group relative px-6 py-3 bg-white text-[#06402B] font-semibold rounded-lg 
                hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300
                flex items-center gap-2"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Events Timeline */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {memoizedEvents.map((event, index) => (
          <div key={event.event_id} className="mb-20">
            {/* Event Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-8 
              hover:border-[#4ADE80]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4ADE80]/5">
              
              {/* Event Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4ADE80] to-emerald-500 rounded-xl 
                      flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">{event.eventTitle}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="px-3 py-1 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full text-sm font-medium">
                          {event.category}
                        </span>
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {event.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-3 max-w-3xl">{event.description}</p>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-right mb-2">
                    <div className="text-3xl font-bold text-white">{event.participants}+</div>
                    <div className="text-gray-400 text-sm">Participants</div>
                  </div>
                  <div className="text-gray-400 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {event.location}
                  </div>
                </div>
              </div>

              {/* Photo & Video Grid */}
              <div className={`mb-8 ${getCollageLayoutClass(event.event_id)}`}>
                {/* Main Featured Image */}
                <div className={getImageSizeClass(event.event_id, 0)}>
                  <div className="relative w-full h-full min-h-[250px] rounded-2xl overflow-hidden group">
                    <Image
                      src={event.images[0]}
                      alt={`${event.eventTitle} - Featured`}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                        event.images[0]?.toLowerCase().includes('mandapam4') ? 'object-[center_18%]' : ''
                      }`}
                      style={event.images[0]?.toLowerCase().includes('mandapam4') ? { objectPosition: 'center 18%' } : undefined}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-sm font-medium">Featured Photo</div>
                      </div>
                    </div>
                  </div>
                </div>
                {event.images.slice(1, 4).map((image, imgIndex) => (
                  <div key={imgIndex} className={getImageSizeClass(event.event_id, imgIndex + 1)}>
                    <div className={`relative w-full h-full min-h-[200px] ${image.includes('Orientation4') ? 'bg-black/30' : ''} rounded-xl overflow-hidden group`}>
                      <Image
                        src={image}
                        alt={`${event.eventTitle} - ${imgIndex + 2}`}
                        fill
                        className={`${
                          image.includes('Orientation4')
                            ? 'object-contain'
                            : image.toLowerCase().includes('mandapam4')
                            ? 'object-cover object-[center_18%]'
                            : 'object-cover'
                        } transition-transform duration-500 group-hover:scale-105`}
                        style={image.toLowerCase().includes('mandapam4') ? { objectPosition: 'center 18%' } : undefined}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}

                {/* Video Player or More Photos */}
                {event.reel ? (
                  <div className={getVideoSizeClass(event.event_id)}>
                    <div className="relative w-full h-full min-h-[200px] rounded-xl overflow-hidden group cursor-pointer"
                      onClick={() => handleVideoClick(event.event_id)}>
                      
                      {playingVideo === event.event_id ? (
                        <video
                          src={event.reel}
                          controls
                          autoPlay
                          className="w-full h-full object-cover"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-emerald-700/80 
                            flex items-center justify-center">
                            <div className="text-center p-4">
                              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/30 backdrop-blur-sm 
                                flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-white font-semibold">Watch Highlights</div>
                              <div className="text-white/80 text-sm mt-1">Event Reel</div>
                            </div>
                          </div>
                          <div className="absolute inset-0 border-2 border-white/20 rounded-xl 
                            group-hover:border-white/40 transition-colors duration-300" />
                        </>
                      )}
                    </div>
                  </div>
                ) : event.images.length > 4 && (
                  <div
                    onClick={() => {
                      setGalleryModalEvent(event);
                      setLightboxImageIndex(null);
                    }}
                    className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 
                    min-h-[200px] group cursor-pointer border border-white/10 hover:border-[#4ADE80]/60 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-[#4ADE80]/10"
                    title={`Click to view all ${event.images.length} photos`}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
                      <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                        +{event.images.length - 4}
                      </div>
                      <div className="text-white font-semibold text-sm md:text-base">More Photos</div>
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4ADE80]/20 text-[#4ADE80] text-xs font-medium group-hover:bg-[#4ADE80] group-hover:text-black transition-colors duration-200">
                        <span>Click to view gallery</span>
                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                    {/* Background blur image */}
                    {event.images[4] && (
                      <div className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-300">
                        <Image
                          src={event.images[4]}
                          alt=""
                          fill
                          className="object-cover blur-sm"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    About This Event
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{event.bio}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Event Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {event.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 
                          rounded-full text-gray-300 text-sm transition-all duration-200 hover:scale-105"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                <div className="text-gray-400 text-sm">
                  {event.images.length} photos • {event.reel ? '1 video' : 'No video'}
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 
                    rounded-lg text-white text-sm transition-colors duration-200 cursor-pointer">
                    Share Event
                  </button>
                  <button 
                    onClick={() => {
                      setGalleryModalEvent(event);
                      setLightboxImageIndex(null);
                    }}
                    className="px-4 py-2 bg-[#4ADE80] hover:bg-emerald-500 
                    rounded-lg text-[#06402B] hover:text-white font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-2 text-sm shadow-md shadow-[#4ADE80]/20 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    View Full Gallery ({event.images.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Modal Window */}
      {galleryModalEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md transition-all duration-300"
          onClick={() => {
            setGalleryModalEvent(null);
            setLightboxImageIndex(null);
          }}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#17201B] border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Cut / Close Button */}
            <div className="flex items-center justify-between px-5 md:px-7 py-4 border-b border-white/10 bg-[#1D2721]/95 backdrop-blur-md sticky top-0 z-20">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 bg-[#4ADE80]/20 text-[#4ADE80] text-xs font-semibold rounded-full">
                    {galleryModalEvent.category}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {galleryModalEvent.date}
                  </span>
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-white leading-snug">
                  {galleryModalEvent.eventTitle} <span className="text-[#4ADE80] font-normal text-sm md:text-lg">Gallery</span>
                </h3>
              </div>

              {/* Cut / Close Option Button */}
              <button
                onClick={() => {
                  setGalleryModalEvent(null);
                  setLightboxImageIndex(null);
                }}
                className="p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-all duration-200 border border-white/15 hover:scale-110 active:scale-95 group cursor-pointer shadow-lg"
                title="Close gallery (Esc)"
                aria-label="Close gallery"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body - Photos Grid */}
            <div className="p-4 md:p-6 overflow-y-auto flex-1 custom-scrollbar">
              <p className="text-xs md:text-sm text-gray-400 mb-4 flex items-center justify-between">
                <span>Showing all {galleryModalEvent.images.length} photos</span>
                <span className="text-gray-500">Click any image to view full screen</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryModalEvent.images.map((imgSrc, imgIdx) => (
                  <div
                    key={imgIdx}
                    onClick={() => setLightboxImageIndex(imgIdx)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/10 hover:border-[#4ADE80]/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#4ADE80]/10 hover:scale-[1.01]"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${galleryModalEvent.eventTitle} - Photo ${imgIdx + 1}`}
                      fill
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                        imgSrc.toLowerCase().includes('mandapam4') ? 'object-[center_18%]' : ''
                      }`}
                      style={imgSrc.toLowerCase().includes('mandapam4') ? { objectPosition: 'center 18%' } : undefined}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                      <span className="text-xs font-medium text-white flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#4ADE80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        Photo {imgIdx + 1}
                      </span>
                      <span className="text-[11px] text-[#4ADE80] font-medium bg-[#4ADE80]/20 px-2 py-0.5 rounded-full border border-[#4ADE80]/30">
                        Expand
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 md:px-7 py-3.5 border-t border-white/10 bg-[#1D2721]/95 flex items-center justify-between text-xs md:text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80]"></span>
                {galleryModalEvent.location}
              </span>
              <button
                onClick={() => {
                  setGalleryModalEvent(null);
                  setLightboxImageIndex(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors border border-white/10 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Full-Resolution Lightbox View */}
      {galleryModalEvent && lightboxImageIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-lg transition-opacity duration-300 p-4"
          onClick={() => setLightboxImageIndex(null)}
        >
          {/* Top Bar with counter, title & cut button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20" onClick={(e) => e.stopPropagation()}>
            <div className="text-white/90 text-xs sm:text-sm font-medium bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md flex items-center gap-2">
              <span className="text-[#4ADE80] font-bold">{lightboxImageIndex + 1}</span> / {galleryModalEvent.images.length}
              <span className="text-white/40">•</span>
              <span className="truncate max-w-[200px] sm:max-w-none">{galleryModalEvent.eventTitle}</span>
            </div>
            <button
              onClick={() => setLightboxImageIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/15 hover:scale-110 cursor-pointer"
              title="Close full view (Esc)"
              aria-label="Close full view"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Previous Button */}
          {galleryModalEvent.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImageIndex((prev) => (prev === 0 ? galleryModalEvent.images.length - 1 : prev - 1));
              }}
              className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#4ADE80] text-white hover:text-black transition-all border border-white/20 cursor-pointer hover:scale-110 active:scale-95"
              title="Previous photo (Left Arrow)"
              aria-label="Previous photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Full Photo (object-contain ensures 100% of photo is visible without any cropping) */}
          <div 
            className="relative w-[92vw] h-[80vh] max-w-5xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryModalEvent.images[lightboxImageIndex]}
              alt={`${galleryModalEvent.eventTitle} - Photo ${lightboxImageIndex + 1}`}
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="100vw"
            />
          </div>

          {/* Next Button */}
          {galleryModalEvent.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImageIndex((prev) => (prev === galleryModalEvent.images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#4ADE80] text-white hover:text-black transition-all border border-white/20 cursor-pointer hover:scale-110 active:scale-95"
              title="Next photo (Right Arrow)"
              aria-label="Next photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-white mb-2">Arham Club</div>
              <p className="text-gray-400 text-sm">Creating memories, building community since 2020</p>
            </div>
            <div className="text-gray-400 text-sm">
              Total Events: {EventData.length} • Total Photos: {EventData.reduce((acc, event) => acc + event.images.length, 0)}
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-6">
            © {new Date().getFullYear()} Arham Club. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper functions for collage layouts
const getCollageLayoutClass = (eventId) => {
  const layouts = {
    '1': 'grid grid-cols-1 md:grid-cols-3 gap-4',
    '2': 'grid grid-cols-1 md:grid-cols-2 gap-4',
    '3': 'grid grid-cols-2 md:grid-cols-4 gap-4',
    '4': 'grid grid-cols-2 md:grid-cols-3 gap-4',
    '5': 'grid grid-cols-1 md:grid-cols-3 gap-4',
    '6': 'grid grid-cols-1 md:grid-cols-3 gap-4',
  };
  return layouts[eventId] || 'grid grid-cols-1 md:grid-cols-3 gap-4';
};

const getImageSizeClass = (eventId, imageIndex) => {
  const patterns = {
    '1': ['md:col-span-2 md:row-span-2', 'md:col-span-1', 'md:col-span-1', 'md:col-span-1'],
    '2': ['md:col-span-1 md:row-span-2', 'md:col-span-1 md:row-span-2', 'md:col-span-1', 'md:col-span-1'],
    '3': ['md:col-span-2', 'md:col-span-1', 'md:col-span-1', 'md:col-span-2'],
    '4': ['md:col-span-2 md:row-span-2', 'md:col-span-1', 'md:col-span-1', 'md:col-span-1 md:row-span-2'],
    '5': ['md:col-span-2', 'md:col-span-1', 'md:col-span-1', 'md:col-span-1 md:row-span-2'],
    '6': ['md:col-span-2 md:row-span-2', 'md:col-span-1 md:row-span-2', 'md:col-span-1', 'md:col-span-1'],
  };
  return `aspect-square md:aspect-auto ${(patterns[eventId] || patterns['1'])[imageIndex] || ''}`;
};

const getVideoSizeClass = (eventId) => {
  return (eventId === '4' || eventId === '6') ? 'md:col-span-2' : 'md:col-span-1';
};

export default PastEventsPage;