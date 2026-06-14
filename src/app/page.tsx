import Image from "next/image";
import { Heart, Users, Calendar, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Image 
            src="/Nayepankh Connect Logo.png" 
            alt="Nayepankh Connect" 
            width={40} 
            height={40} 
            className="object-contain rounded-full"
          />
          <span className="text-xl font-bold text-primary">Nayepankh Connect</span>
        </div>
        <nav className="hidden md:flex gap-6 font-medium text-gray-600">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#initiatives" className="hover:text-primary transition-colors">Initiatives</a>
          <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
        </nav>
        <button className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-sm">
          Login
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-accent font-medium text-sm">
              <Heart size={16} />
              <span>Join the Movement</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Compassion in <span className="text-primary">Action</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Nayepankh Connect is our dedicated platform for volunteers. Register, discover community events, and help us bring hope to those who need it most.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg flex items-center gap-2">
                Become a Volunteer
                <ArrowRight size={18} />
              </button>
              <button className="bg-white border-2 border-secondary text-secondary px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-sm">
                Explore Events
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-square bg-green-50 rounded-full absolute -top-12 -right-12 w-[120%] z-0 blur-3xl opacity-50"></div>
            <div className="relative z-10 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col gap-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                <div className="bg-blue-100 p-3 rounded-2xl text-secondary">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">10,000+ Volunteers</h3>
                  <p className="text-sm text-gray-500">Across the country</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                <div className="bg-orange-100 p-3 rounded-2xl text-accent">
                  <Heart size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">500+ Lives Touched</h3>
                  <p className="text-sm text-gray-500">Every single month</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-2xl text-primary">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Weekly Drives</h3>
                  <p className="text-sm text-gray-500">Join our upcoming events</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 text-center text-gray-500 text-sm border-t border-gray-100">
        <p>© {new Date().getFullYear()} Nayepankh Foundation. All rights reserved.</p>
        <p className="mt-2">Made with love and compassion.</p>
      </footer>
    </div>
  );
}
