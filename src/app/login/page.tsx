import { Heart } from "lucide-react";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full text-accent shadow-inner">
            <Heart size={32} className="text-nayepankh-orange" />
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8 font-medium">Sign in to continue your volunteer journey.</p>
        
        {/* Placeholder Login Form */}
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email address" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 text-gray-800"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 text-gray-800"
          />
          <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
