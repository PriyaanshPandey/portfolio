import React, { useState, useRef, useEffect, useMemo } from "react";
import "./index.css";
import heroimage from "./assets/hero.png";
import splash from "./assets/yellowslash.png";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Home, User, Briefcase, FileText } from "lucide-react";

function NavBar({ items }) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-12 py-4">
      <div className="flex items-center justify-between bg-black/90 border border-white/10 backdrop-blur-lg py-3 px-10 rounded-full shadow-2xl">
        {/* Logo left */}
        <span
          style={{
            fontFamily: "Oswald",
            fontSize: "25px",
            fontWeight: 700,
            color: "#F5A623",
            letterSpacing: "0.05em",
          }}
        >
          PORTFOLIO
        </span>

        {/* Nav items center */}
        <div className="flex items-center gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <a
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={`relative cursor-pointer px-8 py-2 rounded-full transition-all duration-300 ${isActive ? "text-black" : "text-white/70 hover:text-white"}`}
                style={{
                  fontFamily: "Oswald",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                }}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-[#F5A623] rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#F5A623] rounded-t-full">
                      <div className="absolute w-16 h-8 bg-yellow-400/40 rounded-full blur-lg -top-3 -left-4" />
                      <div className="absolute w-10 h-6 bg-yellow-400/30 rounded-full blur-md -top-1" />
                    </div>
                  </motion.div>
                )}
              </a>
            );
          })}
        </div>

        {/* CTA right */}
        <a
          href="#"
          style={{
            fontFamily: "Oswald",
            fontSize: "15px",
            fontWeight: 600,
            color: "#111",
            backgroundColor: "#F5A623",
            padding: "8px 24px",
            borderRadius: "999px",
            letterSpacing: "0.05em",
          }}
        >
          HIRE ME
        </a>
      </div>
    </div>
  );
}

