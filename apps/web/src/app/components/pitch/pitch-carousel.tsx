"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@bubba/ui/carousel";
import * as React from "react";
import { SectionMarket } from "./pitch-market";
import { SectionMission } from "./pitch-mission";
import { PitchNavigation } from "./pitch-navigation";
import { SectionProblem } from "./pitch-problem";
import { SectionSolution } from "./pitch-solution";
import { SectionStart } from "./pitch-start";
import { SectionTeam } from "./pitch-team";
import { SectionTraction } from "./pitch-traction";

const slides = [
  { component: SectionStart, title: "Start" },
  { component: SectionMission, title: "Mission" },
  { component: SectionProblem, title: "The Problem" },
  { component: SectionSolution, title: "The Solution" },
  { component: SectionMarket, title: "Market" },
  { component: SectionTraction, title: "Traction" },
  { component: SectionTeam, title: "Team" },
];

export function PitchCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="w-full h-full relative"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-0">
        {slides.map(({ component: SlideComponent }, index) => (
          <CarouselItem key={`slide-${index + 1}`} className="pl-0 basis-full">
            <SlideComponent />
          </CarouselItem>
        ))}
      </CarouselContent>
      <PitchNavigation
        totalSlides={slides.length}
        currentSlide={current}
        onNavigate={(index) => api?.scrollTo(index)}
      />
    </Carousel>
  );
}
