'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export function ParallaxComponent() {
    const parallaxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

        if (triggerElement) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "0% 0%",
                    end: "100% 0%",
                    scrub: 0
                }
            });

            const layers = [
                { layer: "1", yPercent: 70 },
                { layer: "2", yPercent: 55 },
                { layer: "3", yPercent: 40 },
                { layer: "4", yPercent: 10 }
            ];

            layers.forEach((layerObj, idx) => {
                tl.to(
                    triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
                    {
                        yPercent: layerObj.yPercent,
                        ease: "none"
                    },
                    idx === 0 ? undefined : "<"
                );
            });
        }

        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        return () => {
            // Clean up GSAP and ScrollTrigger instances
            ScrollTrigger.getAll().forEach(st => st.kill());
            gsap.killTweensOf(triggerElement);
            lenis.destroy();
        };
    }, []);

    return (
        <div className="parallax overflow-hidden" ref={parallaxRef} style={{ height: '600px', position: 'relative' }}>
            <section className="parallax__header h-full w-full relative">
                <div className="parallax__visuals h-full w-full relative overflow-hidden bg-neutral-950">
                    <div data-parallax-layers className="parallax__layers absolute inset-0 flex items-center justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80"
                            loading="eager"
                            data-parallax-layer="1"
                            alt=""
                            className="absolute w-full h-[120%] object-cover opacity-40 blur-sm"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80"
                            loading="eager"
                            data-parallax-layer="2"
                            alt=""
                            className="absolute w-[90%] h-auto object-contain opacity-60"
                        />
                        <div data-parallax-layer="3" className="parallax__layer-title relative z-10 flex items-center justify-center">
                            <h2 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mix-blend-difference drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                Skills
                            </h2>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80"
                            loading="eager"
                            data-parallax-layer="4"
                            alt=""
                            className="absolute w-[70%] h-auto object-contain opacity-80"
                        />
                    </div>
                    <div className="parallax__fade absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50 pointer-events-none"></div>
                </div>
            </section>
        </div>
    );
}
