import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, CheckCircle2, Clock, Eye, AlertCircle, ChevronRight } from 'lucide-react';
import { DISTRICTS } from '../types';

const MOCK_DISTRICT_STATUS = DISTRICTS.map(d => ({
  name: d,
  screened: Math.floor(Math.random() * 5000) + 1000,
  target: 6000,
  spectacles: Math.floor(Math.random() * 3000) + 500,
  status: Math.random() > 0.8 ? 'Pending' : 'Operational'
}));

export default function DistrictStatus() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = MOCK_DISTRICT_STATUS.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">District Outreach Status</h2>
          <p className="text-gray-500">Real-time penetration levels across all 26 administrative districts.</p>
        </div>
        <div className="relative group min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search district..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDistricts.map((district, i) => {
          const progress = (district.screened / district.target) * 100;
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={district.name}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                    <MapPin size={20} />
                  </div>
                  <h4 className="font-bold text-gray-900">{district.name}</h4>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                  district.status === 'Operational' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {district.status}
                </div>
              </div>

              <div className="space-y-4">
                 <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-gray-500">
                       <span>Total Screened</span>
                       <span className="text-gray-900">{district.screened.toLocaleString()} / {district.target.toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${progress}%` }}
                         transition={{ duration: 1, delay: 0.5 }}
                         className={`h-full rounded-full ${progress > 70 ? 'bg-teal-500' : progress > 40 ? 'bg-blue-500' : 'bg-orange-500'}`} 
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-3 bg-gray-50 rounded-2xl">
                       <div className="text-teal-600 mb-1">
                          <Eye size={16} />
                       </div>
                       <div className="text-sm font-bold text-gray-900">{district.spectacles.toLocaleString()}</div>
                       <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Glasses</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-2xl">
                       <div className="text-blue-600 mb-1">
                          <CheckCircle2 size={16} />
                       </div>
                       <div className="text-sm font-bold text-gray-900">{Math.floor(district.screened * 0.1)}</div>
                       <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Referrals</div>
                    </div>
                 </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                 <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <Clock size={14} />
                    Last entry 2h ago
                 </div>
                 <ChevronRight size={16} className="text-gray-300 group-hover:text-teal-600 transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
