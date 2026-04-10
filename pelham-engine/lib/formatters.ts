export function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith('http') ? url : 'https://' + url);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function isValidUrl(s: string): boolean {
  if (!s.length) return false;
  try { new URL(s.startsWith('http') ? s : 'https://' + s); return true; }
  catch { return false; }
}

export function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export function toCompanyName(company: string, domain: string): string {
  if (company?.trim()) return company.trim();
  const base = domain.split('.')[0].replace(/[-_]/g, ' ');
  return base.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function inferSector(domain: string, company: string): string {
  const d = (domain + ' ' + company).toLowerCase();
  if (/tech|soft|digital|cloud|data|ai|ml|saas|cyber|dev|code|app/.test(d)) return 'Technology';
  if (/law|legal|solicitor|barrister|llp/.test(d)) return 'Legal';
  if (/health|medical|pharma|clinic|nhs|care/.test(d)) return 'Healthcare';
  if (/finance|capital|invest|asset|fund|wealth|bank/.test(d)) return 'Financial Services';
  if (/media|creative|design|agency|studio|brand|pr|marketing/.test(d)) return 'Media & Creative';
  if (/consult|advisory|strategy|partner/.test(d)) return 'Consulting';
  if (/property|estate|reit|land/.test(d)) return 'Real Estate';
  if (/recruit|talent|hr|people/.test(d)) return 'Recruitment';
  if (/account|audit|tax|cpa/.test(d)) return 'Accounting & Finance';
  if (/edu|school|university|learn|train/.test(d)) return 'EdTech';
  if (/insur|assur|underwrite/.test(d)) return 'Insurance';
  return 'Professional Services';
}
