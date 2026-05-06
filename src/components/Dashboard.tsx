import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  Users, Eye, ClipboardCheck, Truck, TrendingUp, AlertCircle, 
  CheckCircle2, Clock 
} from 'lucide-react';

const MOCK_DATA_DISTRICTS = [
  { name: 'Visakhapatnam', screenings: 4500, spectacles: 3200, referrals: 450 },
  { name: 'Guntur', screenings: 3800, spectacles: 2800, referrals: 320 },
  { name: 'Krishna', screenings: 4200, spectacles: 3100, referrals: 380 },
  { name: 'Chittoor', screenings: 3500, spectacles: 2500, referrals: 290 },
  { name: 'Nellore', screenings: 3100, spectacles: 2200, referrals: 240 },
  { name: 'Kurnool', screenings: 3900, spectacles: 2700, referrals: 410 },
];

const MOCK_MONTHLY_TREND = [
  { month: 'Jan', screenings: 12000, deliveries: 8500 },
  { month: 'Feb', screenings: 15000, deliveries: 11000 },
  { month: 'Mar', screenings: 18000, deliveries: 14000 },
  { month: 'Apr', screenings: 22000, deliveries: 17500 },
  { month: 'May', screenings: 25000, deliveries: 21000 },
];

const DELIVERY_STATUS = [
  { name: 'Delivered', value: 75, color: '#0d9488' },
  { month: 'Pending', value: 15, color: '#f59e0b' },
  { month: 'Refused', value: 10, color: '#ef4444' },
];

const StatCard = ({ title, value, change, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon size={20} />
      </div>
      <div className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
        <TrendingUp size={12} />
        {change}%
      </div>
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-500 font-medium">{title}</div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Screenings" 
          value="1,24,500" 
          change="12" 
          icon={Users} 
          colorClass="bg-teal-50 text-teal-600"
        />
        <StatCard 
          title="Spectacles Prescribed" 
          value="84,200" 
          change="8" 
          icon={Eye} 
          colorClass="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Delivered (21 Days)" 
          value="72,150" 
          change="95" 
          icon={Truck} 
          colorClass="bg-orange-50 text-orange-600"
        />
        <StatCard 
          title="Active PMOAs" 
          value="450" 
          change="5" 
          icon={ClipboardCheck} 
          colorClass="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Screening Trends */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Program Growth Trend</h3>
              <p className="text-sm text-gray-500">Monthly breakdown of screenings vs successful deliveries</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
               <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-teal-500" /> Screenings</div>
               <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-blue-500" /> Deliveries</div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_MONTHLY_TREND}>
                <defs>
                  <linearGradient id="colorScr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="screenings" stroke="#0d9488" fillOpacity={1} fill="url(#colorScr)" />
                <Area type="monotone" dataKey="deliveries" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDel)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8">Spectacle Status</h3>
          <div className="h-64 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DELIVERY_STATUS}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DELIVERY_STATUS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-3xl font-bold text-teal-600">86%</span>
               <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Efficiency</span>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {DELIVERY_STATUS.map((status, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full`} style={{ backgroundColor: status.color }} />
                  <span className="text-sm font-medium text-gray-600">{status.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{status.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* District-wise performance */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900">District Performance Ranking</h3>
            <p className="text-sm text-gray-500">Comparing screenings vs successful treatment</p>
          </div>
          <button className="text-teal-600 text-sm font-bold bg-teal-50 px-4 py-2 rounded-lg hover:bg-teal-100 transition-colors">
            View All 26 Districts
          </button>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_DATA_DISTRICTS} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" axisLine={false} tickLine={false} hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={120} />
              <Tooltip 
                 cursor={{ fill: '#f8fafc' }}
                 contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="screenings" fill="#0d9488" radius={[0, 4, 4, 0]} barSize={20} />
              <Bar dataKey="spectacles" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
            <div className="flex items-center gap-3 mb-4">
               <AlertCircle className="text-orange-600" />
               <h4 className="font-bold text-orange-900">Attention Required</h4>
            </div>
            <p className="text-sm text-orange-800 mb-6 leading-relaxed">
              Kurnool and Nellore districts are currently experiencing a slight delay in spectacle manufacturing turnaround time.
            </p>
            <div className="flex gap-2">
               <span className="text-[10px] font-bold bg-orange-200 text-orange-900 px-2 py-0.5 rounded tracking-widest uppercase">Critical</span>
               <span className="text-[10px] font-bold bg-orange-200 text-orange-900 px-2 py-0.5 rounded tracking-widest uppercase">High Burden</span>
            </div>
         </div>
         <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
            <div className="flex items-center gap-3 mb-4">
               <CheckCircle2 className="text-teal-600" />
               <h4 className="font-bold text-teal-900">Program Milestone</h4>
            </div>
            <p className="text-sm text-teal-800 mb-6 leading-relaxed">
              Visakhapatnam has successfully reached its 1st quarter screening target of 4,000 citizens ahead of schedule.
            </p>
            <div className="flex gap-2">
               <span className="text-[10px] font-bold bg-teal-200 text-teal-900 px-2 py-0.5 rounded tracking-widest uppercase">Achievement</span>
               <span className="text-[10px] font-bold bg-teal-200 text-teal-900 px-2 py-0.5 rounded tracking-widest uppercase">Efficiency</span>
            </div>
         </div>
      </div>
    </div>
  );
}
