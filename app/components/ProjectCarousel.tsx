"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Project = {
  name: string;
  role: string;
  detail: string;
  image?: string;
  github?: string;
  link?: string;
  techStack?: string;
};

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="flex flex-col gap-8">
      {/* Top: Image Carousel */}
      <div className="relative group rounded-xl overflow-hidden  bg-panel shadow-lg">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {projects.map((project, index) => (
              <div
                className="relative flex-[0_0_100%] min-w-0 h-[250px] sm:h-[350px]"
                key={index}
              >
                {/* Background Image */}
                {project.image ? (
                  <div className="absolute inset-0 w-full h-full bg-ink">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover "
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-ink flex items-center justify-center">
                    <span className="text-muted font-mono text-sm tracking-widest">NO IMAGE</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 rounded-full text-paper/70 bg-ink/30 hover:text-paper hover:bg-ink/60 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:opacity-100 outline-none backdrop-blur-sm"
        >
          <ChevronLeft size={32} strokeWidth={1.5} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 rounded-full text-paper/70 bg-ink/30 hover:text-paper hover:bg-ink/60 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:opacity-100 outline-none backdrop-blur-sm"
        >
          <ChevronRight size={32} strokeWidth={1.5} />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${index === selectedIndex
                  ? "w-8 bg-emerald-400"
                  : "w-4 bg-paper/40 hover:bg-paper/70"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom: Text Content */}
      <div className="relative min-h-[220px] sm:min-h-[180px] w-full">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ease-in-out ${index === selectedIndex
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
              }`}
          >
            <h3 className="font-display text-3xl sm:text-4xl text-paper mb-3">
              {project.name}
            </h3>
            <p className="font-body text-sm sm:text-base text-muted max-w-2xl mb-4 leading-relaxed">
              {project.detail}
            </p>
            {project.techStack && (
              <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-goldDim mb-6">
                {project.techStack}
              </p>
            )}

            <div className="flex items-center gap-6">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-goldDim hover:text-goldDim hover:-translate-y-1 transition-all"
                  title="View GitHub Repository"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-goldDim hover:text-goldDim hover:-translate-y-1 transition-all"
                  title="View Live Project"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
