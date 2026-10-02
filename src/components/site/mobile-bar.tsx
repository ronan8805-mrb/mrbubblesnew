import { Phone } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";

export function MobileBar() {
  return (
    <div className="mobile-bar fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper p-2 md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2">
        <ButtonAnchor tone="line" href={`tel:${PHONE_TEL}`} aria-label={`Call ${PHONE_DISPLAY}`}>
          <Phone aria-hidden="true" className="size-4" />
          Call
        </ButtonAnchor>
        <ButtonLink to="/quote">Get a quote</ButtonLink>
      </div>
    </div>
  );
}
