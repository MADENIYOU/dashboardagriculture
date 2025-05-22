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
    <main className="flex flex-col items-center justify-start h-full w-full bg-gray-100 overflow-auto">
      {/* Zone haute avec CarteSenegal et ChatAgricole */}
      <div className="flex w-full max-w-[1800px] h-[90vh] mb-8">
        <motion.div
          className="flex h-screen justify-end"
        >
          <CarteSenegal />
        </motion.div>
      </div>
      <br></br>
      <motion.div className='w-2/3 left-0'>
        <ExploreCarte category={category} setCategory={setCategory}/>
        <CultureDisplay category={category} setCategory={setCategory}/>
      </motion.div>
    </main>
  );
}
