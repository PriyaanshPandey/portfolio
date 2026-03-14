/**
 * Timeline.jsx
 *
 * INSTALL DEPS FIRST:
 *   npm install gsap @studio-freight/lenis
 *
 * Then in your App.jsx just do:
 *   import { TimelineDemo } from "./components/Timeline";
 *   ...
 *   <TimelineDemo />
 */
import nagrikImg from "./Nagrik.png";
import dishaImg  from "./disha.png";
import kadamImg  from "./kadam.png";
import kaamImg   from "./kaam.png";
import React, { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  useMotionValue,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   PARALLAX HERO  — GSAP + Lenis layered scroll effect
══════════════════════════════════════════════════════ */
function ParallaxHero() {
  const wrapRef      = useRef(null);
  const lenisRef     = useRef(null);

  useEffect(() => {
    /* Lenis smooth scroll ── only scoped to window */
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    /* Parallax timeline */
    const trigger = wrapRef.current?.querySelector("[data-parallax-layers]");
    if (trigger) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 30 },
        { layer: "4", yPercent: 10 },
      ].forEach(({ layer, yPercent }, idx) => {
        tl.to(
          trigger.querySelectorAll(`[data-parallax-layer="${layer}"]`),
          { yPercent, ease: "none" },
          idx === 0 ? undefined : "<"
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
      gsap.ticker.remove((t) => lenis.raf(t * 1000));
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#060606",
      }}
    >
      {/* ── Layer stack ── */}
      <div
        data-parallax-layers
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* BG gradient layer 1 */}
        <div
          data-parallax-layer="1"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(245,166,35,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Big background project image — layer 2 */}
        <img
          data-parallax-layer="2"
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1800&q=80"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "115%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.18,
            filter: "grayscale(60%)",
          }}
        />

        {/* ── Centre text — layer 3 ── */}
        <div
          data-parallax-layer="3"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* Eyebrow */}
          <div style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "8px",
            color: "#F5A623",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}>
            <div style={{ width: "30px", height: "1px", background: "#F5A623" }} />
            SELECTED WORK
            <div style={{ width: "30px", height: "1px", background: "#F5A623" }} />
          </div>

          {/* Giant heading */}
          <h1 style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(5rem, 12vw, 12rem)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-3px",
            lineHeight: 0.88,
            margin: 0,
            textAlign: "center",
          }}>
            MY{" "}
            <span style={{
              color: "transparent",
              WebkitTextStroke: "2px #F5A623",
            }}>
              PROJECTS
            </span>
          </h1>

          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "17px",
            color: "rgba(255,255,255,0.4)",
            marginTop: "28px",
            letterSpacing: "1px",
          }}>
            Things I've built that I'm proud of
          </p>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ marginTop: "60px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
          >
            <div style={{
              width: "1px",
              height: "50px",
              background: "linear-gradient(to bottom, #F5A623, transparent)",
            }} />
            <div style={{
              fontFamily: "Oswald",
              fontSize: "10px",
              letterSpacing: "4px",
              color: "rgba(255,255,255,0.3)",
            }}>
              SCROLL
            </div>
          </motion.div>
        </div>

        {/* Foreground vignette — layer 4 */}
        <div
          data-parallax-layer="4"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, #060606 0%, transparent 25%, transparent 75%, #0a0a0a 100%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      </div>

      {/* Bottom fade into cards section */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "120px",
        background: "linear-gradient(to bottom, transparent, #0a0a0a)",
        zIndex: 20,
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TECH TAG
══════════════════════════════════════════════════════ */
function TechTag({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "Oswald, sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "2.5px",
        color: hov ? "#F5A623" : "rgba(255,255,255,0.55)",
        padding: "8px 18px",
        border: `1px solid ${hov ? "rgba(245,166,35,0.45)" : "rgba(255,255,255,0.08)"}`,
        background: hov ? "rgba(245,166,35,0.06)" : "rgba(255,255,255,0.03)",
        transition: "all 0.22s ease",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECT CARD — image + 3D tilt + glow
══════════════════════════════════════════════════════ */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const rotX    = useMotionValue(0);
  const rotY    = useMotionValue(0);
  const glowX   = useMotionValue(50);
  const glowY   = useMotionValue(50);
  const sRotX   = useSpring(rotX, { stiffness: 170, damping: 18 });
  const sRotY   = useSpring(rotY, { stiffness: 170, damping: 18 });
  const [imgHov, setImgHov] = useState(false);

  function onMove(e) {
    const r  = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    rotY.set(dx * 13);
    rotX.set(-dy * 8);
    glowX.set(((e.clientX - r.left) / r.width)  * 100);
    glowY.set(((e.clientY - r.top)  / r.height) * 100);
  }

  function onLeave() {
    rotX.set(0); rotY.set(0);
    glowX.set(50); glowY.set(50);
  }

  const isEven  = index % 2 === 0;
  const itemRef = useRef(null);
  const { scrollYProgress: sp } = useScroll({
    target: itemRef,
    offset: ["start 92%", "start 20%"],
  });
  const opacity = useTransform(sp, [0, 1], [0, 1]);
  const xSlide  = useTransform(sp, [0, 1], [isEven ? -90 : 90, 0]);
  const ySlide  = useTransform(sp, [0, 1], [50, 0]);

  return (
    <motion.div ref={itemRef} style={{ opacity, x: xSlide, y: ySlide }}>
      <div style={{
        display: "flex",
        flexDirection: isEven ? "row" : "row-reverse",
        alignItems: "center",
        gap: "48px",
        padding: "0 80px",
      }}>

        {/* ── Year column ── */}
        <div style={{
          flexShrink: 0,
          width: "155px",
          display: "flex",
          flexDirection: "column",
          alignItems: isEven ? "flex-end" : "flex-start",
        }}>
          <div style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "76px",
            fontWeight: 900,
            color: "transparent",
            WebkitTextStroke: "2px rgba(245,166,35,0.28)",
            letterSpacing: "-4px",
            lineHeight: 1,
            userSelect: "none",
          }}>
            {project.year}
          </div>
          <div style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            color: "#F5A623",
            letterSpacing: "4px",
            marginTop: "8px",
            textAlign: isEven ? "right" : "left",
          }}>
            {project.category}
          </div>
        </div>

        {/* ── Dot ── */}
        <div style={{ flexShrink: 0, zIndex: 2 }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.1 }}
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#F5A623",
              boxShadow: "0 0 0 6px rgba(245,166,35,0.10), 0 0 28px rgba(245,166,35,0.65)",
            }}
          />
        </div>

        {/* ── 3D Card ── */}
        <motion.div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            flex: 1,
            rotateX: sRotX,
            rotateY: sRotY,
            transformPerspective: "1000px",
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.012, transition: { duration: 0.3 } }}
        >
          <div style={{
            background: "linear-gradient(145deg, #161616 0%, #121212 55%, #0e0e0e 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "2px",
            overflow: "hidden",
            boxShadow: "0 60px 120px rgba(0,0,0,0.75), 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            position: "relative",
          }}>

            {/* Mouse glow */}
            <motion.div style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 5,
              background: useTransform(
                [glowX, glowY],
                ([x, y]) => `radial-gradient(600px circle at ${x}% ${y}%, rgba(245,166,35,0.07) 0%, transparent 60%)`
              ),
            }} />

            {/* Left amber border */}
            <div style={{
              position: "absolute",
              left: 0, top: 0, bottom: 0,
              width: "3px",
              background: "linear-gradient(180deg, #F5A623 0%, rgba(245,166,35,0.08) 100%)",
              zIndex: 10,
            }} />

            {/* ── Project Image ── */}
            <div
              style={{
                width: "100%",
                height: "280px",
                overflow: "hidden",
                position: "relative",
              }}
              onMouseEnter={() => setImgHov(true)}
              onMouseLeave={() => setImgHov(false)}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  transform: imgHov ? "scale(1.06)" : "scale(1.0)",
                  transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                  filter: "brightness(0.75) saturate(0.8)",
                  display: "block",
                }}
              />

              {/* Image overlay gradient */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 40%, #161616 100%)",
              }} />

              {/* Category badge on image */}
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "#F5A623",
                color: "#111",
                fontFamily: "Oswald, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "3px",
                padding: "6px 14px",
              }}>
                {project.category}
              </div>
            </div>

            {/* ── Card body ── */}
            <div style={{ padding: "40px 48px 44px" }}>

              {/* Corner brackets */}
              <div style={{ position: "absolute", top: "20px", right: "20px", width: "22px", height: "22px", borderTop: "1.5px solid rgba(245,166,35,0.2)", borderRight: "1.5px solid rgba(245,166,35,0.2)" }} />
              <div style={{ position: "absolute", bottom: "20px", right: "20px", width: "22px", height: "22px", borderBottom: "1.5px solid rgba(245,166,35,0.3)", borderRight: "1.5px solid rgba(245,166,35,0.3)" }} />

              {/* Index */}
              <div style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "5px",
                color: "#F5A623",
                marginBottom: "18px",
              }}>
                {String(index + 1).padStart(2, "0")} / PROJECT
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "3px",
                lineHeight: 0.93,
                margin: "0 0 18px 0",
                transform: "translateZ(20px)",
              }}>
                {project.title}
              </h2>

              {/* Amber rule */}
              <div style={{ width: "48px", height: "2px", background: "#F5A623", marginBottom: "22px" }} />

              {/* Description — larger */}
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "17px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.58)",
                lineHeight: 1.85,
                margin: "0 0 32px 0",
                maxWidth: "520px",
                letterSpacing: "0.2px",
              }}>
                {project.description}
              </p>

              {/* Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "36px" }}>
                {project.stack.map((t) => <TechTag key={t} label={t} />)}
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                {project.live && <PrimaryBtn href={project.live} label="LIVE DEMO ↗" />}
                {project.github && <GhostLink href={project.github} label="GITHUB →" />}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

function PrimaryBtn({ href, label }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "Oswald, sans-serif", fontSize: "12px", fontWeight: 700,
        letterSpacing: "3px", textDecoration: "none", padding: "13px 32px",
        background: hov ? "#ffffff" : "#F5A623", color: "#111",
        transition: "all 0.2s ease", display: "inline-block",
        boxShadow: hov ? "0 0 32px rgba(245,166,35,0.35)" : "none",
      }}
    >
      {label}
    </a>
  );
}

function GhostLink({ href, label }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "Oswald, sans-serif", fontSize: "12px", fontWeight: 700,
        letterSpacing: "3px", textDecoration: "none",
        color: hov ? "#F5A623" : "rgba(255,255,255,0.4)",
        borderBottom: `1px solid ${hov ? "#F5A623" : "rgba(255,255,255,0.18)"}`,
        paddingBottom: "2px", transition: "all 0.2s ease",
      }}
    >
      {label}
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════════════════ */
export const Timeline = ({ data }) => {
  const ref          = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 5%", "end 80%"],
  });
  const lineH  = useTransform(scrollYProgress, [0, 1], [0, height]);
  const lineOp = useTransform(scrollYProgress, [0, 0.03], [0, 1]);

  return (
    <div ref={containerRef} style={{ width: "100%", background: "#0a0a0a", position: "relative" }}>

      {/* Cards section */}
      <div
        ref={ref}
        style={{
          position: "relative",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "80px 0 180px",
        }}
      >
        {/* Centre timeline line */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: 0,
          height: `${height}px`,
          width: "1px",
          background: "rgba(255,255,255,0.05)",
          transform: "translateX(-50%)",
        }}>
          <motion.div style={{
            height: lineH,
            opacity: lineOp,
            width: "1px",
            background: "linear-gradient(180deg, #F5A623 0%, rgba(245,166,35,0.06) 100%)",
            boxShadow: "0 0 10px rgba(245,166,35,0.5)",
          }} />
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "160px" }}>
          {data.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   DEFAULT PROJECT DATA  — swap for your real projects
══════════════════════════════════════════════════════ */
const defaultProjects = [
  {
    title: "NAGRIK RAKSHAK",
    year: "2025",
    category: "AI-ML",
    description:
      "AI powered complaint registering and management system . ",
    stack: ["Flask", "Firebase", "HTML", "CSS","Python"],
    image: nagrikImg,
    live: "https://niyatijain912.github.io/Nagrik-Raskshak1",
    github: "https://github.com/PriyaanshPandey/Nagrik-Raskshak",
  },
  {
    title: "DISHA AI",
    year: "2025",
    category: "AI-ML",
    description:
      "AI driven career prediction with roadmaps",
    stack: ["JavaScript", "Python", "Nodejs", "CSS", "HTML"],
    image: dishaImg,
    live: "https://career-role-predictor-ai-frontend.vercel.app/",
    github: "https://github.com/PriyaanshPandey/career-role-predictor-ai",
  },
  {
    title: "KadamCLASH",
    year: "2025",
    category: "FULLSTACK",
    description:
      "Turning Fitness to Interactive Real World Game",
    stack: ["Node.js", "Leaflet", "Html", "CSS", "MongoDB", "ExpressJs"],
    image: kadamImg,
    live: "https://kadam-clash.vercel.app/",
    github: "https://github.com/PriyaanshPandey/KadamClash",
  },
  {
    title: "KaamKRO",
    year: "2025",
    category: "FRONTEND",
    description:
      "React Based Todolist maker app ",
    stack: ["React", "Node.js", "MongoDB" ],
    image: kaamImg,
    live: "https://kaam-kro.vercel.app/",
    github: "https://github.com/PriyaanshPandey/KaamKro",
  },
];

/* ═══════════════════════════════════════════════════
   EXPORT — drop <TimelineDemo /> in your App.jsx
══════════════════════════════════════════════════════ */
export function TimelineDemo() {
  return (
    <div style={{ width: "100%", background: "#0a0a0a" }}>
      <ParallaxHero />
      <Timeline data={defaultProjects} />
    </div>
  );
}