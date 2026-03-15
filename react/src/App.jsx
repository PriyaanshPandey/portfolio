import React, { useState, useRef, useEffect, useMemo } from "react";
import "./index.css";
import { SpecialText } from "./components/SpecialText";
import heroimage from "./assets/hero.png";
import heroleft from "./assets/heroleft.png";
import splash from "./assets/yellowslash.png";
import { InfiniteSlider } from "./components/InfiniteSlider";
import m from "./assets/m.png";
import e from "./assets/e.png";
import r from "./assets/r.png";
import n from "./assets/n.png";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Home, User, Briefcase, FileText } from "lucide-react";

import { Timeline, TimelineDemo } from "./components/Timeline";
import { ContactSection } from "./components/Contact";
import jsImg     from "./assets/js.png";
import cssImg    from "./assets/css.png";
import gitImg    from "./assets/git.png";
import githubImg from "./assets/github.png";
import tsImg     from "./assets/typesc.webp";
import pythonImg from "./assets/python.png";
import figmaImg  from "./assets/figma.png";
import reduxImg  from "./assets/redux.png";
import { AnimatedThemeToggler } from "./components/AnimatedThemeToggler";
import resumePdf from "./assets/resume.pdf";





const MERN_CARDS = [
  { key:"M", label:"MongoDB",  sub:"Database", color:"#00ED64", img: m, desc:"NoSQL · Document Store · Atlas" },
  { key:"E", label:"Express",  sub:"Backend",  color:"#F5A623", img: e, desc:"REST API · Middleware · Routing" },
  { key:"R", label:"React",    sub:"Frontend", color:"#61DAFB", img: r, desc:"Components · Hooks · Vite" },
  { key:"N", label:"Node.js",  sub:"Runtime",  color:"#8CC84B", img: n, desc:"V8 Engine · NPM · Streams" },
];

const ARC_R     = 280;
const ARC_START = 205;
const ARC_END   = 335;
const ARC_SPEED = 50;

function arcDeg2rad(d) { return (d * Math.PI) / 180; }
function arcPolar(deg, r = ARC_R) {
  return { x: r * Math.cos(arcDeg2rad(deg)), y: r * Math.sin(arcDeg2rad(deg)) };
}
const ARC_CARD_ANGLES = MERN_CARDS.map(
  (_, i) => ARC_START + ((ARC_END - ARC_START) / (MERN_CARDS.length - 1)) * i
);
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
    );}
