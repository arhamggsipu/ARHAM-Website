"use client"
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EventData } from '../../../public/eventAssets/assets';

const PastEventsPage = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const memoizedEvents = useMemo(() => EventData, []);

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
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
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
                    <div className="relative w-full h-full min-h-[200px] rounded-xl overflow-hidden group">
                      <Image
                        src={image}
                        alt={`${event.eventTitle} - ${imgIndex + 2}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                  <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 
                    min-h-[200px] group cursor-pointer">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold text-white mb-2">+{event.images.length - 4}</div>
                      <div className="text-white/80 text-sm">More Photos</div>
                      <div className="mt-3 text-xs text-white/60">Click to view gallery</div>
                    </div>
                    {/* Background blur image */}
                    {event.images[4] && (
                      <div className="absolute inset-0 opacity-20">
                        <Image
                          src={event.images[4]}
                          alt=""
                          fill
                          className="object-cover blur-lg"
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
                    rounded-lg text-white text-sm transition-colors duration-200">
                    Share Event
                  </button>
                  <button className="px-4 py-2 bg-[#4ADE80] hover:bg-emerald-500 
                    rounded-lg text-white font-medium transition-colors duration-200">
                    View Full Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
  };
  return `aspect-square md:aspect-auto ${(patterns[eventId] || patterns['1'])[imageIndex] || ''}`;
};

const getVideoSizeClass = (eventId) => {
  return eventId === '4' ? 'md:col-span-2' : 'md:col-span-1';
};

export default PastEventsPage;