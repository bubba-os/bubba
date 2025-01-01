"use client";

import { cn } from "@bubba/ui/cn";

interface PitchNavigationProps {
  totalSlides: number;
  currentSlide: number;
  onNavigate: (index: number) => void;
}

export function PitchNavigation({
  totalSlides,
  currentSlide,
  onNavigate,
}: PitchNavigationProps) {
  return (
    <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-50 flex justify-center items-center gap-3">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={`navigation-dot-${index + 1}`}
          type="button"
          onClick={() => onNavigate(index)}
          className={cn(
            "w-4 h-4 rounded-full transition-all duration-300",
            currentSlide === index
              ? "bg-primary scale-125"
              : "bg-primary/30 hover:bg-primary/50",
          )}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={currentSlide === index ? "true" : "false"}
        />
      ))}
    </div>
  );
}