function NavBar({ items }) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  
  function smoothScrollTo(targetY, duration = 1200) {
    const startY = window.scrollY;
    const diff   = targetY - startY;
    let startTime = null;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  
  function getScrollTarget(name) {
    switch (name) {
      case "Home": {
        return 0; 
      }
      case "Skills": {
       
        const pin = document.getElementById("home");
        return pin ? pin.offsetTop + pin.scrollHeight * 0.62 : 0;
      }
      case "Projects": {
        const el = document.getElementById("projects");
        return el ? el.offsetTop - 80 : 0;
      }
      case "Contact": {
        const el = document.getElementById("contact");
        return el ? el.offsetTop - 80 : 0;
      }
      default:
        return 0;
    }
  }

 function handleClick(e, item) {
  e.preventDefault();

  if (item.download) {
    const a = document.createElement("a");
    a.href = item.url;
    a.download = "Priyaansh_Pandey_Resume.pdf";
    a.click();
    return;
  }

  setActiveTab(item.name);
  smoothScrollTo(getScrollTarget(item.name), 1400);
}

 
  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const pin     = document.getElementById("home");
      const projects = document.getElementById("projects");
      const contact  = document.getElementById("contact");

      if (!pin || !projects || !contact) return;

      const skillsStart   = pin.offsetTop + pin.scrollHeight * 0.5;
      const projectsStart = projects.offsetTop - 200;
      const contactStart  = contact.offsetTop - 200;

      if (scrollY >= contactStart)  { setActiveTab("Contact");  return; }
      if (scrollY >= projectsStart) { setActiveTab("Projects"); return; }
      if (scrollY >= skillsStart)   { setActiveTab("Skills");   return; }
      setActiveTab("Home");
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[999]  ">
      <div className="flex items-center justify-between bg-black/90 border border-white/10 backdrop-blur-lg py-3 px-10 rounded-full shadow-2xl">

      
        <span style={{
          fontFamily: "Oswald", fontSize: "25px", fontWeight: 700,
          color: "#F5A623", letterSpacing: "0.05em", cursor: "pointer",
        }}
          onClick={() => smoothScrollTo(0, 1000)}
        >
          PORTFOLIO
        </span>

        
        <div className="flex items-center gap-2">
          {items.map((item) => {
            const Icon    = item.icon;
            const isActive = activeTab === item.name;
            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => handleClick(e, item)}
                className={`relative cursor-pointer px-8 py-2 rounded-full transition-all duration-300 ${
                  isActive ? "text-black" : "text-white/70 hover:text-white"
                }`}
                style={{ fontFamily: "Oswald", fontSize: "20px", fontWeight: 600, letterSpacing: "0.08em" }}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden"><Icon size={18} strokeWidth={2.5} /></span>

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
<AnimatedThemeToggler /> 
       
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("Contact");
            smoothScrollTo(getScrollTarget("Contact"), 1400);
          }}
          style={{
            fontFamily: "Oswald", fontSize: "15px", fontWeight: 600,
            color: "#111", backgroundColor: "#F5A623",
            padding: "8px 24px", borderRadius: "999px",
            letterSpacing: "0.05em", textDecoration: "none", cursor: "pointer",
          }}
        >
          HIRE ME
        </a>

      </div>
    </div>
  );
}
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
function App() {

  const sliderImagesTop = [
  { title: "JavaScript",    src: jsImg },
  { title: "CSS",    src: cssImg },
  { title: "Git",      src: gitImg }, 
  { title: "Github",    src: githubImg },
  { title: "TypeScript", src: tsImg },
  { title: "Python",        src: pythonImg },
  { title: "Github1",    src: githubImg },
  { title: "Git1",      src: gitImg },
   { title: "CSS1",    src: cssImg },
   { title: "JavaScript1",    src: jsImg },
  { title: "CSS2",    src: cssImg },
];

const sliderImagesBottom = [
  { title: "Figma", src: figmaImg },
  { title: "Python",        src: pythonImg },
  { title: "Redux",        src: reduxImg },
  { title: "Github",    src: githubImg },
  { title: "Git",      src: gitImg },
   { title: "CSS",    src: cssImg },
   { title: "JavaScript",    src: jsImg },
  { title: "CSS1",    src: cssImg },
  { title: "Git1",      src: gitImg }, 
  { title: "Github1",    src: githubImg },
  { title: "TypeScript", src: tsImg },
  { title: "Python2",        src: pythonImg },
   
  
];
 
const [arcAngle, setArcAngle]   = useState(ARC_START);
const [arcActive, setArcActive] = useState(0);
const arcDirRef  = useRef(1);
const arcLastRef = useRef(null);
const arcRafRef  = useRef(null);

useEffect(() => {
  function tick(now) {
    if (!arcLastRef.current) arcLastRef.current = now;
    const dt = Math.min((now - arcLastRef.current) / 1000, 0.05);
    arcLastRef.current = now;
    setArcAngle(prev => {
      let next = prev + arcDirRef.current * ARC_SPEED * dt;
      if (next >= ARC_END)   { next = ARC_END;   arcDirRef.current = -1; }
      if (next <= ARC_START) { next = ARC_START;  arcDirRef.current =  1; }
      let ci = 0, minD = Infinity;
      ARC_CARD_ANGLES.forEach((a, i) => { const d = Math.abs(a - next); if (d < minD) { minD = d; ci = i; } });
      setArcActive(ci);
      return next;
    });
    arcRafRef.current = requestAnimationFrame(tick);
  }
  arcRafRef.current = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(arcRafRef.current);
}, []);
  const pinWrapperRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: pinWrapperRef,
  offset: ["start start", "end end"],
});

const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

