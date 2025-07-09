import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LandingShap() {
  const [yellowGlowIndex, setYellowGlowIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setYellowGlowIndex(Math.floor(Math.random() * 6));
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const getGlowColor = (index: number) => {
    if (index === yellowGlowIndex) {
      return [
        "0 0 5px rgba(255, 255, 0, 0.3)",
        "0 0 5px rgba(255, 255, 0, 0.6)",
        "0 0 5px rgba(255, 255, 0, 0.3)",
      ];
    }
    return [
      "0 0 5px rgba(255,255,255,0.1)",
      "0 0 5px rgba(255,255,255,0.3)",
      "0 0 5px rgba(255,255,255,0.1)",
    ];
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-4 justify-center items-center w-full max-w-sm sm:max-w-md lg:max-w-lg">
      <div className="flex w-full h-24 sm:h-32 lg:h-40">
        <div className="border-2 flex-1 border-t-0 border-r-0 flex justify-center items-center text-4xl sm:text-6xl lg:text-9xl text-muted-foreground/10">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              textShadow: getGlowColor(3),
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            4
          </motion.div>
        </div>
        <div className="border-2 flex-1 border-t-0 border-r-0 flex justify-center items-center text-4xl sm:text-6xl lg:text-9xl text-muted-foreground/10">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              textShadow: getGlowColor(4),
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5,
            }}
          >
            5
          </motion.div>
        </div>
        <div className="border-2 flex-1 border-t-0 flex justify-center items-center text-4xl sm:text-6xl lg:text-9xl text-muted-foreground/10">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              textShadow: getGlowColor(5),
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          >
            6
          </motion.div>
        </div>
      </div>

      <div className="flex w-full h-24 sm:h-32 lg:h-40">
        <div className="border-2 flex-1 border-b-0 border-r-0 flex justify-center items-center text-4xl sm:text-6xl lg:text-9xl text-muted-foreground/10">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              textShadow: getGlowColor(2),
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            3
          </motion.div>
        </div>
        <div className="border-2 flex-1 border-b-0 border-r-0 flex justify-center items-center text-4xl sm:text-6xl lg:text-9xl text-muted-foreground/10">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              textShadow: getGlowColor(1),
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            2
          </motion.div>
        </div>
        <div className="border-2 flex-1 border-b-0 flex justify-center items-center text-4xl sm:text-6xl lg:text-9xl text-muted-foreground/10">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              textShadow: getGlowColor(0),
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0,
            }}
          >
            1
          </motion.div>
        </div>
      </div>
    </div>
  );
}
