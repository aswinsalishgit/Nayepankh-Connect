"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage("Account created! You can now sign in.");
        setIsSignUp(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full text-accent shadow-inner">
            <Heart size={32} className="text-nayepankh-orange" />
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-500 text-center mb-8 font-medium">
          {isSignUp ? "Join our volunteer movement today." : "Sign in to continue your volunteer journey."}
        </p>
        
        <form onSubmit={handleAuth} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm text-center">
              {message}
            </div>
          )}
          
          <input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 text-gray-800"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 text-gray-800"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setMessage(null);
              }}
              className="ml-2 text-primary font-bold hover:underline focus:outline-none"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
