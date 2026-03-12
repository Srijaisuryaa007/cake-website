"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function StorySections() {
  const { scrollYProgress } = useScroll();

  // Scroll ranges (0 to 1) according to the brief
  // Beat 1: 0 - 0.15
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.15], [1, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.12, 0.15], ["0%", "-50%"]);

  // Beat 2: 0.15 - 0.40
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.20, 0.35, 0.40], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.15, 0.20, 0.35, 0.40], ["50%", "0%", "0%", "-50%"]);

  // Beat 3: 0.40 - 0.65
  const opacity3 = useTransform(scrollYProgress, [0.40, 0.45, 0.60, 0.65], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.40, 0.45, 0.60, 0.65], ["50%", "0%", "0%", "-50%"]);

  // Beat 4: 0.65 - 0.85
  const opacity4 = useTransform(scrollYProgress, [0.65, 0.70, 0.80, 0.85], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.65, 0.70, 0.80, 0.85], ["50%", "0%", "0%", "-50%"]);

  // Beat 5: 0.85 - 1.00
  const opacity5 = useTransform(scrollYProgress, [0.85, 0.90, 1], [0, 1, 1]);
  const y5 = useTransform(scrollYProgress, [0.85, 0.90], ["50%", "0%"]);

  return (
    <div className="fixed inset-0 pointer-events-none flex flex-col justify-center items-center z-10 p-6 md:p-24 overflow-hidden">
      
      {/* Beat 1: 0-15% Hero */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center px-4"
      >
        <div className="absolute inset-0 bg-gradient-radial-hero opacity-30 -z-10 blur-3xl scale-150 rounded-full" />
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-text-gold pb-2 drop-shadow-lg">
          Mitu&apos;s Cake Story
        </h1>
        <p className="mt-4 font-serif text-2xl md:text-3xl text-cream font-medium italic">
          Every slice tells a story.
        </p>
        <p className="mt-6 text-sm md:text-base text-cream-muted max-w-lg tracking-wider font-light">
          Handcrafted artisan cakes, re-imagined for a world that deserves better.
        </p>
      </motion.div>

      {/* Beat 2: 15-40% Craftsmanship Reveal */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 flex flex-col max-w-md text-left"
      >
        <div className="absolute -inset-24 bg-background-secondary rounded-full opacity-20 blur-3xl -z-10" />
        <h2 className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-text-gold tracking-tight leading-tight">
          Precision-crafted for perfection.
        </h2>
        <div className="mt-8 space-y-6 text-base md:text-lg text-cream-muted font-light leading-relaxed">
          <p>
            Premium Belgian chocolate, Madagascan vanilla bean, and fresh cream cheese — every ingredient chosen for one reason alone: <span className="text-cream italic font-serif text-xl">taste</span>.
          </p>
          <p>
            Every layer is baked to order. Never pre-made. Never rushed. Only when we know it is exactly right.
          </p>
        </div>
      </motion.div>

      {/* Beat 3: 40-65% Ingredients & Process */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 flex flex-col max-w-sm md:max-w-md text-right items-end"
      >
        <div className="absolute -inset-24 bg-background-secondary rounded-full opacity-20 blur-3xl -z-10" />
        <h2 className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-text-gold tracking-tight leading-tight">
          Made to order, approved with care.
        </h2>
        <ul className="mt-8 space-y-4 text-base md:text-lg text-cream-muted font-light flex flex-col items-end text-right">
          <li className="flex items-center gap-3">
            <span>Every order personally reviewed by our baker.</span>
            <span className="text-gold-antique">✦</span>
          </li>
          <li className="flex items-center gap-3">
            <span>We approve or respond within 24 hours — always.</span>
            <span className="text-gold-antique">✦</span>
          </li>
          <li className="flex items-center gap-3">
            <span>No bots. No templates. No compromises.</span>
            <span className="text-gold-antique">✦</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="italic text-cream font-serif text-xl">If we cannot do your vision justice, we will tell you honestly.</span>
          </li>
        </ul>
      </motion.div>

      {/* Beat 4: 65-85% Decoration & Artistry */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="absolute inset-x-0 md:inset-x-auto md:left-24 bottom-24 flex flex-col max-w-lg text-center md:text-left px-6 md:px-0"
      >
        <div className="absolute -inset-48 bg-background-secondary rounded-full opacity-30 blur-[100px] -z-10" />
        <h2 className="font-serif text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-text-gold tracking-tight leading-tight">
          Where flavour meets artistry.
        </h2>
        <div className="mt-6 space-y-4 text-sm md:text-base text-cream-muted font-light leading-relaxed">
          <p className="text-lg text-cream italic font-serif">Six signature flavours. Infinite custom possibilities.</p>
          <p className="tracking-wide">
            Red Velvet Dream / Dark Belgian Truffle / Vanilla Cloud / <br className="hidden md:block"/> Butterscotch Bliss / Midnight Truffle / Rose Gold Wedding
          </p>
          <p className="pt-4 border-t border-gold-antique/20">
            Every petal, drip, and pearl placed with the same care as the very first cake we ever made.
          </p>
        </div>
      </motion.div>

      {/* Beat 5: 85-100% Reassembly & CTA */}
      <motion.div
        style={{ opacity: opacity5, y: y5 }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center px-4 pointer-events-auto"
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm -z-10 w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-radial-hero opacity-80 -z-10 blur-[80px] scale-150 rounded-full" />
        
        <h2 className="font-serif text-5xl md:text-7xl tracking-tight text-transparent bg-clip-text bg-gradient-text-gold drop-shadow-lg mb-4">
          Taste everything.<br/>
          Forget the rest.
        </h2>
        
        <p className="font-serif text-xl md:text-3xl text-cream mt-6 mb-12 italic">
          Mitu&apos;s Cake Story. <br className="md:hidden"/> Designed for occasions. Crafted for memories.
        </p>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <button className="relative px-8 py-4 text-base font-semibold text-background bg-gradient-gold rounded-full hover:shadow-[0_0_30px_rgba(201,169,110,0.4)] transition-all duration-500 scale-100 hover:scale-105 active:scale-95 group overflow-hidden">
              <span className="relative z-10 transition-colors">Request Your Cake</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
            <button className="px-8 py-4 text-base font-medium text-cream border border-gold-antique/30 rounded-full hover:border-gold-antique hover:bg-gold-antique/10 transition-all duration-300">
              View Signature Collection
            </button>
          </div>
          <p className="text-xs text-cream-muted/70 tracking-widest uppercase font-sans">
            Handcrafted for birthdays, weddings, and everything in between.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
