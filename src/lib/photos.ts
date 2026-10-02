import towels from "@/assets/photos/towels.jpg";
import fleet from "@/assets/photos/fleet.jpg";
import hotel from "@/assets/photos/hotel.jpg";
import salon from "@/assets/photos/salon.jpg";
import restaurant from "@/assets/photos/restaurant.jpg";
import workwear from "@/assets/photos/workwear.jpg";
import healthcare from "@/assets/photos/healthcare.jpg";
import fold from "@/assets/photos/fold.jpg";

export type PhotoAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const photos = {
  towels: {
    src: towels,
    width: 1280,
    height: 960,
    alt: "A tall stack of folded white bath towels.",
  },
  fleet: {
    src: fleet,
    width: 1400,
    height: 788,
    alt: "Three white and blue laundry vans parked at an industrial unit.",
  },
  hotel: {
    src: hotel,
    width: 1100,
    height: 733,
    alt: "A hotel bed made with white sheets, a duvet, and pillows.",
  },
  salon: {
    src: salon,
    width: 1100,
    height: 733,
    alt: "Folded white salon towels and a robe on a timber bench.",
  },
  restaurant: {
    src: restaurant,
    width: 1100,
    height: 733,
    alt: "Pressed white tablecloths, napkins, and chef jackets.",
  },
  workwear: {
    src: workwear,
    width: 1100,
    height: 733,
    alt: "Clean hi-vis jackets and navy uniforms on a laundry rail.",
  },
  healthcare: {
    src: healthcare,
    width: 1100,
    height: 733,
    alt: "Folded patient linen and pale blue scrubs on a clinic trolley.",
  },
  fold: {
    src: fold,
    width: 1100,
    height: 733,
    alt: "Hands folding a white sheet on a laundry table.",
  },
} satisfies Record<string, PhotoAsset>;
