import { AnalysisInput, AnalysisResult, PitchSlide } from './types';
import { DATA } from './mock-data';
import { extractDomain, toCompanyName, inferSector } from './formatters';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback: combine timestamp and random bits for collision resistance
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function generateSlides(a: AnalysisResult): PitchSlide[] {
  return [
    { id: 's1', eyebrow: 'Pelham Interiors', title: `${a.companyName} × Pelham`, subtitle: `A focused workspace opportunity — ${a.sector}`, bullets: [], notes: `Opening slide. Set the context: this is a targeted brief for ${a.companyName}, not a generic pitch.` },
    { id: 's2', eyebrow: 'Overview', title: 'Why we are talking', subtitle: `The commercial case for a Pelham conversation with ${a.companyName}`, bullets: [`${a.companyName} is a ${a.sector} business showing visible workplace signals`, `Primary angle: ${a.primaryAngle}`, `Confidence level: ${a.confidence} — multiple independent signals align`, `Estimated timing window: ${a.timing}`, `Entry point: Facilities, Workplace or Operations`], notes: 'Keep this tight. One slide, one story. The goal is to earn a second meeting, not explain everything.' },
    { id: 's3', eyebrow: 'Company context', title: `About ${a.companyName}`, subtitle: `What the commercial intelligence tells us`, bullets: [`${a.sector} business operating from ${a.location}`, `Visible signs of growth and commercial momentum`, `Workspace likely at or approaching a strategic decision point`, `Team structure suggests facilities / workplace ownership exists`, `Operating maturity consistent with a fit-out or refurbishment candidate`], notes: 'Keep language factual and confident.' },
    { id: 's4', eyebrow: 'Timing', title: 'The signals we are seeing', subtitle: `Why the timing makes ${a.companyName} worth contacting now`, bullets: [...a.triggers, `Timing window: ${a.timing}`, `Confidence rating: ${a.confidence}`], notes: 'This is the commercial hook.' },
    { id: 's5', eyebrow: 'The problem we solve', title: 'Where space starts to constrain', subtitle: 'What businesses at this stage typically experience', bullets: ['Headcount has grown but space has not kept pace', 'Hybrid working has changed how space is actually used', 'Existing fit-out no longer reflects the brand or culture', 'Facilities team is managing reactive maintenance, not strategic planning', 'No clear owner of the workspace vision'], notes: `Position the problem before the solution. Make ${a.companyName} recognise themselves in this slide.` },
    { id: 's6', eyebrow: 'Our positioning', title: a.primaryAngle, subtitle: `How Pelham uniquely addresses this for ${a.companyName}`, bullets: ['Lead with workspace vision — not a product pitch', 'Pelham works as a strategic partner from brief through delivery', 'We handle the full journey: design, build, furniture, move management', 'Our approach: understand the business first, then solve for the space', 'Outcome focus: space that earns its cost per head every working day'], notes: 'The key message: Pelham is not a contractor. We are a workplace intelligence partner who also builds beautifully.' },
    { id: 's7', eyebrow: 'What we do', title: 'How Pelham works', subtitle: 'End-to-end workplace delivery', bullets: ['Commercial fit-out and Category A/B works', 'Workplace consultancy and space strategy', 'Furniture procurement and specification', 'Move management and transition planning', 'Post-occupancy evaluation and optimisation'], notes: 'Keep this factual and brief.' },
    { id: 's8', eyebrow: 'Value delivered', title: 'What good looks like', subtitle: 'The measurable outcomes we deliver for clients', bullets: ['Space that genuinely supports how people work today', 'Reduced cost per square metre through intelligent design', 'Improved employee experience and talent retention', 'A workspace that reflects and reinforces brand identity', 'Projects delivered on time, on budget, with minimal disruption'], notes: 'Outcome language, not feature language.' },
    { id: 's9', eyebrow: 'How we work', title: 'The Pelham process', subtitle: 'From brief to building in five stages', bullets: ['01 · Brief: understand the business, not just the space', '02 · Design: workplace strategy to concept to technical', '03 · Build: programme managed, quality controlled', '04 · Furnish: specification, procurement, installation', '05 · Handover: post-occupancy check and lessons captured'], notes: 'Clients want certainty. This slide says: we have done this before.' },
    { id: 's10', eyebrow: 'Case studies', title: 'Clients we have helped at this moment', subtitle: 'Businesses like yours, at the same inflection point', bullets: [`${a.sector} business — relocated and refitted 12,000 sq ft in 14 weeks`, 'Professional services firm — redesigned for hybrid, reduced footprint by 30%', 'Growth-stage company — first purpose-built HQ, delivered pre-Series B', 'Post-merger integration — two offices consolidated into one cohesive environment', 'Historic building — full Category B fit-out, Grade II listed, on budget'], notes: 'If you have a real case study from this sector, replace this slide.' },
    { id: 's11', eyebrow: 'Next step', title: 'What we suggest', subtitle: 'A low-commitment way to start the conversation', bullets: ['A 30-minute discovery call — no presentation, just questions', 'We will share what we observed and you can correct our assumptions', 'If there is a fit, we will propose a paid workplace brief', 'No obligation. No pitch. Just a conversation between two professionals.', 'Contact: [SENDER] · Pelham Interiors'], notes: 'Lower the barrier. The ask is a conversation, not a decision.' },
    { id: 's12', eyebrow: 'Pelham Interiors', title: 'Thank you', subtitle: `${a.companyName} × Pelham · Confidential`, bullets: ['Pelham Interiors — strategic workplace delivery', 'pelhaminteriors.co.uk', '[SENDER] · [EMAIL] · [PHONE]'], notes: 'Clean, confident close.' },
  ];
}

