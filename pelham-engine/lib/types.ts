export type OutputMode = 'seller_brief' | 'customer_pitch' | 'internal_deck' | 'quote_stage';
export type ProjectType =
  | 'auto_detect' | 'fit_out' | 'refurbishment' | 'relocation'
  | 'reconfiguration' | 'expansion' | 'consolidation'
  | 'workplace_consultancy' | 'furniture_move';
export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type AttractivenessLevel = 'high' | 'medium' | 'low';

export type AnalysisInput = {
  website: string;
  companyName?: string;
  mode: OutputMode;
  brandContext: 'Pelham Interiors';
  projectType: ProjectType;
  extraNotes?: string;
};

export type SellerBrief = {
  target: string;
  reason: string;
  trigger: string;
  angle: string;
  contactStrategy: string;
  nextStep: string;
  linkedinOpener: string;
  emailOpener: string;
  bonusTools?: {
    openerScript?: string;
    objections?: string[];
    discoveryQuestions?: string[];
    miniDeckTitle?: string;
    miniPitchOutline?: string[];
  };
};

export type PitchSlide = {
  id: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  bullets: string[];
  notes?: string;
};

export type AnalysisResult = {
  id: string;
  website: string;
  companyName: string;
  sector: string;
  location: string;
  attractiveness: AttractivenessLevel;
  confidence: ConfidenceLevel;
  primaryAngle: string;
  topAngles: string[];
  triggers: string[];
  projectType: ProjectType;
  projLabel: string;
  buyingMotion: string;
  decisionMakerFunctions: string[];
  validationGaps: string[];
  timing: string;
  sellerBrief: SellerBrief;
  pitchDeck?: {
    title: string;
    slides: PitchSlide[];
  };
};

export type AnalysisState =
  | { status: 'idle' }
  | { status: 'validating' }
  | { status: 'crawling'; step: number; metrics: Record<string, string> }
  | { status: 'analysing' }
  | { status: 'complete'; result: AnalysisResult }
  | { status: 'failed'; error: string };

export type DeckMode = 'customer_pitch' | 'internal_deck' | 'quote_stage';
export type BrandMode = 'pelham' | 'co_branded';
export type Tone = 'executive' | 'commercial' | 'direct' | 'premium';
export type Density = 'light' | 'standard' | 'detailed';
