import { Clock, CalendarDays, Award } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-12">
      {/* Greeting Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, <span className="text-primary">Volunteer!</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Ready to make a difference today?</p>
        </div>
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-accent font-bold text-xl shadow-inner border border-orange-200">
          V
        </div>
      </header>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 transform hover:-translate-y-1 transition-transform">
          <div className="bg-green-50 p-4 rounded-2xl text-primary">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Hours Logged</p>
            <h3 className="text-3xl font-extrabold text-gray-900">42</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 transform hover:-translate-y-1 transition-transform">
          <div className="bg-blue-50 p-4 rounded-2xl text-secondary">
            <CalendarDays size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Upcoming Events</p>
            <h3 className="text-3xl font-extrabold text-gray-900">3</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 transform hover:-translate-y-1 transition-transform">
          <div className="bg-orange-50 p-4 rounded-2xl text-accent">
            <Award size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Impact Level</p>
            <h3 className="text-3xl font-extrabold text-gray-900">Hero</h3>
          </div>
        </div>
      </section>

      {/* Recent Activity or Next Steps Placeholder */}
      <section className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm text-secondary font-bold text-center leading-tight">
                <span className="block text-xs uppercase text-gray-400">Oct</span>
                24
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Food Distribution Drive</h4>
                <p className="text-sm text-gray-500">Central Park • 10:00 AM</p>
              </div>
            </div>
            <button className="text-primary font-semibold text-sm hover:underline">View Details</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm text-secondary font-bold text-center leading-tight">
                <span className="block text-xs uppercase text-gray-400">Oct</span>
                28
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Education Awareness Camp</h4>
                <p className="text-sm text-gray-500">City Library • 2:00 PM</p>
              </div>
            </div>
            <button className="text-primary font-semibold text-sm hover:underline">View Details</button>
          </div>
        </div>
      </section>
    </div>
  );
}
