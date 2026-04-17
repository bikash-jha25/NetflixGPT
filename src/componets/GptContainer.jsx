import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggetion from "./GptMovieSuggetion";
import LightRays from "./LightRays";

const GptContainer = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      <div className="absolute inset-0 w-full h-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="w-full h-full"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>
      <div className="relative z-10 pt-32 px-4">
        <GptSearchBar />
        <GptMovieSuggetion />
      </div>
    </div>
  );
};

export default GptContainer;
