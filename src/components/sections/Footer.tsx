"use client";
import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Github,
    Globe,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

function HoverFooter() {
    const footerLinks = [
        {
            title: "Portfolio",
            links: [
                { label: "Home", href: "#" },
                { label: "Arsenal", href: "#arsenal" },
                { label: "Experience", href: "#experience" },
                { label: "Projects", href: "#projects" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "CV/Resume", href: "#" },
                { label: "GitHub", href: "https://github.com" },
                {
                    label: "Available for Hire",
                    href: "#",
                    pulse: true,
                },
            ],
        },
    ];

    const contactInfo = [
        {
            icon: <Mail size={18} className="text-violet-400" />,
            text: "q@qn.ci",
            href: "mailto:q@qn.ci",
        },
        {
            icon: <MapPin size={18} className="text-violet-400" />,
            text: "Based In UAE",
        },
    ];

    const socialLinks = [
        { icon: <Github size={20} />, label: "GitHub", href: "#" },
        { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
        { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
        { icon: <Globe size={20} />, label: "Website", href: "#" },
    ];

    return (
        <footer className="bg-zinc-950/40 relative h-fit rounded-[48px] overflow-hidden m-4 md:m-8 border border-white/5">
            <div className="max-w-7xl mx-auto p-10 md:p-14 z-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
                    {/* Brand section */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-violet-500 text-3xl font-extrabold rotate-12">
                                &hearts;
                            </span>
                            <span className="text-white text-3xl font-black uppercase tracking-tighter italic">Saif</span>
                        </div>
                        <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                            Building high-performance digital experiences with state-of-the-art AI and creative engineering at 15.
                        </p>
                    </div>

                    {/* Footer link sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6 opacity-50">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.label} className="relative group w-fit">
                                        <a
                                            href={link.href}
                                            className="text-zinc-400 group-hover:text-violet-400 transition-colors font-medium text-sm"
                                        >
                                            {link.label}
                                        </a>
                                        {link.pulse && (
                                            <span className="absolute -top-1 -right-4 w-2 h-2 rounded-full bg-violet-500 animate-pulse shadow-[0_0_8px_#8b5cf6]"></span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact section */}
                    <div>
                        <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6 opacity-50">
                            Contact info
                        </h4>
                        <ul className="space-y-4">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-center space-x-3 group">
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-violet-500/30 transition-colors">
                                        {item.icon}
                                    </div>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-zinc-400 hover:text-violet-400 transition-colors font-medium text-sm"
                                        >
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="text-zinc-400 font-medium text-sm">
                                            {item.text}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="border-t border-white/5 my-8" />

                {/* Footer bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs space-y-6 md:space-y-0">
                    {/* Social icons */}
                    <div className="flex space-x-6 text-zinc-500">
                        {socialLinks.map(({ icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-zinc-600 font-bold uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} Saif Medhat · All rights reserved.
                    </p>
                </div>
            </div>

            {/* Text hover effect - MY NAME AS THE DESIGN TYPE */}
            <div className="lg:flex hidden h-[30rem] -mt-52 -mb-24 opacity-60">
                <TextHoverEffect text="Saif Medhat" className="z-50" />
            </div>

            <FooterBackgroundGradient />
        </footer>
    );
}

export default HoverFooter;
