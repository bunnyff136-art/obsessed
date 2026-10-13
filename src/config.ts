// ✏️ EVERYTHING PERSONAL LIVES HERE. Edit text, photos, colors and music in this one file.
export const config = {
  palette: { ivory: "#f1e6d3", blush: "#f4c6d0", crimson: "#b3202e", aqua: "#bfe3ea", mist: "#d9eef2", ink: "#4a2b30" },

  envelope: { hint: "A little something for you." },

  letter: {
    from: "[Your OBSEESED GUY]",
    to: "[BHAGII]",
    paragraphs: [
      "When your heart was breaking and the world felt heavy, I stayed right beside you. ",
      "I didn’t just offer empty words—I was there through the quiet nights, the difficult days, and every moment you needed someone who truly cared",
      "And whenever you need a reminder of how special you are, I hope this little corner of the internet makes you smile."
    ]
  },

  // Put real photos in /public/assets/photos and list them here. Empty `src` shows a placeholder.
  memories: [
    { src: "/assets/photos/b1.png", caption: "Where it all began", date: "DEC-25" },
    { src: "/assets/photos/b2.png", caption: "Admiring you", date: "MAY-12" },
    { src: "/assets/photos/b3.png", caption: "Your smile", date: "JULY-16" },
    { src: "/assets/photos/b4.png", caption: "What I like mostly from you   -Is your innocent smile", date: "JULY-26" },
  ] as { src: string; caption: string; date: string }[],

  finale: {
    message: "And if I could give you one thing, it would be the ability to see yourself through my eyes.",
    closing: "Made with love, just for you.",
    replayLabel: "Read it again"
  },

  // Transparent PNG/WebP cut-outs go in /public/assets/flowers. Empty list = built-in painted SVG blooms.
  assets: {
    flowers: [] as string[],   // e.g. ["/assets/flowers/rose-red.png", "/assets/flowers/rose-pink.png", "/assets/flowers/peony-cream.png", "/assets/flowers/dahlia-red.png"]
    ocean: [] as string[], 
    letterFrame: "/assets/bouquets/Bow.png",  // full-screen flower layer for the letter scene; "" to hide it // e.g. ["/assets/bouquets/b1.png", "/assets/bouquets/b2.png"]     // optional extra drifting cut-outs (shells, fish, blossoms)
  },

  // Audio plays ONLY after she taps the music button.
  // Use your own file (public/assets/audio/song.mp3) OR an official embed URL (Spotify/YouTube embed). Leave both empty to hide playback.
  music: { src: "", embedUrl: "", label: "Our song" }
};