const initialTextOpacity = useTransform(smooth, [0, 0.3], [1, 0]);
const heroOpacity        = useTransform(smooth, [0.2, 0.55], [1, 0]);
const heroX              = useTransform(smooth, [0, 0.5], ["0%", "125%"]);
const splashX        = useTransform(smooth, [0.12, 0.62], ["-50%", "15%"]);
const splashOpacity  = useTransform(smooth, [0.28, 0.50], [1, 0]);
const leftOpacity        = useTransform(smooth, [0.2, 0.55], [0, 1]);
const leftX              = useTransform(smooth, [0.25, 0.9], ["140%", "5%"]);
const newTextOpacity     = useTransform(smooth, [0.4, 0.75], [0, 1]);
const newTextX           = useTransform(smooth, [0.4, 0.75], [-60, 0]);
const odometerOpacity = useTransform(smooth, [0.55, 0.7], [0, 1]);
const odometerY = useTransform(smooth, [0.55, 0.7], [80, 0]);

  const navItems = [
    { name: "Home", url: "#home", icon: Home },
    { name: "Skills", url: "#skills", icon: User },
    { name: "Projects", url: "#projects", icon: Briefcase },
    { name: "Resume", url: resumePdf, icon: FileText },
  ];
 

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
    const arcCards = [
  { ...MERN_CARDS[0], img: m },
  { ...MERN_CARDS[1], img: e },
  { ...MERN_CARDS[2], img: r },
  { ...MERN_CARDS[3], img: "./src/assets/n.png" },
];

    
  
  return (
    <>
    <div id="home" ref={pinWrapperRef} style={{ height: "300vh", position: "relative" }}>
      <div className="bg-[#F8FAFC] w-screen relative  hero-sticky" style={{ 
  position: "sticky", top: 0, height: "100vh", overflow: "hidden",
  transition: "background-color 0.6s ease",   
}}>
      <NavBar items={navItems} />
      <motion.div style={{ opacity: initialTextOpacity, pointerEvents: "none" }}>
      <div className="absolute top-[200px] left-[515px] -translate-x-1/2 z-20 select-none cursor-pointer">
        <ShutterText
          text="HEY"
          style={{
            fontFamily: "Oswald",
            fontSize: "clamp(140px, 9vw, 150px)",
            fontWeight: 800,
            animation: "breathe 2s ease-in-out infinite",
          }}
        />  
      </div></motion.div>
      <motion.div style={{ opacity: initialTextOpacity, pointerEvents: "none" }}>
      <div
        className="absolute top-[200px]  left-[1025px] -translate-x-1/2 font-extrabold leading-none z-20 select-none whitespace-nowrap"
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
      </div></motion.div>

      
      <motion.img
  src={splash}
  className="splash-img"
  style={{
    position: "absolute",
    left: "49%",
    x: splashX,
    opacity: splashOpacity,
    top: "5%",
    height: "110%",
    rotate: 90,
    zIndex: 1,
  }}
/>
     <motion.img
  src={heroimage}
  style={{
    position: "absolute",
    left: "48%",
    x: heroX,
    translateX: "-50%",
    top: "-15%",
    height: "110%",
    objectFit: "contain",
    objectPosition: "top center",
    zIndex: 10,
    opacity: heroOpacity,
  }}
/>
<motion.img
  src={heroleft}
  style={{
    position: "absolute",
    right: 0,
    x: leftX,
    bottom: 0,
    height: "90%",
    top:"8%",
    objectFit: "contain",
    objectPosition: "bottom right",
    zIndex: 10,
    opacity: leftOpacity,
  }}
/>
      <div className="absolute left-[3%] z-20" style={{ top: "42%" }}>
        <motion.div style={{ opacity: initialTextOpacity, pointerEvents: "none" }}>
        <h1
          className="absolute top-[100px] w-2xl left-[205px] leading-none cursor-pointer"
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
              fontSize: "clamp(58px, 7.5vw, 120px)",
              fontWeight: 800,
            },
            0.05,
          )}
        </h1></motion.div>

        <motion.div style={{ opacity: initialTextOpacity, pointerEvents: "none" }}>
        <p className="absolute top-[260px] left-[140px] text-red-600 font-bold leading-tight mt-1 cursor-pointer">
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
                fontSize: "clamp(60px, 1.5vw, 60px)",
                fontWeight: 800,
                color: "#dc2626",
              },
              0.002,
            )}
          </ShimmerSpan>
        </p></motion.div>

        <motion.div style={{ opacity: initialTextOpacity, pointerEvents: "none" }}>
        <p className="absolute top-[320px] left-[260px] font-bold leading-tight mt-1 cursor-pointer">
          <ShimmerSpan
            style={{
              fontFamily: "Inter",
              fontSize: "clamp(60px, 1.5vw, 60px)",
              fontWeight: 800,
              color: "#dc2626",
            }}
          >
            {renderText(
              "PANDEY",
              {
                fontFamily: "Inter",
                fontSize: "clamp(60px, 1.5vw, 60px)",
                fontWeight: 800,
                color: "#dc2626",
              },
              0.002,
            )}
          </ShimmerSpan>
        </p></motion.div>
      </div>

      <div
        className="absolute right-[3%] z-20 text-right"
        style={{ top: "42%" }}
      >

        <motion.div style={{ opacity: initialTextOpacity, pointerEvents: "none" }}>
        <div className="absolute top-[100px] w-2xl right-[-35px] cursor-pointer">
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
                "|FULLSTACK",
                {
                  fontFamily: "Oswald",
                  fontSize: "clamp(50px, 7.5vw, 100px)",
                  fontWeight: 800,
                },
                0.05,
              )}
            </h1>
          </ShimmerSpan>
        </div></motion.div>


        <motion.div style={{ opacity: initialTextOpacity, pointerEvents: "none" }}>
        <p
          className="font-medium text-right mt-1 absolute right-[450px] top-[275px] cursor-pointer"
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
              fontSize: "clamp(60px, 7.5vw, 60px)",
              fontWeight: 800,
            },
            0.002,
          )}
        </p></motion.div>

        <motion.div style={{ opacity: initialTextOpacity, pointerEvents: "none" }}>
        <p
          className="font-medium text-right mt-1 absolute right-[225px] top-[320px] cursor-pointer"
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
              fontSize: "clamp(60px, 7.5vw, 60px)",
              fontWeight: 800,
            },
            0.002,
            "revealDown",
          )}
        </p> </motion.div>
      </div>
       <motion.div style={{ opacity: initialTextOpacity, pointerEvents: "none" }}>
      <p
        className="absolute bottom-[12px] w-9xl left-1/2  -translate-x-1/2 text-gray-800 whitespace-nowrap cursor-pointer z-20"
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
            fontSize: "clamp(40px, 7.5vw, 40px)",
            fontWeight: 800,
          },
          0.002,
          "revealDown",
        )}
      </p></motion.div>

   
