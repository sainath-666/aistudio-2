import React from 'react';
import { motion } from 'motion/react';
import { 
  Eye, 
  MapPin, 
  Zap, 
  CheckCircle2, 
  Target, 
  ShieldCheck, 
  Database,
  Truck,
  Users
} from 'lucide-react';

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}>
    {children}
  </div>
);

const Feature = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex gap-4">
    <div className="bg-teal-50 p-3 rounded-xl text-teal-600 h-fit">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function Landing() {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-teal-900 text-white p-8 md:p-16">
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-teal-800/50 rounded-full text-teal-200 text-xs font-bold tracking-widest uppercase mb-6"
          >
            <Zap size={14} />
            Andhra Pradesh Vision Outreach
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            Illuminating Lives Across <span className="text-teal-400">All Districts</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-teal-100/80 mb-8 leading-relaxed"
          >
            A technology-driven, data-centric initiative to bring quality eye care and 
            affordable spectacles to every citizen across all 26 districts of Andhra Pradesh.
          </motion.p>
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="flex flex-wrap gap-4"
          >
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="text-teal-400" size={18} />
              <span>Full Scalability</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="text-teal-400" size={18} />
              <span>Real-time Accountability</span>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-20 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full text-teal-400">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="400" cy="0" r="200" className="animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4 border-l-4 border-l-teal-600">
          <div className="p-3 bg-teal-50 rounded-full text-teal-600">
            <MapPin size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">26</div>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Districts Covered</div>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-l-4 border-l-orange-500">
          <div className="p-3 bg-orange-50 rounded-full text-orange-600">
            <Target size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Citizen Inclusion</div>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-l-4 border-l-blue-600">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            <Truck size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">21 Days</div>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Max Delivery Time</div>
          </div>
        </Card>
      </div>

      {/* The Unseen Challenge */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Unseen Challenge</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Millions of citizens in Andhra Pradesh live with preventable or treatable vision impairments — 
            silently affecting their ability to learn, work, and thrive.
          </p>
          <div className="space-y-6">
            <Feature 
              icon={Users} 
              title="Access Gap" 
              description="Large sections of rural and semi-urban populations have never undergone a formal eye examination."
            />
            <Feature 
              icon={ShieldCheck} 
              title="Affordability Barrier" 
              description="Cost of spectacles and consultations remains out of reach for economically weaker sections."
            />
            <Feature 
              icon={Target} 
              title="Cascading Impact" 
              description="Uncorrected vision impairs school performance and reduces workforce productivity."
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="h-48 bg-teal-100 rounded-3xl overflow-hidden relative group">
               <div className="absolute inset-0 bg-teal-600/10 group-hover:bg-teal-600/0 transition-colors" />
               <div className="absolute bottom-4 left-4 text-teal-800 font-bold">Screening</div>
            </div>
            <div className="h-64 bg-teal-800 rounded-3xl flex items-center justify-center p-8 text-white text-center">
               <span className="text-sm font-medium">Fully Technology Driven Model</span>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="h-64 bg-teal-600 rounded-3xl flex flex-col justify-end p-8 text-white">
               <div className="text-3xl font-bold leading-none mb-2">26</div>
               <div className="text-sm opacity-80">Full Coverage of AP</div>
            </div>
            <div className="h-48 bg-gray-100 rounded-3xl overflow-hidden" />
          </div>
        </div>
      </section>

      {/* Digital Backbone */}
      <section className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-teal-500/20 rounded-full text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">The Digital Backbone</div>
            <h2 className="text-3xl font-bold mb-6">Real-Time Data Integration</h2>
            <p className="text-gray-400 mb-8 max-w-lg">
              All screening, prescription, distribution, and referral events are logged in real time, 
              ensuring 100% transparency and tracking.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Database className="text-teal-500 mb-2" size={32} />
                <h4 className="font-bold mb-1">EMR Standard</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Compliant with GOI eHR Standards-2016.</p>
              </div>
              <div>
                <Zap className="text-teal-500 mb-2" size={32} />
                <h4 className="font-bold mb-1">Instant Entry</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Point-of-care data capture via PMOA tablets.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
            <div className="flex flex-col gap-4">
               {[
                 { step: '01', title: 'Patient Screening', color: 'text-teal-500' },
                 { step: '02', title: 'PMOA Data Entry', color: 'text-teal-500' },
                 { step: '03', title: 'Central EMR Storage', color: 'text-teal-400' },
                 { step: '04', title: 'Real-time Reporting', color: 'text-white' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 p-3 bg-gray-800 rounded-xl">
                   <span className={`text-xs font-mono font-bold ${item.color}`}>{item.step}</span>
                   <span className="font-medium">{item.title}</span>
                   <CheckCircle2 size={16} className="ml-auto text-teal-500" />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
