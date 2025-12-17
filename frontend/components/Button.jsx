import React from "react";
import * as Icons from "lucide-react";

/**
 * Button component – entièrement personnalisable
 *
 * Props:
 * - label: string | texte du bouton
 * - onClick: function | action au clic
 * - variant: "solid" | "outline" | "ghost"
 * - color: string | couleur principale (ex: "#4f46e5" ou "indigo")
 * - radius: "none" | "sm" | "md" | "lg" | "full"
 * - shadow: "none" | "sm" | "md" | "lg"
 * - icon: string | nom de l’icône Lucide (ex: "Download")
 * - iconPosition: "left" | "right"
 * - disabled: boolean
 * - type: "button" | "submit" | "reset"
 */

export default function Button({
  label = "Button",
  onClick,
  variant = "solid",
  color = "#4f46e5",
  radius = "md",
  shadow = "sm",
  icon,
  iconPosition = "left",
  disabled = false,
  type = "button",
  className = "",
}) {
  const IconComponent = icon ? Icons[icon] : null;

  const radiusMap = {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    full: "9999px",
  };

  const shadowMap = {
    none: "none",
    sm: "0 1px 2px rgba(0,0,0,0.08)",
    md: "0 4px 8px rgba(0,0,0,0.12)",
    lg: "0 8px 16px rgba(0,0,0,0.18)",
  };

  const baseStyle = {
    borderRadius: radiusMap[radius],
    boxShadow: shadowMap[shadow],
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
  };

  const variants = {
    solid: {
      backgroundColor: color,
      color: "#ffffff",
      border: "none",
    },
    outline: {
      backgroundColor: "transparent",
      color: color,
      border: `2px solid ${color}`,
    },
    ghost: {
      backgroundColor: "transparent",
      color: color,
      border: "none",
    },
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      style={{
        ...baseStyle,
        ...variants[variant],
        padding: "10px 16px",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
      }}
      className={className}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {IconComponent && iconPosition === "left" && (
        <IconComponent size={18} />
      )}

      <span>{label}</span>

      {IconComponent && iconPosition === "right" && (
        <IconComponent size={18} />
      )}
    </button>
  );
}
