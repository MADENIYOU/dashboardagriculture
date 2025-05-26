// @ts-nocheck
"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import CarteSenegal from "@/components/carteSenegal";
import ExploreCarte from '@/components/ExploreCarte';
import CultureDisplay from '@/components/CultureDisplay';
import Card from '@/components/post';


export default function Home() {

  const [category, setCategory] = useState("All");
  return (
    <main className="flex flex-col items-center justify-start h-full w-full bg-gray-200 overflow-auto">
      <style jsx>{`
        .scrollbar-transparent::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-transparent::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-transparent::-webkit-scrollbar-thumb {
          background: transparent;
          border-radius: 4px;
        }

        /* Optionnel : rendre la scrollbar visible au survol */
        .scrollbar-transparent:hover::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
        }

        .scrollbar-transparent:hover::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
      `}</style>
      <div className="flex w-full justify-center mt-10 px-4">
        <div
          className="w-full max-w-[1200px] h-[80vh] overflow-auto border-gray-300 rounded-lg shadow-lg bg-gray-400 scrollbar-transparent"
          style={{
          }}
        >
          <CarteSenegal />
        </div>
      </div>
      <br></br>
      <motion.section 
        className="flex flex-col md:flex-row w-full px-4 gap-6"
        style={{
          backgroundImage: "url('/images/5689adead0c40fd36a62bcf90a4773dd.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <motion.div className="md:w-2/3 w-full ml-0 mr-auto">
          <ExploreCarte category={category} setCategory={setCategory} />
          <CultureDisplay category={category} setCategory={setCategory} />
        </motion.div>
        
        <motion.div className="md:w-1/3 w-full ml-0 mr-auto mt-0 pt-0 flex flex-col">
          <div className="h-auto md:h-[535px] flex items-center mb-4 justify-center">
            <motion.h1 className="text-xl sm:text-2xl text-[#222] font-bold mb-4 text-center">
              Quelques forums publics
            </motion.h1>
          </div>
          
          <div className="space-y-4">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
