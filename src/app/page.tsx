// @ts-nocheck
"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import CarteSenegal from "@/components/carteSenegal";
import ExploreCarte from '@/components/ExploreCarte';
import CultureDisplay from '@/components/CultureDisplay';


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
      <div className="flex w-full justify-center mt-10">
        <div
          className="w-full max-w-[1200px] h-[80vh] overflow-auto border-gray-300 rounded-lg shadow-lg bg-gray-400 scrollbar-transparent"
          style={{
            scrollbarWidth: 'auto', // Firefox
            scrollbarColor: 'transparent transparent', // Firefox
            msOverflowStyle: 'none', // IE 11
          }}
        >
          <CarteSenegal />
        </div>
      </div>
      <br></br>
      <motion.div className='w-2/3 ml-0 mr-auto'>
        <ExploreCarte category={category} setCategory={setCategory}/>
        <CultureDisplay category={category} setCategory={setCategory}/>
      </motion.div>
    </main>
  );
}
