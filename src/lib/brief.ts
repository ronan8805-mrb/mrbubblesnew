import { CONTACT_EMAIL, COUNTIES, sectorById, type SectorId } from "@/lib/content";

export type LinenMode = "own" | "rental";
export type VolumeUnit = "kg" | "items";
export type VolumeBand = "s" | "m" | "l" | "xl";
export type Frequency = "daily" | "three" | "twice" | "weekly" | "fortnightly";
export type BriefStatus = "editing" | "loading" | "error" | "success";

export type BriefFields = {
  sector: SectorId;
  mode: LinenMode | null;
  unit: VolumeUnit;
  volume: VolumeBand | null;
  frequency: Frequency | null;
  county: string;
  name: string;
  phone: string;
  email: string;
  note: string;
};

export const modes: { value: LinenMode; label: string; detail: string }[] = [
  { value: "own", label: "Own linen", detail: "We wash what you own and bring it back." },
  { value: "rental", label: "Rental", detail: "We supply the pack and keep the count." },
];

export const frequencies: { value: Frequency; label: string }[] = [
  { value: "daily", label: "Every weekday" },
  { value: "three", label: "Three times a week" },
  { value: "twice", label: "Twice a week" },
  { value: "weekly", label: "Once a week" },
  { value: "fortnightly", label: "Every fortnight" },
];

const kgBands: Record<VolumeBand, string> = {
  s: "Under 50 kg a week",
  m: "50–150 kg a week",
  l: "150–400 kg a week",
  xl: "Over 400 kg a week",
};

const itemBands: Record<VolumeBand, string> = {
  s: "Under 200 items a week",
  m: "200–800 items a week",
  l: "800–2,000 items a week",
  xl: "Over 2,000 items a week",
};

export function volumeLabel(unit: VolumeUnit, volume: VolumeBand | null): string {
  if (!volume) return "Not set";
  return unit === "kg" ? kgBands[volume] : itemBands[volume];
}

export function frequencyLabel(frequency: Frequency | null): string {
  if (!frequency) return "Not set";
  return frequencies.find((item) => item.value === frequency)?.label ?? "Not set";
}

export function modeLabel(mode: LinenMode | null): string {
  if (mode === "own") return "Own linen";
  if (mode === "rental") return "Rental";
  return "Not set";
}

export function validPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function validCounty(value: string): boolean {
  return (COUNTIES as readonly string[]).includes(value);
}

export function validateBrief(fields: BriefFields): string | null {
  if (!fields.mode) return "Choose own linen or rental.";
  if (!fields.volume) return "Choose a weekly volume band.";
  if (!fields.frequency) return "Choose how often we collect.";
  if (!validCounty(fields.county)) return "Choose a county.";
  if (fields.name.trim().length < 2) return "Enter the name we should ask for.";
  if (!validPhone(fields.phone)) return "Enter a phone number we can call.";
  if (!validEmail(fields.email)) return "Enter a valid email address.";
  return null;
}

export function isBriefComplete(fields: BriefFields): boolean {
  return validateBrief(fields) === null;
}

export function briefLines(fields: BriefFields): { label: string; value: string }[] {
  return [
    { label: "Sector", value: sectorById(fields.sector).label },
    { label: "Linen", value: modeLabel(fields.mode) },
    { label: "Weekly volume", value: volumeLabel(fields.unit, fields.volume) },
    { label: "Collection", value: frequencyLabel(fields.frequency) },
    { label: "County", value: fields.county || "Not set" },
    { label: "Name", value: fields.name.trim() || "Not set" },
    { label: "Phone", value: fields.phone.trim() || "Not set" },
    { label: "Email", value: fields.email.trim() || "Not set" },
    { label: "Note", value: fields.note.trim() || "None" },
  ];
}

export function briefText(fields: BriefFields): string {
  const lines = briefLines(fields).map((line) => `${line.label}: ${line.value}`);
  return ["Mr Bubbles collection brief", "", ...lines].join("\n");
}

export function mailtoHref(fields: BriefFields): string {
  const sector = sectorById(fields.sector).label;
  const subject = `Collection quote — ${sector} — ${fields.county || "county not set"}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(briefText(fields))}`;
}

export function stepProblem(step: number, fields: BriefFields): string | null {
  if (step === 1 && !fields.mode) return "Choose own linen or rental.";
  if (step === 2 && !fields.volume) return "Choose a weekly volume band.";
  if (step === 3 && !fields.frequency) return "Choose how often we collect.";
  if (step === 4 && !validCounty(fields.county)) return "Choose a county.";
  if (step === 5) return validateBrief(fields);
  return null;
}