<motion.div 

style={{
  opacity: odometerOpacity,
  y: odometerY,
  pointerEvents: "auto",
  zIndex: 999,
}}
>
  
     {(() => {
      
const ODOMETER_X = "20%";   
const ODOMETER_Y = "-240px"; 

const CENTER_X = 550;
const CENTER_Y = 250;
const scaleX = 1100 / 840;
const scaleY = 650 / 840;



const CX = 0, CY = 0;
const OUTER = 380;
const INNER = 260;

const DEG_START = 190;
const DEG_END = 350;

function pt(deg, r) {
  const rad = (deg * Math.PI) / 180;
  return [r * Math.cos(rad), r * Math.sin(rad)];
}

function arc(r, s, e) {
  const [sx, sy] = pt(s, r);
  const [ex, ey] = pt(e, r);
  const large = e - s > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

function thick(r1, r2, s, e) {
  const [o1x,o1y] = pt(s,r1)
  const [o2x,o2y] = pt(e,r1)
  const [i1x,i1y] = pt(s,r2)
  const [i2x,i2y] = pt(e,r2)
  const large = e-s>180?1:0

  return `
  M ${o1x} ${o1y}
  A ${r1} ${r1} 0 ${large} 1 ${o2x} ${o2y}
  L ${i2x} ${i2y}
  A ${r2} ${r2} 0 ${large} 0 ${i1x} ${i1y}
  Z`
}

const segCount = MERN_CARDS.length

const SEG_SIZE = (DEG_END - DEG_START) / segCount

const CARD_ANGLES = MERN_CARDS.map((_, i) =>
  DEG_START + SEG_SIZE * i + SEG_SIZE / 2
)

const needleProgress = (arcAngle - ARC_START) / (ARC_END - ARC_START);
const needleDeg = DEG_START + needleProgress*(DEG_END-DEG_START)

const [ntx,nty] = pt(needleDeg, OUTER-10)
const [nbx,nby] = pt(needleDeg+180,50)
const [nl1x,nl1y] = pt(needleDeg+90,7)
const [nl2x,nl2y] = pt(needleDeg-90,7)

return (

<motion.div
style={{
position:"relative",
left:ODOMETER_X,
bottom:ODOMETER_Y,
transform:"translateX(-50%)",
width:"1100px",
height:"650px",
pointerEvents:"auto"
}}
>

<svg
viewBox="-420 -420 840 840"
width="1100"
height="650"
style={{
position:"absolute",
left:"0",
top:"0"
}}
>

<defs>


<radialGradient id="glass">
<stop offset="0%" stopColor="#ffffff"/>
<stop offset="100%" stopColor="#eaeaea"/>
</radialGradient>


<linearGradient id="sweep" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#ffffff00"/>
<stop offset="50%" stopColor="#ffffffaa"/>
<stop offset="100%" stopColor="#ffffff00"/>
<animateTransform
attributeName="gradientTransform"
type="rotate"
from="0"
to="360"
dur="1s"
repeatCount="indefinite"
/>
</linearGradient>


<filter id="neon">
<feGaussianBlur stdDeviation="6"/>
</filter>


<filter id="shadow">
<feDropShadow dx="0" dy="10" stdDeviation="12" floodOpacity="0.25"/>
</filter>

</defs>


<path
d={thick(OUTER,INNER,DEG_START,DEG_END)}
fill="url(#glass)"
filter="url(#shadow)"
/>


{MERN_CARDS.map((card,i)=>{

const s = DEG_START + ((DEG_END-DEG_START)/segCount)*i
const e = DEG_START + ((DEG_END-DEG_START)/segCount)*(i+1)

const active = arcActive===i

return(

<g key={i}>

<path
d={thick(OUTER-2,INNER+2,s+1,e-1)}
fill={card.color}
opacity={active?0.7:0.25}
style={{transition:"all .4s"}}
/>

{active && (
<path
d={thick(OUTER-2,INNER+2,s+1,e-1)}
fill={card.color}
opacity=".5"
filter="url(#neon)"
/>
)}

</g>

)

})}

{["Mongo","Express","React","Node"].map((letter,i)=>{

const s = DEG_START + ((DEG_END-DEG_START)/segCount)*i
const e = DEG_START + ((DEG_END-DEG_START)/segCount)*(i+1)

const pathId = `mernArc${i}`

return(

<g key={i}>


<path
id={pathId}
d={arc((OUTER+INNER)/2 , s+3 , e-3)}
fill="none"
/>

<text
fontSize="42"
fontWeight="800"
fill="#222"
letterSpacing="6"
>

<textPath
href={`#${pathId}`}
startOffset="50%"
textAnchor="middle"
>

{letter}

</textPath>

</text>

</g>

)

})}


<path
d={arc(OUTER-6,DEG_START,DEG_END)}
stroke="url(#sweep)"
strokeWidth="12"
strokeLinecap="round"
fill="none"
/>


<path
d={arc(OUTER,DEG_START,DEG_END)}
stroke="#cfcfcf"
strokeWidth="3"
fill="none"
/>


{Array.from({ length: segCount + 1 }, (_, i) => {
  const deg = DEG_START + SEG_SIZE * i;
  const [a1, a2] = pt(deg, INNER + 2);
  const [b1, b2] = pt(deg, OUTER - 2);
  return (
    <line
      key={i}
      x1={a1} y1={a2}
      x2={b1} y2={b2}
      stroke="rgba(255,255,255,0.6)"
      strokeWidth={2}
    />
  );
})}


<g>

<polygon
points={`${ntx},${nty} ${nl1x},${nl1y} ${nbx},${nby} ${nl2x},${nl2y}`}
fill="#ff9d00"
filter="url(#neon)"
/>

<circle cx="0" cy="0" r="20" fill="#111"/>
<circle cx="0" cy="0" r="10" fill="#ff9d00"/>

</g>

</svg>



{MERN_CARDS.map((card,i)=>{

const deg = CARD_ANGLES[i]
const active = arcActive===i
const CARD_SIZE = active ? 200 : 180
const CIRCLE_R = OUTER -90
const [x,y] = pt(deg, CIRCLE_R)



return(

<div
key={i}
style={{
position:"absolute",
left:`${CENTER_X + x}px`,
top:`${CENTER_Y + y}px`,
transform:"translate(-50%,-50%)",
zIndex:active?20:10
}}
>

<div
style={{
width:active?150:140,
height:active?150:140,
borderRadius:"50%",
background:"rgba(255,255,255,.85)",
border:`2px solid ${card.color}`,
boxShadow:active
?`0 0 25px ${card.color},0 10px 20px rgba(0,0,0,.2)`
:"0 5px 15px rgba(0,0,0,.1)",
display:"flex",
alignItems:"center",
justifyContent:"center",
backdropFilter:"blur(10px)",
transition:"all .45s"
}}
>

<img
src={card.img}
style={{
width:"auto",
height:"auto",
filter:active?`drop-shadow(0 0 10px ${card.color})`:"grayscale(.6)"
}}
/>

</div>

</div>

)

})}

</motion.div>

)

})()}</motion.div>

<motion.div  className="skillset-heading" style={{
  opacity: useTransform(smooth, [0.82, 1], [0, 1]),
  y: useTransform(smooth, [0.82, 1], [30, 0]),
  position: "absolute",
  left: "500px",
  top: "80px",
  zIndex: 30,
}}>
  <h1  style={{
    fontFamily: "Oswald, sans-serif",
    fontSize: "clamp(2rem, 5vw, 4.5rem)",
    fontWeight: 900,
    color: "var(--text-main)",
    letterSpacing: "4px",
  }}>
    My SkillSet
  </h1>
</motion.div>

<motion.section id="skills" className="skills-section" style={{
  width: "100%",
  background: "#F8FAFC",
  padding: "60px 0 30px",
   marginTop: "-100px",
   marginLeft:"50px",
   opacity: useTransform(smooth, [0.85, 1], [0, 1]),
    y: useTransform(smooth, [0.85, 1], [60, 0]),
   
  overflow: "hidden",
}}>
  

 
  <div  style={{ width: "68%", marginLeft: "0px", overflow: "hidden" }}>
  <InfiniteSlider gap={5} duration={40} durationOnHover={100}>
    {sliderImagesTop.map((img) => (
      <div key={img.title} className="slider-icon-card" style={{
        width: 100, height: 100, borderRadius: 20, overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
         backgroundColor: "var(--bg-card)",  
         transition: "background-color 0.5s",
        border: "1px solid rgba(0,0,0,0.06)",
        flexShrink: 0,
      }}>
        <img
          src={img.src}
          alt={img.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    ))}
  </InfiniteSlider>

  <div style={{ height: 20 }} /></div>

  
  <div style={{ width: "68%", marginLeft: "0px", overflow: "hidden" }}>
  <InfiniteSlider gap={5} duration={40} durationOnHover={100} reverse>
    {sliderImagesBottom.map((img) => (
      <div key={img.title} style={{
        width: 100, height: 100, borderRadius: 20, overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
        flexShrink: 0,
      }}>
        <img
          src={img.src}
          alt={img.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    ))}
  </InfiniteSlider>
  </div>
  
</motion.section>

   </div>
    </div>
 
  
      <div id="projects">
      <TimelineDemo />
    </div>
   <ContactSection />
    
    </>
  );
  
}

export default App; 
    
