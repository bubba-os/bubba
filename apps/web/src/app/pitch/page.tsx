import type { Metadata } from "next";
import { PitchCarousel } from "../components/pitch/pitch-carousel";

export const metadata: Metadata = {
  title: "Pitch | Bubba AI, Inc.",
};

export default function Pitch() {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 h-screen">
      <PitchCarousel />
    </div>
  );
}
