"use client"
import { TextHoverEffect } from "./ui/text-hover-effect";
import { FaSquareInstagram, FaLinkedin, FaSquareWhatsapp } from "react-icons/fa6";
import Marquee from "react-fast-marquee";

export default function Footer(){
    return (
        <>
        <section id="contact">
        <TextHoverEffect text="ARHAM" />
        <div className="bg-slate-900 pb-4 md:pb-8">
            <div className="bg-emerald-400 p-1 md:p-2 text-black md:mx-48 lg:mx-60 rounded-full font-black font-font1 text-sm md:text-lg mb-6 mx-10 md:tracking-wider">
                <h1 className="">
            <Marquee className="me-20">
                Website developed and maintained by Web Team | ARHAM - GGSIPU        
            </Marquee>
                </h1>
            </div>
            <h1 className="text-green-500 text-center font-font3 mb-3 md:mb-8 text-lg md:text-4xl">Connect With Us</h1>


            <div className="flex justify-center gap-4 md:gap-20 pb-8">
                <a 
                className="bg-green-400 hover:bg-green-600 cursor-pointer p-2 md:p-3 rounded-full text-black text-xl md:text-4xl"
                href="https://www.instagram.com/arham_ggsipu/profilecard/?igsh=aTI4Y3N6OW55aTls"
                target="_blank"
                ><FaSquareInstagram/>
                </a>
                <a 
                className="bg-green-400 hover:bg-green-600 cursor-pointer p-2 md:p-3 rounded-full text-black text-xl md:text-4xl"
                href="https://chat.whatsapp.com/DHGSS0mg7DaJBGKixluaBr"
                target="_blank"
                > <FaSquareWhatsapp/>
                </a>
                <a 
                className="bg-green-400 hover:bg-green-600 cursor-pointer p-2 md:p-3 rounded-full text-black text-xl md:text-4xl"
                href="https://www.linkedin.com/in/arham-ggsipuedc/"
                target="_blank"
                > <FaLinkedin/>
                </a>
            </div>
            <div className="bg-emerald-400 p-1 md:p-3 ">
                <h1 className="text-black text-sm md:text-xl font-bold text-center"> © All Rights Reserved ARHAM - GGSIPU </h1>
            </div>
        </div>
        </section>
        </>
    )
}
