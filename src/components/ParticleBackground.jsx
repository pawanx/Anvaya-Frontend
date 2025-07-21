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
        background: {
          color: {
            value: "#f7f9fb", // fallback background
          },
        },
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#3498db",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.4,
            random: true,
          },
          size: {
            value: 4,
            random: true,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
