export interface PatientInfo {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  patientId: string;
  date: string;
  referredBy?: string;
  contactNumber: string;
  district: string;
}

export interface Symptoms {
  visionIssues: boolean;
  redness: boolean;
  watering: boolean;
  pain: boolean;
  photophobia: boolean;
  headache: boolean;
  others: string;
}

export interface MedicalHistory {
  diabetes: boolean;
  hypertension: boolean;
  thyroid: boolean;
  autoimmune: boolean;
  medications: string;
  allergies: string;
}

export interface VisualAcuityValue {
  ucva: string;
  bcva: string;
  pinhole: string;
}

export interface RefractionValue {
  sphere: string;
  cylinder: string;
  axis: string;
  va?: string;
}

export interface EyeExam {
  id: string;
  patient: PatientInfo;
  symptoms: Symptoms;
  history: MedicalHistory;
  va: {
    distance: { od: VisualAcuityValue; os: VisualAcuityValue };
    near: { od: string; os: string };
  };
  refraction: {
    objective: { od: RefractionValue; os: RefractionValue };
    subjective: { od: RefractionValue; os: RefractionValue; add?: string };
  };
  finalPrescription: {
    od: { sphere: string; cylinder: string; axis: string; add: string; pd: string };
    os: { sphere: string; cylinder: string; axis: string; add: string; pd: string };
    lensType: 'Single Vision Distance' | 'Single Vision Near' | 'Bifocal';
  };
  diagnosis: string;
  treatment: string;
  remarks: string;
  status: 'Draft' | 'Submitted' | 'Referred';
}

export const DISTRICTS = [
  'Alluri Sitharama Raju', 'Anakapalli', 'Anantapur', 'Annamayya', 'Bapatla',
  'Chittoor', 'Dr. B.R. Ambedkar Konaseema', 'Eluru', 'Guntur', 'Kakinada',
  'Krishna', 'Kurnool', 'Nandyal', 'NTR', 'Palnadu', 'Parvathipuram Manyam',
  'Prakasam', 'Srikakulam', 'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai',
  'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa',
  'Vizag'
];
