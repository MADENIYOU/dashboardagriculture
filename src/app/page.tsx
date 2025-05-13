// Home.tsx
"use client";

import { motion } from "framer-motion";
import CarteSenegal from "@/components/carteSenegal";
import ChatAgricole from "@/components/ChatAgricole";
import Card from "@/components/monCard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start h-full w-full bg-gray-100 overflow-auto">
      {/* Zone haute avec CarteSenegal et ChatAgricole */}
      <div className="flex w-full max-w-[1800px] h-[90vh] mb-8">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex h-screen justify-end"
        >
          <CarteSenegal />
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-l border-gray-300 bg-white ml-4 mt-3.5"
        >
          <ChatAgricole />
        </motion.div>
      </div>

      {/* Nouvelle section en bas, hors du grid */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <section className="w-full max-w-[1800px] px-4 mb-12">
        <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-2xl font-bold text-[#654321] mb-6 text-center"
          >
            Petites infos
          </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card  />
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
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card />
          </motion.div>
        </div>
      </section>
    </main>
  );
}