"use client";
import OfficeBearers from "./OfficeBearers";
import React from "react";
import { Timeline } from "./ui/timeline";
import { WebTeam, DesignTeam, ContentTeam, EventTeam, PrTeam, SocialMediaTeam } from "./data";
import { FaLinkedin, FaSquareInstagram } from "react-icons/fa6";

export default function AllTeam() {
  const teams = [
    { 
        title: "1. Web Team",
        description: (
        <>
        Crafting websites with nature in mind, <br />
        Code and conservation are perfectly aligned. <br />
        Digital architects building a greener tomorrow, <br />
        One line of code at a time and sustainability to follow!
        </>
        ),
        members: WebTeam 
    },
    { 
        title: "2. Content Team", 
        description: (
            <>{`
            Turning ink into songs, the nightingale looks on,`} <br />
            {`Content like the sun's rays, lighting up our darkest days.`} <br />
            {`Our stories take flight, like birds in the night!`}
            </>
            ), 
        members: ContentTeam 
    },
    { 
        title: "3. Social Media Team", 
        description: (
            <>
            Where hashtags grow like wildflowers, <br />
            Keeping the timeline vibrant, like rainforest towers. <br />
            Turning eco-ideas into viral sensations - one post at a time!
            </>
            ),
        members: SocialMediaTeam 
    },
    { 
        title: "4. Design Team", 
        description: (
            <>
            {`Designs so fresh, they photosynthesize,`}<br />
            {`Where visuals speak louder than words for nature's rise.`} <br />
            {`Graphics bloom like wildflowers, spreading beauty that empowers!`}
            </>
            ),
        members: DesignTeam 
    },
    { 
        title: "5. PR Team", 
        description: (
            <>
           {`Making waves and keeping the planet calm,`} <br />
           {`Eco-diplomats turning whispers using their charm,`} <br />
           {`Green PR: turning press releases into nature's psalm.`}
            </>
            ), 
        members: PrTeam 
    },

  ];

  return (
    <div>
      <OfficeBearers/>
      <div className="w-full  text-white">
        <Timeline
          data={teams.map((team) => ({
            title: team.title,
            content: (
              <div className="">
                <div className="bg-white w-full h-0.5 md:mt-5"></div>
                <p className="text-white text-center text-balance text-sm md:text-base lg:text-xl font-bold font-font1 mb-8 mt-2 md:mt-4">
                  {team.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-8">
                  {/* Large Cards */}
                  {(team.members || [])
                    .filter((member) => member.large)
                    .map((member, idx) => (
                      <div
                        key={idx}
                        className="py-4 md:py-6 bg-[#D9EFDE] hover:bg-green-300 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-500 rounded-2xl shadow-2xl flex flex-col items-center"
                      >
                        <img
                          src={member.image}
                          alt={`${member.name}`}
                          className="rounded-full object-cover h-24 w-24 md:h-28 md:w-28 lg:w-44 lg:h-44 border-4 lg:border-8 border-green-600"
                        />
                        <h3 className="mt-4 text-lg lg:text-2xl font-black text-[#232E26] ">
                          {member.name}
                        </h3>
                        <p className="text-sm md:text-lg font-font1 text-gray-600 ">
                          {member.designation}
                        </p>
                        <div className="flex gap-4 mt-4">
                          {member.socials?.linkedin && (
                            <a
                              href={member.socials.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 text-xl md:text-2xl lg:text-3xl cursor-pointer"
                            >
                              <FaLinkedin/>
                            </a>
                          )}
                          {member.socials?.instagram && (
                            <a
                              href={member.socials.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-600 text-xl md:text-2xl lg:text-3xl cursor-pointer"
                            >
                              <FaSquareInstagram/>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Small Cards */}
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  {(team.members || [])
                    .filter((member) => !member.large)
                    .map((member, idx) => (
                      <div
                        key={idx}
                        className="py-2 px-4 bg-[#D9EFDE] hover:bg-emerald-300 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-500 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2 md:gap-4"
                      >
                        <img
                          src={member.image}
                          alt={`${member.name}`}
                          className="rounded-full object-cover h-16 w-16 lg:h-20 lg:w-20 border-4 border-green-600"
                        />
                        <div className="flex flex-col gap-1 justify-center items-center">

                        <h3 className=" text-center text-sm md:text-base lg:text-lg font-bold text-[#232E26]">
                          {member.name}
                        </h3>
                        <p className="text-center text-xs md:text-base text-gray-600 font-font1">
                          {member.designation}
                        </p>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            ),
          }))}
        />
      </div>
    </div>
    );
}
