/* eslint-disable @next/next/no-img-element -- Feature icons may be administrator-uploaded media. */
import type { HTMLAttributes } from "react";
import { ManagedIcon } from "@/components/ManagedIcon";

type FeatureIconProps = HTMLAttributes<HTMLSpanElement> & {
  slug?: string;
  icon?: string;
};

export function FeatureIcon({ icon = "workflow", ...props }: FeatureIconProps) {
  const uploaded = /^(https?:|data:|\/)/i.test(icon);
  return (
    <span {...props} className={`feature-emoji ${props.className ?? ""}`.trim()} aria-hidden="true">
      {uploaded ? <img src={icon} alt="" /> : <ManagedIcon name={icon} />}
    </span>
  );
}
