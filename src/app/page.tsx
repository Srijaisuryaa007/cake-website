import CanvasSequence from "@/components/CanvasSequence";
import StorySections from "@/components/StorySections";

export default function Home() {
  return (
    <main className="relative w-full h-[400vh]">
      {/* 
        The canvas captures the screen bounds and sits behind.
        The story sections use the window scroll to determine what to show.
        The 400vh height gives enough room to scroll through 240 frames and 5 story beats.
      */}
      <CanvasSequence />
      <StorySections />
    </main>
  );
}
