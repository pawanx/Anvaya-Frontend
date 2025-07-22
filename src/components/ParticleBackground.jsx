import { useCallback } from "react";
import { Particles } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 50 },
          color: { value: "#3498db" },
          size: { value: 6, random: true },
          opacity: { value: 0.6 },
          move: { enable: true, speed: 1 },
        },
        background: {
          color: { value: "transparent" }, // Important!
        },
      }}
    />
  );
};

export default ParticleBackground;
