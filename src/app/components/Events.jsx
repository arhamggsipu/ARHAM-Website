'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';

import Link from 'next/link';

const images = [
    '/pt/1.jpg',
    '/pt/2.jpg',
    '/pt/3.jpg',
    '/pt/4.jpg',
    '/pt/5.jpg',
    '/pt/6.jpg',
    '/pt/7.jpg',
];

export default function Events() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const timer = setTimeout(goToNext, 3500);
        return () => clearTimeout(timer);
    }, [currentIndex]);



    return (
        <>
            <section id="events" className='bg-[#232E26] font-poiret'>
               <div className="w-full bg-cover">
                <div className="mb-8 max-w-7xl mx-auto px-4">
                    <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                    font-bold text-[#D9EFDE] mb-4 font-font3">
                    Our Events
                    </h1>
                    <div className="relative flex items-center">
                    <p className="mx-auto text-sm sm:text-lg md:text-xl 
                        text-[#D9EFDE] font-bold text-center">
                        A glimpse into moments at Arham Club
                    </p>
                    <Link
                        href="/past"
                        className="absolute right-0 cursor-pointer font-font3 
                        text-[#06402B] bg-white text-sm sm:text-base md:text-lg font-bold
                        border-2 border-white rounded-lg px-6 py-2
                        hover:bg-transparent hover:text-[#D9EFDE]
                        transition-colors whitespace-nowrap"
                    >
                        Our Past Events
                    </Link>
                    </div>

                </div>
            </div>


                <div className="flex justify-center">
                    <div className="relative h-full w-[90%] md:w-[75%] overflow-hidden rounded-xl md:rounded-3xl border-white border-2">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {images.map((image, index) => (
                                <div key={index} className="w-full h-full flex-shrink-0">
                                    <Image
                                        src={image}
                                        alt={`Slide ${index}`}
                                        width={1000}
                                        height={600}
                                        className="w-full h-full object-contain"
                                        priority={index === 0} // Load the first image with priority
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Left Arrow */}
                        <button onClick={goToPrevious} className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 text-2xl md:text-5xl">
                            <FaChevronLeft />
                        </button>
                        {/* Right Arrow */}
                        <button onClick={goToNext} className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 text-2xl md:text-5xl">
                            <FaChevronRight />
                        </button>
                        {/* Navigation Dots */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === index ? 'bg-cyan-500 scale-110' : 'bg-gray-300'}`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
