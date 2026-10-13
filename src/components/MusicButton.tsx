import { useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { config } from "../config";

export default function MusicButton() {
  const { src, embedUrl, label } = config.music;
  const audio = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  if (!src && !embedUrl) return null;
  const toggle = async () => {
    if (src && audio.current) {
      if (on) audio.current.pause(); else { try { await audio.current.play(); } catch { return; } }
    }
    setOn(!on);
  };
  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex flex-col items-end gap-2">
      {on && embedUrl && <iframe title={label} src={embedUrl} loading="lazy" allow="autoplay; encrypted-media" className="h-20 w-[min(85vw,22rem)] rounded-xl border-0" />}
      {src && <audio ref={audio} src={src} loop preload="none" />}
      <button onClick={toggle} aria-pressed={on} aria-label={on ? `Pause ${label}` : `Play ${label}`} className="grid h-12 w-12 place-items-center rounded-full bg-ivory/90 text-crimson shadow-lg backdrop-blur">
        {on ? <Pause size={20} /> : <Music size={20} />}
      </button>
    </div>
  );
}
