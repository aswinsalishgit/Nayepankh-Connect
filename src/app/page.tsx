"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

export default function Splashscreen() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      // Simulate a gentle loading time for the splash screen
      await new Promise((resolve) => setTimeout(resolve, 2500));
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    };

    checkSession();
  }, [router, supabase.auth]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <Image
          src="/Nayepankh Connect Logo.png"
          alt="Nayepankh Connect"
          width={150}
          height={150}
          className="object-contain rounded-full shadow-xl mb-8 border-4 border-white"
        />
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl font-extrabold text-primary tracking-tight"
        >
          Nayepankh Connect
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-gray-500 mt-2 font-medium"
        >
          Compassion in Action
        </motion.p>
      </motion.div>
    </div>
  );
}
