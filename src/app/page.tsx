// Home.tsx
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import CarteSenegal from "@/components/carteSenegal";
import ChatAgricole from "@/components/ChatAgricole";
import Card from "@/components/monCard";

const PrairieSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Utilise useTransform au lieu de .map
  const y = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <motion.section
      ref={ref}
      style={{
        backgroundImage: 'linear-gradient(to bottom, #b8f2e6, #a6dcef)',
        transform: y as any,
        transition: 'transform 0.1s ease-out',
        minHeight: '600px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
      className="w-full max-w-[1800px] px-4 mb-12 mx-auto"
    >
      {/* Ciel clair - effet de lumière douce */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 80%)',
          pointerEvents: 'none',
        }}
      ></div>

      {/* Nuages animés */}
      <div className="absolute top-10 left-0 w-full h-20 pointer-events-none">
        <motion.div
          animate={{ x: [0, '100%', 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-0 w-64 h-20 bg-white rounded-full opacity-80 shadow-md"
          style={{
            filter: 'blur(5px)',
          }}
        />
        <motion.div
          animate={{ x: [0, '-100%', 0] }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 left-[40%] w-48 h-16 bg-white rounded-full opacity-70 shadow-md"
          style={{
            filter: 'blur(5px)',
          }}
        />
      </div>

      {/* Herbes hautes et animation sway */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] z-10">
        <div
          className="absolute bottom-0 w-full h-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(76, 175, 80, 0.8) 0%, rgba(102, 191, 80, 0.5) 100%)',
            borderRadius: '50% 50% 0 0',
            boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.1)',
          }}
        ></div>
        <div
          className="absolute bottom-0 w-full h-[80%]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'><path fill=\'#556b2f\' d=\'M0 10C3 15 7 20 10 20C13 20 17 15 20 10L0 10Z\'/></svg>')",
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'bottom',
            height: '30px',
            opacity: 0.6,
            transform: 'translateY(50%)',
          }}
        ></div>
      </div>

      {/* Titre animé */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-3xl font-bold text-[#654321] mb-6 text-center relative z-20 pt-10"
      >
        Petites infos
      </motion.h2>

      {/* Cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20 pb-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card />
        </motion.div><motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card />
        </motion.div><motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start h-full w-full bg-gray-100 overflow-auto">
      {/* Zone haute avec CarteSenegal et ChatAgricole */}
      <div className="flex w-full max-w-[1800px] h-[90vh] mb-8">
        <motion.div
          className="flex h-screen justify-end"
        >
          <CarteSenegal />
        </motion.div>

        {/* <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-l border-gray-300 bg-white ml-4 mt-3.5"
        >
          <ChatAgricole />
        </motion.div> */}
      </div>
      <br></br>
      {/* <PrairieSection /> */}
    </main>
  );
}