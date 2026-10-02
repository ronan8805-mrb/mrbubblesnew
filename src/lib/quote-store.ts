import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BriefFields, BriefStatus, Frequency, LinenMode, VolumeBand, VolumeUnit } from "@/lib/brief";
import type { SectorId } from "@/lib/content";

type QuoteState = BriefFields & {
  status: BriefStatus;
  error: string;
  step: number;
  hydrated: boolean;
  setSector: (sector: SectorId) => void;
  setMode: (mode: LinenMode) => void;
  setUnit: (unit: VolumeUnit) => void;
  setVolume: (volume: VolumeBand) => void;
  setFrequency: (frequency: Frequency) => void;
  setCounty: (county: string) => void;
  setField: (key: "name" | "phone" | "email" | "note", value: string) => void;
  setStep: (step: number) => void;
  setStatus: (status: BriefStatus, error?: string) => void;
  reset: () => void;
};

const fresh: BriefFields & { status: BriefStatus; error: string; step: number } = {
  sector: "hotel",
  mode: null,
  unit: "kg",
  volume: null,
  frequency: null,
  county: "",
  name: "",
  phone: "",
  email: "",
  note: "",
  status: "editing",
  error: "",
  step: 0,
};

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      ...fresh,
      hydrated: false,
      setSector: (sector) => set({ sector }),
      setMode: (mode) => set({ mode, status: "editing", error: "" }),
      setUnit: (unit) => set({ unit }),
      setVolume: (volume) => set({ volume, status: "editing", error: "" }),
      setFrequency: (frequency) => set({ frequency, status: "editing", error: "" }),
      setCounty: (county) => set({ county, status: "editing", error: "" }),
      setField: (key, value) =>
        set({ [key]: value, status: "editing", error: "" } as Pick<QuoteState, typeof key | "status" | "error">),
      setStep: (step) => set({ step }),
      setStatus: (status, error = "") => set({ status, error }),
      reset: () => set({ ...fresh, hydrated: true }),
    }),
    {
      name: "mrbubbles-quote",
      skipHydration: true,
      partialize: (state) => ({
        sector: state.sector,
        mode: state.mode,
        unit: state.unit,
        volume: state.volume,
        frequency: state.frequency,
        county: state.county,
        name: state.name,
        phone: state.phone,
        email: state.email,
        note: state.note,
        status: state.status === "loading" ? "editing" : state.status,
        error: state.status === "loading" ? "" : state.error,
        step: state.step,
      }),
    },
  ),
);

export function useHydrateQuote() {
  return useQuoteStore((state) => state.hydrated);
}
