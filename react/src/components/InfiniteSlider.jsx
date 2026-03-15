import { useMotionValue, animate, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 10,
  durationOnHover,
  reverse = false,
  className,
}) {
  const [innerRef, { width }] = useMeasure();
  const x = useMotionValue(0);
  const ctrlRef = useRef(null);
  const durRef  = useRef(duration);

  function run(dur) {
    if (!width) return;
    
    const half = width / 2;
    const from = reverse ? -half : 0;
    const to   = reverse ? 0    : -half;

    ctrlRef.current?.stop();
    x.set(from);
    ctrlRef.current = animate(x, to, {
      ease: 'linear',
      duration: dur,
      repeat: Infinity,
      repeatType: 'loop',
      onRepeat: () => x.set(from),
    });
  }

  useEffect(() => {
    if (!width) return;
    run(durRef.current);
    return () => ctrlRef.current?.stop();
  }, [width]);

  const hover = durationOnHover ? {
    onHoverStart: () => { durRef.current = durationOnHover; run(durationOnHover); },
    onHoverEnd:   () => { durRef.current = duration;        run(duration); },
  } : {};

  return (
    <div style={{ overflow: 'hidden', width: '100%' }} className={className}>
      <motion.div
        ref={innerRef}
        style={{
          display: 'flex',
          width: 'max-content',
          gap: `${gap}px`,
          x,
        }}
        {...hover}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}