import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  MapPin, 
  Activity, 
  Eye, 
  FileText, 
  Send,
  Plus,
  Trash2,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  ClipboardCheck
} from 'lucide-react';
import { DISTRICTS } from '../types';

const InputField = ({ label, type = "text", value, onChange, placeholder, options }: any) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
    {options ? (
      <select 
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    ) : (
      <input 
        type={type}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all placeholder:text-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

const CheckboxGroup = ({ label, items, selected, toggle }: any) => (
  <div className="space-y-3">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
    <div className="grid grid-cols-2 gap-3">
      {items.map((item: string) => (
        <button
          key={item}
          onClick={() => toggle(item)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
            selected.includes(item)
              ? 'bg-teal-50 border-teal-200 text-teal-700 shadow-sm'
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className={`h-4 w-4 rounded flex items-center justify-center border transition-all ${
            selected.includes(item) ? 'bg-teal-600 border-teal-600 text-white' : 'border-gray-300'
          }`}>
             {selected.includes(item) && <CheckCircle size={12} />}
          </div>
          {item}
        </button>
      ))}
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, description }: any) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="bg-teal-600 p-2.5 rounded-xl text-white">
      <Icon size={20} />
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 font-medium">{description}</p>
    </div>
  </div>
);

export default function VisionForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    patient: { name: '', age: '', gender: '', district: '', patientId: `AP-${Date.now().toString().slice(-6)}` },
    symptoms: [],
    history: [],
    va: { od: {}, os: {} },
    prescription: { od: {}, os: {}, lensType: '' }
  });

  const totalSteps = 4;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const toggleSymptom = (s: string) => {
    setFormData((prev: any) => ({
      ...prev,
      symptoms: prev.symptoms.includes(s) 
        ? prev.symptoms.filter((i: string) => i !== s) 
        : [...prev.symptoms, s]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Progress Bar */}
      <div className="mb-12 relative">
        <div className="flex justify-between relative z-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div 
                className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step >= i 
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30' 
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {i}
              </div>
              <span className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${step >= i ? 'text-teal-700' : 'text-gray-400'}`}>
                {i === 1 ? 'Patient' : i === 2 ? 'Clinical' : i === 3 ? 'Vision' : 'Final'}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200 -z-0" />
        <div 
          className="absolute top-5 left-0 h-[2px] bg-teal-600 transition-all duration-500 -z-0" 
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} 
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50 p-8 md:p-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <div className="space-y-6">
                <SectionHeader 
                  icon={User} 
                  title="Patient Information" 
                  description="Initial intake and demographic details for EMR registration."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    label="Full Name" 
                    placeholder="Enter patient name" 
                    value={formData.patient.name}
                    onChange={(v: any) => setFormData({...formData, patient: {...formData.patient, name: v}})}
                  />
                  <InputField 
                    label="District" 
                    options={DISTRICTS} 
                    value={formData.patient.district}
                    onChange={(v: any) => setFormData({...formData, patient: {...formData.patient, district: v}})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField 
                      label="Age" 
                      type="number"
                      placeholder="Years" 
                      value={formData.patient.age}
                      onChange={(v: any) => setFormData({...formData, patient: {...formData.patient, age: v}})}
                    />
                    <InputField 
                      label="Gender" 
                      options={['Male', 'Female', 'Other']} 
                      value={formData.patient.gender}
                      onChange={(v: any) => setFormData({...formData, patient: {...formData.patient, gender: v}})}
                    />
                  </div>
                  <InputField 
                    label="Patient ID (Auto)" 
                    value={formData.patient.patientId}
                    onChange={() => {}}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <SectionHeader 
                  icon={Activity} 
                  title="Clinical History" 
                  description="Symptoms reported by the patient and ocular/medical background."
                />
                <CheckboxGroup 
                  label="Presenting Complaints & Symptoms"
                  items={['Blurry Vision', 'Redness', 'Watering', 'Pain', 'Photophobia', 'Headache', 'Itching']}
                  selected={formData.symptoms}
                  toggle={toggleSymptom}
                />
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Medical History</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <InputField label="Chronic Conditions" placeholder="e.g. Diabetes, Hypertension" />
                     <InputField label="Current Medications" placeholder="e.g. Insulin, Eye drops" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <SectionHeader 
                  icon={Eye} 
                  title="Visual Acuity Assessment" 
                  description="Record results for Distance (Unaided) and Near vision."
                />
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-gray-800 bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-teal-500" /> Distance Vision (UCVA)
                  </h4>
                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Right Eye (OD)</div>
                      <div className="flex gap-4">
                        <InputField label="UCVA" value={formData.va.od.ucva} onChange={(v:any) => setFormData({...formData, va: {...formData.va, od: {...formData.va.od, ucva: v}}})} />
                        <InputField label="BCVA" value={formData.va.od.bcva} onChange={(v:any) => setFormData({...formData, va: {...formData.va, od: {...formData.va.od, bcva: v}}})} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Left Eye (OS)</div>
                      <div className="flex gap-4">
                        <InputField label="UCVA" value={formData.va.os.ucva} onChange={(v:any) => setFormData({...formData, va: {...formData.va, os: {...formData.va.os, ucva: v}}})} />
                        <InputField label="BCVA" value={formData.va.os.bcva} onChange={(v:any) => setFormData({...formData, va: {...formData.va, os: {...formData.va.os, bcva: v}}})} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-gray-800 bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" /> Refraction Results
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                     <InputField label="Sphere (OD)" placeholder="0.00" />
                     <InputField label="Cylinder (OD)" placeholder="0.00" />
                     <InputField label="Axis (OD)" placeholder="0" />
                     <InputField label="VA (OD)" placeholder="6/6" />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <SectionHeader 
                  icon={ClipboardCheck} 
                  title="Final Prescription & Advice" 
                  description="Diagnosis based on clinical findings and recommended lens type."
                />
                
                <div className="bg-teal-900 rounded-2xl p-8 text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-full border-2 border-teal-500 flex items-center justify-center font-bold">1</div>
                    <h4 className="font-bold">Proposed Prescription</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">Right Eye Details</span>
                       <div className="grid grid-cols-4 gap-2 text-center">
                          {['Sph', 'Cyl', 'Axis', 'Add'].map(l => <div key={l} className="text-[10px] text-teal-500 font-bold uppercase">{l}</div>)}
                          {['-1.50', '0.00', '180', '+1.50'].map((v, i) => <div key={i} className="bg-teal-800/50 p-2 rounded-lg font-mono text-sm">{v}</div>)}
                       </div>
                    </div>
                    <div className="space-y-4">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">Left Eye Details</span>
                       <div className="grid grid-cols-4 gap-2 text-center">
                          {['Sph', 'Cyl', 'Axis', 'Add'].map(l => <div key={l} className="text-[10px] text-teal-500 font-bold uppercase">{l}</div>)}
                          {['-1.25', '-0.50', '90', '+1.50'].map((v, i) => <div key={i} className="bg-teal-800/50 p-2 rounded-lg font-mono text-sm">{v}</div>)}
                       </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <InputField label="Lens Type" options={['Single Vision Distance', 'Single Vision Near', 'Bifocal', 'Progressive']} />
                   <InputField label="Final Diagnosis" options={['Myopia', 'Hypermetropia', 'Astigmatism', 'Presbyopia', 'Cataract', 'Refractive Error']} />
                </div>

                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                   <div className="flex items-center gap-3 mb-2 text-blue-800 font-bold">
                      <Activity size={18} />
                      Management Advice
                   </div>
                   <textarea 
                     className="w-full bg-blue-50/50 border-none focus:ring-0 text-sm text-blue-900 placeholder:text-blue-300 min-h-[80px]"
                     placeholder="Recommended management plan and clinical advice..."
                   />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Form Actions */}
        <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              step === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          <button 
            onClick={step === totalSteps ? () => alert('Form submitted to Government EMR System') : nextStep}
            className="flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-xl font-bold shadow-lg shadow-teal-600/30 hover:bg-teal-700 transition-all hover:translate-y-[-2px]"
          >
            {step === totalSteps ? 'Finalize & Submit' : 'Continue'}
            {step === totalSteps ? <Send size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
