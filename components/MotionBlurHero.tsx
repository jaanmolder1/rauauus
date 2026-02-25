"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import * as THREE from "three";

// ── GLSL ─────────────────────────────────────────────────────────────────────

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Motion-blur transition: sample both textures 16× along the direction
// vector, blending between them. Blur peaks at progress = 0.5.
const FRAG = /* glsl */ `
  precision mediump float;

  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform float     uProgress;
  uniform vec2      uDirection;
  uniform float     uFromAspect;
  uniform float     uToAspect;
  uniform float     uCanvasAspect;

  varying vec2 vUv;

  // Remap UVs so the texture "covers" the canvas (like CSS object-fit:cover).
  vec2 coverUv(vec2 uv, float imgAspect) {
    float r = uCanvasAspect / imgAspect;
    if (r >= 1.0) {
      // Canvas wider than image — crop top/bottom
      return vec2(uv.x, 0.5 + (uv.y - 0.5) / r);
    } else {
      // Canvas taller than image — crop left/right
      return vec2(0.5 + (uv.x - 0.5) * r, uv.y);
    }
  }

  void main() {
    float progress = smoothstep(0.0, 1.0, uProgress);
    // Blur envelope: zero at start/end, peaks in the middle
    float blur = 0.075 * sin(uProgress * 3.14159265);

    vec4 color = vec4(0.0);

    for (int i = 0; i < 16; i++) {
      float t    = float(i) / 15.0 - 0.5;
      vec2  offs = uDirection * blur * t;

      vec2 uv1 = clamp(coverUv(vUv + offs, uFromAspect), 0.001, 0.999);
      vec2 uv2 = clamp(coverUv(vUv - offs, uToAspect),   0.001, 0.999);

      color += mix(texture2D(uFrom, uv1), texture2D(uTo, uv2), progress);
    }

    gl_FragColor = color / 16.0;
  }
`;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface Props {
  slides: HeroSlide[];
  autoPlayMs?: number;
  ctaLabel?: string;
  ctaHref?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function MotionBlurHero({ slides, autoPlayMs = 5000, ctaLabel, ctaHref }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isReady,     setIsReady]     = useState(false);

  // Refs for Three.js objects — mutations here must NOT cause re-renders
  const rendererRef    = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef    = useRef<THREE.ShaderMaterial | null>(null);
  const texturesRef    = useRef<THREE.Texture[]>([]);
  const rafRef         = useRef<number>(0);
  const activeRef      = useRef(0);      // mirrors activeSlide for closures
  const transitionRef  = useRef(false);

  // ── WebGL init ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    rendererRef.current = renderer;

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Load all slide textures, then build the shader mesh
    const loader = new THREE.TextureLoader();
    Promise.all(slides.map(s => loader.loadAsync(s.image))).then(textures => {
      textures.forEach(t => {
        t.minFilter    = THREE.LinearFilter;
        t.magFilter    = THREE.LinearFilter;
        t.generateMipmaps = false;
      });
      texturesRef.current = textures;

      const aspect = (t: THREE.Texture) =>
        (t.image as HTMLImageElement).width / (t.image as HTMLImageElement).height;

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uFrom:         { value: textures[0] },
          uTo:           { value: textures[1 % textures.length] },
          uProgress:     { value: 0.0 },
          uDirection:    { value: new THREE.Vector2(1.0, 0.0) },
          uFromAspect:   { value: aspect(textures[0]) },
          uToAspect:     { value: aspect(textures[1 % textures.length]) },
          uCanvasAspect: { value: w / h },
        },
        vertexShader:   VERT,
        fragmentShader: FRAG,
        depthTest:  false,
        depthWrite: false,
      });
      materialRef.current = material;

      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

      // Render loop
      const tick = () => {
        rafRef.current = requestAnimationFrame(tick);
        renderer.render(scene, camera);
      };
      tick();

      setIsReady(true);
    });

    // Resize handler
    const onResize = () => {
      const container = containerRef.current;
      if (!container || !materialRef.current) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      materialRef.current.uniforms.uCanvasAspect.value = w / h;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      window.removeEventListener("resize", onResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Go-to slide ─────────────────────────────────────────────────────────────
  const goTo = useCallback((nextIdx: number) => {
    if (
      transitionRef.current ||
      !materialRef.current  ||
      texturesRef.current.length < 2 ||
      nextIdx === activeRef.current
    ) return;

    transitionRef.current = true;

    const mat      = materialRef.current;
    const textures = texturesRef.current;
    const aspect   = (t: THREE.Texture) =>
      (t.image as HTMLImageElement).width / (t.image as HTMLImageElement).height;

    mat.uniforms.uTo.value      = textures[nextIdx];
    mat.uniforms.uToAspect.value = aspect(textures[nextIdx]);

    // Horizontal only — direction based on which way we're going
    const forward = nextIdx > activeRef.current ||
      (activeRef.current === slides.length - 1 && nextIdx === 0);
    mat.uniforms.uDirection.value.set(forward ? 1.0 : -1.0, 0.0);
    mat.uniforms.uProgress.value = 0;

    const DURATION = 1400; // ms
    const start    = performance.now();

    // Cubic ease-in-out
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (now: number) => {
      const raw = Math.min((now - start) / DURATION, 1);
      mat.uniforms.uProgress.value = ease(raw);

      if (raw < 1) {
        requestAnimationFrame(animate);
      } else {
        // Transition complete — swap "from" texture
        mat.uniforms.uFrom.value      = textures[nextIdx];
        mat.uniforms.uFromAspect.value = aspect(textures[nextIdx]);
        mat.uniforms.uProgress.value  = 0;
        activeRef.current             = nextIdx;
        transitionRef.current         = false;
        setActiveSlide(nextIdx);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // ── Auto-play ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;
    const id = setInterval(() => {
      goTo((activeRef.current + 1) % slides.length);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [isReady, autoPlayMs, slides.length, goTo]);

  // ── Render ───────────────────────────────────────────────────────────────────
  const slide = slides[0];

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-stone-950"
    >
      {/* WebGL canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-stone-950/30 pointer-events-none" />

      {/* Text + persistent CTA — shared column so CTA sits right below text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        {/*
          Fixed-height container: text is anchored to the bottom of this box.
          This means the CTA never shifts even when title length varies between slides.
        */}
        <div
          className={`flex flex-col items-center justify-end text-center max-w-4xl w-full transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ height: "22rem" }}
        >
          <p className="label-eyebrow mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
            {slide.eyebrow}
          </p>
          <h1
            className="font-serif font-light text-stone-50 leading-[1.08] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p
              className="font-sans font-light text-stone-300 leading-relaxed max-w-xl mx-auto"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}
            >
              {slide.subtitle}
            </p>
          )}
        </div>

        {/* Persistent CTA — always at a fixed distance below the text box */}
        {ctaLabel && ctaHref && (
          <div className="mt-10">
            <Link
              href={ctaHref}
              className="inline-block font-sans text-xs tracking-widest uppercase text-stone-950 bg-stone-100/80 hover:bg-stone-100 px-8 py-4 rounded transition-all duration-400"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>

      {/* Scroll indicator — outside the fading div, always visible */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-5 h-8 rounded-full border border-stone-100/40 flex justify-center pt-1.5">
          <div
            className="w-0.5 h-1.5 rounded-full bg-stone-100/70"
            style={{ animation: "scrollWheel 1.6s ease-in-out infinite" }}
          />
        </div>
        <style>{`
          @keyframes scrollWheel {
            0%   { transform: translateY(0);   opacity: 1; }
            60%  { transform: translateY(6px); opacity: 0; }
            61%  { transform: translateY(0);   opacity: 0; }
            100% { transform: translateY(0);   opacity: 1; }
          }
        `}</style>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => goTo((activeRef.current - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-stone-100/30 text-stone-100/70 hover:border-stone-100 hover:text-stone-100 transition-all duration-300"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 3L5 8l5 5" />
        </svg>
      </button>
      <button
        onClick={() => goTo((activeRef.current + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-stone-100/30 text-stone-100/70 hover:border-stone-100 hover:text-stone-100 transition-all duration-300"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 3l5 5-5 5" />
        </svg>
      </button>

      {/* Slide indicator dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-px transition-all duration-500 ${
              i === activeSlide
                ? "w-10 bg-stone-100"
                : "w-4 bg-stone-100/40 hover:bg-stone-100/70"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
