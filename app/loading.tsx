'use client'

export default function Loading() {
  const icons = [
    { src: 'main2.png', r: 60, speed: 8 },  // Inner ring
    { src: 'Rest.png', r: 60, speed: 8 },
    { src: 'vital.png', r: 100, speed: 12 }, // Middle ring
    { src: 'one-fraternity.png', r: 100, speed: 12 },
    { src: 'mii.png', r: 140, speed: 20 }, // Outer ring
    { src: 'main-logo.png', r: 140, speed: 20 }
  ];

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative flex items-center justify-center w-[400px] h-[400px]" style={{ transform: 'translateX(-13%)' }}>
        
        {/* Central Hub */}
        <div className=" text-white text-center">
          <h2 className="text-2xl font-bold">TechHub</h2>
          <p className="text-[10px] opacity-70 text-black">Student Brilliance</p>
        </div>

        {/* Orbiting Icons */}
        {icons.map((icon, index) => (
          <img
            key={index}
            src={`/assets/${icon.src}`}
            alt="tech icon"
            className="galaxy-icon"
            style={{
              '--radius': `${icon.r}px`,
              '--duration': `${icon.speed}s`,
              animationDelay: `-${index * 1.5}s`, // Offsets positions so they aren't bunched up
            } as any}
          />
        ))}

        {/* Optional: Visual Rings */}
        <div className="absolute border border-white/10 rounded-full w-[120px] h-[120px]" />
        <div className="absolute border border-white/10 rounded-full w-[200px] h-[200px]" />
        <div className="absolute border border-white/10 rounded-full w-[280px] h-[280px]" />
      </div>
    </div>
  );
}