import React from "react";

export default function Header() {
  return (
    <>
      <section className="w-full flex items-center  header bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 h-17 relative">
        <div className="flex items-center">
          <img src="../assets/logoBG.png" alt="logo" className="h-20 w-20" />
          <h1 className="text-4xl font-bold font-sans tracking-wide ml-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400">
            Neuro
          </h1>
        </div>
        {/* Animated silver gradient border */}
        <div className="absolute left-0 bottom-0 w-full h-0.5 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-[length:200%_200%] animate-[gradient-x_3s_ease-in-out_infinite]" />
        </div>
      </section>
      <style>
        {`
                @keyframes gradient-x {
                    0% {
                        background-position: 0% 50%;
                    }
                    100% {
                        background-position: 100% 50%;
                    }
                }
            `}
      </style>
    </>
  );
}
