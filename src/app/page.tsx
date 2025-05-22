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
      {/* Zone haute avec CarteSenegal et ChatAgricole */}
      <div className="flex w-full justify-center mt-10">
        <div className="w-full max-w-[1200px] h-[80vh] overflow-auto border-gray-300 rounded-lg shadow-lg bg-gray-200">
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
