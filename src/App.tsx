import { useEffect, useState } from "react";
import { config } from "./config";
import Envelope from "./components/Envelope";
import Bouquet from "./components/Bouquet";
import Sea from "./components/Sea";
import Letter from "./components/Letter";
import Memories from "./components/Memories";
import Finale from "./components/Finale";
import MusicButton from "./components/MusicButton";
import { FlowerDefs } from "./components/Bloom";

export default function App() {
  const [run, setRun] = useState(0);
  useEffect(() => {
    Object.entries(config.palette).forEach(([k, v]) => document.documentElement.style.setProperty(`--${k}`, v));
  }, []);
  const replay = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    setTimeout(() => setRun((n) => n + 1), 900);
  };
  return (
    <main>
      <FlowerDefs />
      <Envelope key={run} />
      <Bouquet />
      <Sea>
        <Letter />
        <Memories />
      </Sea>
      <Finale onReplay={replay} />
      <MusicButton />
    </main>
  );
}