export function runAnalysis(input: AnalysisInput): AnalysisResult {
  const domain = extractDomain(input.website);
  const companyName = toCompanyName(input.companyName || '', domain);
  const sector = inferSector(domain, companyName);
  const location = pick(DATA.locations);
  const attractiveness = pick(['high', 'high', 'high', 'medium', 'medium', 'medium'] as const);
  const confidence = pick(['high', 'high', 'medium', 'medium', 'low'] as const);
  const primaryAngle = pick(DATA.angles);
  const topAngles = pickN(DATA.angles.filter(a => a !== primaryAngle), 3);
  const timing = pick(DATA.timings);
  const triggers = pickN(DATA.triggers, 3);
  const validationGaps = pickN(DATA.gapPool, 3);
  const decisionMakerFunctions = pickN(DATA.dmPool, 4);
  const buyingMotion = pick(DATA.buyingMotions);
  const projLabel = DATA.projectLabels[input.projectType] || pick(Object.values(DATA.projectLabels));
  const discoveries = pickN(DATA.discoveries, 5);
  const objections = pickN(DATA.objections, 4);

  const targetText = `${companyName} is a ${sector} business operating from ${location}. They show visible signs of commercial activity and growth, making them a realistic fit-out or workplace project candidate for Pelham at the right moment in their property cycle.`;
  const reasonText = `${companyName} has characteristics consistent with a company approaching an active or near-term commercial property decision. ${sector} businesses at this growth stage typically face the tension between workspace quality and headcount pressure — a tension Pelham is well positioned to resolve.`;
  const triggerText = `Recent commercial signals suggest ${companyName} may be approaching a workplace inflection point.\n\n• ${triggers[0]}\n• ${triggers[1]}\n• ${triggers[2]}\n\nLease cycles and business maturity make a renewal, relocation or reconfiguration plausible within ${timing}.`;
  const angleText = `Position Pelham as a strategic workplace partner — not a fit-out contractor. The opening conversation with ${companyName} should centre on their workspace vision, not our services.\n\nLead with: "How is your current space supporting the way your team actually works today?"\n\nFor a ${sector} business, workspace quality connects directly to talent attraction, retention and culture. The strongest angle here is ${primaryAngle}.`;
  const contactText = `Target Facilities, Workplace or Operations contacts first at ${companyName} — these functions own the day-to-day space pain.\n\n• ${decisionMakerFunctions[0]} — owns operational space\n• ${decisionMakerFunctions[1]} — carries workplace mandate\n• ${decisionMakerFunctions[2]} — budget and strategic alignment\n\nCheck LinkedIn for anyone with Workplace, Facilities, Real Estate or Office Management in their title.`;
  const nextText = `Key validation actions for ${companyName}:\n\n• Confirm lease position and renewal timeline\n• Validate headcount trajectory via LinkedIn\n• Identify the named individual carrying workspace responsibility\n• Check for recent hires in facilities, workplace or operations\n• Run a Companies House check: company age, size, registered address\n• Search for any planning applications or lease transactions in their area`;
  const linkedinOpener = `Hi [NAME], I came across ${companyName} and was curious about how you're managing your workspace as the team grows. We work with businesses at exactly the inflection point where space starts to constrain rather than enable. Pelham Interiors — fit-outs and workplace projects. Worth a quick conversation?`;
  const emailOpener = `Subject: ${companyName} — workspace conversation\n\nHi [NAME],\n\nI noticed ${companyName} has been growing and wanted to reach out about your current workspace setup.\n\nPelham works with businesses at exactly the point where space starts to feel like a constraint rather than an enabler — and from what I can see of ${companyName}, you might be approaching that moment.\n\nWorth a call to compare notes?\n\nBest,\n[SENDER]\nPelham Interiors`;

  const result: AnalysisResult = {
    id: generateId(),
    website: input.website,
    companyName,
    sector,
    location,
    attractiveness,
    confidence,
    primaryAngle,
    topAngles,
    triggers,
    projectType: input.projectType,
    projLabel,
    buyingMotion,
    decisionMakerFunctions,
    validationGaps,
    timing,
    sellerBrief: {
      target: targetText,
      reason: reasonText,
      trigger: triggerText,
      angle: angleText,
      contactStrategy: contactText,
      nextStep: nextText,
      linkedinOpener,
      emailOpener,
      bonusTools: {
        openerScript: `Hi [NAME], my name is [SENDER] from Pelham Interiors. We work with ${sector} businesses on their office and workspace projects. Quick question — is your current space set up for how your team works today? [Pause, listen] That is interesting — what is driving that thinking?`,
        objections,
        discoveryQuestions: discoveries,
        miniDeckTitle: `${companyName} × Pelham Interiors`,
        miniPitchOutline: [
          `Cover: ${companyName} × Pelham Interiors`,
          `Why we are talking: the commercial signals we see`,
          `Understanding ${companyName}: what the intelligence tells us`,
          `Why now: timing and triggers`,
          `The Pelham angle: ${primaryAngle}`,
          'Relevant proof: clients at the same inflection point',
          'Recommended next step',
        ],
      },
    },
  };

  result.pitchDeck = {
    title: `${companyName} × Pelham Interiors`,
    slides: generateSlides(result),
  };

  return result;
}