function App() {
  const navItems = [
    { name: "Home", url: "#", icon: Home },
    { name: "Skills", url: "#", icon: User },
    { name: "Projects", url: "#", icon: Briefcase },
    { name: "Resume", url: "#", icon: FileText },
  ];
  const ShimmerSpan = ({ children, style }) => (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <div style={{ display: "flex", ...style }}>{children}</div>
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
          backgroundSize: "50% 100%",
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
        }}
        initial={{ backgroundPositionX: "200%" }}
        animate={{ backgroundPositionX: ["-100%", "200%"] }}
        transition={{
          duration: 1.5,
          delay: 1.5,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "linear",
        }}
      />
    </div>
  );

  const renderText = (text, style, speed = 0.04, anim = "revealUp") =>
    text.split("").map((char, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          opacity: 0,
          animation: `${anim} 0.6s ease-in-out forwards`,
          animationDelay: `${speed * i}s`,
          whiteSpace: char === " " ? "pre" : "normal",
          ...style,
        }}
      >
        {char}
      </span>
    ));
  function ShutterText({ text, style, className = "" }) {
    const [count, setCount] = useState(0);
    const characters = text.split("");

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          className={`flex ${className}`}
          onClick={() => setCount((c) => c + 1)}
          style={{ cursor: "pointer" }}
        >
          {characters.map((char, i) => (
            <div key={i} className="relative overflow-hidden">
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: i * 0.04 + 0.3, duration: 1 }}
                style={{ ...style, display: "block", lineHeight: 1 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.04,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 text-yellow-400 pointer-events-none z-10"
                style={{
                  ...style,
                  display: "block",
                  lineHeight: 1,
                  clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
                }}
              >
                {char}
              </motion.span>

              <motion.span
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "-100%", opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.04 + 0.1,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 text-gray-400 pointer-events-none z-10"
                style={{
                  ...style,
                  display: "block",
                  lineHeight: 1,
                  clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                }}
              >
                {char}
              </motion.span>

              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.04 + 0.2,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 text-yellow-400 pointer-events-none z-10"
                style={{
                  ...style,
                  display: "block",
                  lineHeight: 1,
                  clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                }}
              >
                {char}
              </motion.span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    );
  }
  return (
    <div className="bg-[#F8FAFC] h-screen w-screen relative overflow-hidden">
      <NavBar items={navItems} />

      <div className="absolute top-[180px] left-[540px] -translate-x-1/2 z-20 select-none cursor-pointer">
        <ShutterText
          text="HEY"
          style={{
            fontFamily: "Oswald",
            fontSize: "clamp(140px, 9vw, 150px)",
            fontWeight: 800,
            animation: "breathe 2s ease-in-out infinite",
          }}
        />  
      </div>
      <div
        className="absolute top-[175px]  left-[1060px] -translate-x-1/2 font-extrabold leading-none z-20 select-none whitespace-nowrap"
        style={{ fontFamily: "Oswald", fontSize: "clamp(60px, 9vw, 120px)" }}
      >
        <ShutterText
          text="THERE"
          style={{
            fontFamily: "Oswald",
            fontSize: "clamp(140px, 9vw, 150px)",
            fontWeight: 800,
            animation: "breathe 2s ease-in-out infinite",
          }}
        />
      </div>

      <img
        src={splash}
        className="absolute left-1/2 -translate-x-1/2 rotate-90 z-0"
        style={{ top: "5%", height: "110%" }}
      />
      <img
        src={heroimage}
        className="absolute left-1/2  -translate-x-1/2 z-10 object-contain object-top"
        style={{ top: "-15%", height: "110%" }}
      />

      <div className="absolute left-[3%] z-20" style={{ top: "42%" }}>
        <h1
          className="absolute top-[150px] w-2xl left-[260px] leading-none cursor-pointer"
          style={{
            display: "flex",
            overflow: "hidden",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {renderText(
            "I AM|",
            {
              fontFamily: "Oswald",
              fontSize: "clamp(48px, 7.5vw, 105px)",
              fontWeight: 800,
            },
            0.05,
          )}
        </h1>

        <p className="absolute top-[260px] left-[280px] text-red-600 font-bold leading-tight mt-1 cursor-pointer">
          <ShimmerSpan
            style={{
              fontFamily: "Inter",
              fontSize: "clamp(40px, 1.5vw, 40px)",
              fontWeight: 800,
              color: "#dc2626",
            }}
          >
            {renderText(
              "PRIYAANSH",
              {
                fontFamily: "Inter",
                fontSize: "clamp(40px, 1.5vw, 40px)",
                fontWeight: 800,
                color: "#dc2626",
              },
              0.002,
            )}
          </ShimmerSpan>
        </p>

        <p className="absolute top-[290px] left-[350px] font-bold leading-tight mt-1 cursor-pointer">
          <ShimmerSpan
            style={{
              fontFamily: "Inter",
              fontSize: "clamp(40px, 1.5vw, 40px)",
              fontWeight: 800,
              color: "#dc2626",
            }}
          >
            {renderText(
              "PANDEY",
              {
                fontFamily: "Inter",
                fontSize: "clamp(40px, 1.5vw, 40px)",
                fontWeight: 800,
                color: "#dc2626",
              },
              0.002,
            )}
          </ShimmerSpan>
        </p>
      </div>

      <div
        className="absolute right-[3%] z-20 text-right"
        style={{ top: "42%" }}
      >
        <div className="absolute top-[140px] w-2xl right-[210px] cursor-pointer">
          <ShimmerSpan style={{ color: "#111" }}>
            <h1
              style={{
                display: "flex",
                overflow: "hidden",
                margin: 0,
                lineHeight: 1,
              }}
            >
              {renderText(
                "|MERN",
                {
                  fontFamily: "Oswald",
                  fontSize: "clamp(48px, 7.5vw, 105px)",
                  fontWeight: 800,
                },
                0.05,
              )}
            </h1>
          </ShimmerSpan>
        </div>

        <p
          className="font-medium text-right mt-1 absolute right-[459px] top-[250px] cursor-pointer"
          style={{
            display: "flex",
            overflow: "hidden",
            margin: 0,
            lineHeight: 1,
            animation: "float 2s ease-in-out infinite",
          }}
        >
          {renderText(
            " WEB",
            {
              fontFamily: "Oswald",
              fontSize: "clamp(30px, 7.5vw, 30px)",
              fontWeight: 800,
            },
            0.002,
          )}
        </p>

        <p
          className="font-medium text-right mt-1 absolute right-[360px] top-[280px] cursor-pointer"
          style={{
            display: "flex",
            overflow: "hidden",
            margin: 0,
            lineHeight: 1,
            animation: "float 2s ease-in-out infinite",
          }}
        >
          {renderText(
            " DEVELOPER",
            {
              fontFamily: "Oswald",
              fontSize: "clamp(30px, 7.5vw, 30px)",
              fontWeight: 800,
            },
            0.002,
            "revealDown",
          )}
        </p>
      </div>

      <p
        className="absolute bottom-[0px] w-2xl left-1/2  -translate-x-1/2 text-gray-800 whitespace-nowrap cursor-pointer z-20"
        style={{
          display: "flex",
          overflow: "hidden",
          margin: 0,
          lineHeight: 1,
          animation: "float 1s ease-in-out infinite",
        }}
      >
        {renderText(
          "Developing modern web experiences and designs",
          {
            fontFamily: "Oswald",
            fontSize: "clamp(30px, 7.5vw, 30px)",
            fontWeight: 800,
          },
          0.002,
          "revealDown",
        )}
      </p>
    </div>
  );
}

export default App;
