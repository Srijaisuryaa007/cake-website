"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES_PER_SEQ = 240;

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cocoaImages, setCocoaImages] = useState<HTMLImageElement[]>([]);
  const [cakeImages, setCakeImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();

  // Preload images
  useEffect(() => {
    let loadedCocoaCount = 0;
    let loadedCakeCount = 0;
    const loadedCocoa: HTMLImageElement[] = [];
    const loadedCake: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES_PER_SEQ; i++) {
      const frameNum = i.toString().padStart(3, "0");
      
      const imgCocoa = new Image();
      imgCocoa.src = `/frames-cocoa/ezgif-frame-${frameNum}.jpg`;
      imgCocoa.onload = () => {
        loadedCocoaCount++;
        if (loadedCocoaCount === TOTAL_FRAMES_PER_SEQ) {
          setCocoaImages(loadedCocoa);
          // Initial render if this loads first
          if (canvasRef.current && scrollYProgress.get() < 0.5) {
            renderFrame(canvasRef.current, loadedCocoa[0]);
          }
        }
      };
      loadedCocoa.push(imgCocoa);

      const imgCake = new Image();
      imgCake.src = `/frames-cake/ezgif-frame-${frameNum}.jpg`;
      imgCake.onload = () => {
        loadedCakeCount++;
        if (loadedCakeCount === TOTAL_FRAMES_PER_SEQ) {
          setCakeImages(loadedCake);
        }
      };
      loadedCake.push(imgCake);
    }
  }, [scrollYProgress]);

  // Render a specific frame on the canvas with optional alpha for crossfading
  const renderFrame = (canvas: HTMLCanvasElement, img1: HTMLImageElement, img2?: HTMLImageElement, alpha: number = 0) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fill deep charcoal to match the image background
    ctx.fillStyle = "#080705";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawImageScaled = (img: HTMLImageElement, opacity: number) => {
      if (!img.complete || img.naturalHeight === 0) return;
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.globalAlpha = opacity;
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.globalAlpha = 1.0;
    };

    // Draw base image
    drawImageScaled(img1, 1);
    
    // Draw crossfade image if provided
    if (img2 && alpha > 0) {
      drawImageScaled(img2, alpha);
    }
  };

  const updateCanvas = (latest: number) => {
    if (!canvasRef.current) return;
    if (cocoaImages.length === 0 || cakeImages.length === 0) return;

    // First half of scroll (0 to 0.5): Cocoa Sequence
    // Second half of scroll (0.5 to 1.0): Cake Sequence
    // Crossfade area between 0.45 and 0.55
    
    requestAnimationFrame(() => {
      let activeImg1: HTMLImageElement;
      let activeImg2: HTMLImageElement | undefined = undefined;
      let crossfadeAlpha = 0;

      if (latest < 0.45) {
        // Pure Cocoa Sequence
        const progress = latest / 0.45;
        const pIndex = Math.floor(progress * (TOTAL_FRAMES_PER_SEQ - 1));
        activeImg1 = cocoaImages[pIndex];
      } else if (latest >= 0.45 && latest <= 0.55) {
        // Crossfade Phase (Cocoa Last Frame -> Cake First Frame)
        activeImg1 = cocoaImages[TOTAL_FRAMES_PER_SEQ - 1];
        activeImg2 = cakeImages[0];
        crossfadeAlpha = (latest - 0.45) / 0.10; // 0 to 1
      } else {
        // Pure Cake Sequence
        const progress = (latest - 0.55) / 0.45;
        let pIndex = Math.floor(progress * (TOTAL_FRAMES_PER_SEQ - 1));
        pIndex = Math.max(0, Math.min(pIndex, TOTAL_FRAMES_PER_SEQ - 1));
        activeImg1 = cakeImages[pIndex];
      }

      if (activeImg1 && canvasRef.current) {
        renderFrame(canvasRef.current, activeImg1, activeImg2, crossfadeAlpha);
      }
    });
  };

  useMotionValueEvent(scrollYProgress, "change", updateCanvas);

  useEffect(() => {
    const handleResize = () => updateCanvas(scrollYProgress.get());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cocoaImages, cakeImages, scrollYProgress]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-background">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
