
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";


function LinkRow({ icon: Icon, value, href, delay = 2 }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 15,
        textDecoration: "none",
        padding: "26px 0",
        borderBottom: `1.5px solid ${hov ? "#F5A623" : "rgba(255,255,255,0.12)"}`,
        transition: "border-color 0.22s",
        cursor: "pointer",
      }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: "50%",
        background: hov ? "#F5A623" : "rgba(245,166,35,0.12)",
        border: `1.5px solid ${hov ? "#F5A623" : "rgba(245,166,35,0.3)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, transition: "all 0.22s",
      }}>
        <Icon size={25} color={hov ? "#111" : "#F5A623"} strokeWidth={2} />
      </div>
      <span style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 16, fontWeight: 600,
        color: hov ? "#F5A623" : "#fff",
        letterSpacing: "0.2px",
        transition: "color 0.22s",
        wordBreak: "break-all",
      }}>
        {value}
      </span>
    </motion.a>
  );
}

/* ═══════════════════════════════════════
   FORM FIELD
═══════════════════════════════════════ */
function Field({ label, type = "text", placeholder, multiline = false }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");

  const base = {
    width: "100%", boxSizing: "border-box",
    background: "#fff",
    border: `1.5px solid ${focused ? "#F5A623" : "rgba(0,0,0,0.12)"}`,
    borderRadius: 3,
    color: "#111", fontFamily: "Inter, sans-serif", fontSize: 14,
    padding: "12px 14px", outline: "none", resize: "none",
    boxShadow: focused ? "0 0 0 3px rgba(245,166,35,0.1)" : "0 1px 4px rgba(0,0,0,0.05)",
    transition: "all 0.22s ease",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
        color: focused ? "#F5A623" : "#444",
        transition: "color 0.2s",
      }}>
        {label} <span style={{ color: "#F5A623" }}>*</span>
      </label>
      {multiline
        ? <textarea rows={5} placeholder={placeholder} value={val}
            onChange={e => setVal(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ ...base, lineHeight: 1.7 }} />
        : <input type={type} placeholder={placeholder} value={val}
            onChange={e => setVal(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={base} />
      }
    </div>
  );
}

/* ═══════════════════════════════════════
   SEND BUTTON
═══════════════════════════════════════ */
function SendBtn() {
  const [state, setState] = useState("idle");
  const [hov, setHov] = useState(false);

  function click() {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => { setState("sent"); setTimeout(() => setState("idle"), 3000); }, 1400);
  }

  return (
    <motion.button
      type="button" onClick={click}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      whileTap={{ scale: 0.97 }}
      style={{
        padding: "14px 36px",
        background: state === "sent"
          ? "rgba(60,180,100,0.1)"
          : hov ? "#111" : "#F5A623",
        border: state === "sent" ? "1.5px solid rgba(60,180,100,0.4)" : "none",
        borderRadius: 3,
        color: state === "sent" ? "rgb(50,170,90)" : hov ? "#F5A623" : "#111",
        fontFamily: "Oswald, sans-serif", fontSize: 14, fontWeight: 700,
        letterSpacing: "3px", cursor: state === "loading" ? "wait" : "pointer",
        display: "inline-flex", alignItems: "center", gap: 9,
        boxShadow: hov && state === "idle"
          ? "0 8px 28px rgba(245,166,35,0.35)"
          : "0 4px 14px rgba(0,0,0,0.1)",
        transition: "all 0.22s ease",
        minWidth: 180, justifyContent: "center",
      }}
    >
      <AnimatePresence mode="wait">
        {state === "loading" && (
          <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <motion.div animate={{ rotate: 360 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
              style={{ width: 14, height: 14, border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%" }} />
            SENDING...
          </motion.span>
        )}
        {state === "sent" && (
          <motion.span key="s" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle2 size={15} /> MESSAGE SENT
          </motion.span>
        )}
        {state === "idle" && (
          <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Send size={14} /> SEND MESSAGE
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ═══════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════ */
export function ContactSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 90%", "start 15%"] });
  const op = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y  = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const links = [
    { icon: Mail,     value: "vishwagurubharat987654321@gmail.com", href: "mailto:vishwagurubharat987654321@gmail.com", delay: 0.05 },
    { icon: Phone,    value: "+91 94549 66563",            href: "tel:+919454966563",                delay: 0.12 },
    { icon: Github,   value: "github.com/PriyaanshPandey", href: "https://github.com/PriyaanshPandey", delay: 0.19 },
    { icon: Linkedin, value: "linkedin.com/in/PriyaanshPandey",  href: "https://www.linkedin.com/in/priyaansh-pandey-868804374/",  delay: 0.26 },
  ];

  return (
    <motion.section ref={sectionRef} style={{ opacity: op, y ,zIndex: "0",position:"relative"}} id="contact">

      {/* ── PAGE bg matches hero #F8FAFC ── */}
      <div style={{ width: "100%", background: "#F8FAFC", position: "relative" }}>

        {/* Top amber line */}
        <div style={{
          width: "100%", height: "2px",
          background: "linear-gradient(90deg, transparent, #F5A623 30%, #F5A623 70%, transparent)",
        }} />

        {/* ═══ MAIN CONTENT AREA ═══ */}
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "80px 60px 90px",
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: 64,
          alignItems: "start",
          position: "relative",
        }}>

          {/* ══════════════════════════
              LEFT DARK CARD
          ══════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "sticky", top: 120 }}
          >
            <div style={{
              background: "#111",
              borderRadius: 4,
              padding: "44px 36px 40px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.18), -6px 0 0 #F5A623",
              position: "relative",
              overflow: "hidden",
            }}>

              {/* Subtle amber glow top-right */}
              <div style={{
                position: "absolute", top: -40, right: -40,
                width: 180, height: 180, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              {/* Header */}
              <div style={{ marginBottom: 36 }}>
                <div style={{
                  fontFamily: "Oswald, sans-serif", fontSize: 10, fontWeight: 700,
                  letterSpacing: "5px", color: "#F5A623", marginBottom: 12,
                }}>
                  CONTACT INFO
                </div>
                <h2 style={{
                  fontFamily: "Oswald, sans-serif", fontSize: "1.9rem", fontWeight: 900,
                  color: "#fff", letterSpacing: "1px", margin: "0 0 10px",
                }}>
                  GET IN TOUCH
                </h2>
                <div style={{ width: 40, height: 2, background: "#F5A623" }} />
              </div>

              {/* Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {links.map(l => <LinkRow key={l.value} {...l} />)}
              </div>

              {/* Available badge */}
              <div style={{
                marginTop: 36,
                padding: "12px 16px",
                background: "rgba(80,200,120,0.07)",
                border: "1px solid rgba(80,200,120,0.25)",
                borderRadius: 3,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: 8, height: 8, borderRadius: "50%", background: "#50c878", flexShrink: 0 }}
                />
                <span style={{
                  fontFamily: "Oswald, sans-serif", fontSize: 10, fontWeight: 700,
                  letterSpacing: "3px", color: "rgba(70,190,110,0.9)",
                }}>
                  AVAILABLE FOR WORK
                </span>
              </div>

            </div>
          </motion.div>

          {/* ══════════════════════════
              RIGHT — HEADING + FORM
          ══════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >

            {/* Heading — exactly Jasscook style */}
            <div style={{ marginBottom: 44 }}>
              <h1 style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                fontWeight: 900,
                color: "#111",
                letterSpacing: "-0.5px",
                lineHeight: 1.05,
                margin: "0 0 14px",
              }}>
                I'd love to{" "}
                <span style={{ color: "#F5A623" }}>hear from you.</span>
              </h1>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: 16,
                color: "#666", lineHeight: 1.65, margin: 0, maxWidth: 560,
              }}>
                Leave a message below, and I'll get back to you as soon as possible.
              </p>
            </div>

            {/* Form card */}
            <div style={{
              background: "#fff",
              borderRadius: 4,
              padding: "40px 40px 44px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.06)",
              display: "flex", flexDirection: "column", gap: 22,
              position: "relative",
            }}>

              {/* Top amber accent */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg, #F5A623, rgba(245,166,35,0.3))",
                borderRadius: "4px 4px 0 0",
              }} />

              {/* Name + Email row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Field label="Name"  placeholder="First Last" />
                <Field label="Email" type="email" placeholder="name@email.com" />
              </div>

              {/* Message */}
              <Field label="Message" multiline placeholder="Write text here..." />

              {/* Send row */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", flexWrap: "wrap", gap: 12,
                paddingTop: 4,
              }}>
                <SendBtn />
                <span style={{
                  fontFamily: "Inter, sans-serif", fontSize: 12,
                  color: "#aaa", letterSpacing: "0.3px",
                }}>
                  I reply within 24 hours ✦
                </span>
              </div>

            </div>
          </motion.div>

        </div>{/* /grid */}

        {/* ═══ FOOTER ═══ */}
        <div style={{
          background: "#111",
          padding: "26px 60px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: 12,
            color: "white", letterSpacing: "0.5px",
          }}>
            Copyright © 2025 Priyaansh Pandey. All rights reserved.
          </span>

          <div style={{ display: "flex", gap: 20 ,color:"white"}}>
            {[
              { icon: Mail,     href: "mailto:vishwagurubharat987654321@gmail.com" },
              { icon: Github,   href: "https://github.com/PriyaanshPandey" },
              { icon: Linkedin, href: "https://linkedin.com/in/priyaansh-pandey-868804374" },
            ].map(({ icon: Icon, href }) => (
              <FooterIcon key={href} Icon={Icon} href={href} />
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}

function FooterIcon({ Icon, href }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 34, height: 34, borderRadius: "50%",
        background: hov ? "#F5A623" : "rgba(255,255,255,0.08)",
        border: `1px solid ${hov ? "#F5A623" : "rgba(255,255,255,0.12)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s", cursor: "pointer",
      }}>
      <Icon size={15} color={hov ? "#111" : "rgba(255,255,255,0.5)"} strokeWidth={2} />
    </a>
  );
}