import React from "react";
import type { IconType } from "react-icons";

export type ExpertiseLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface SkillCardProps {
  icon: IconType;
  name: string;
  expertise: ExpertiseLevel;
  /** Progress value from 0–100 */
  progress: number;
}

const expertiseColors: Record<ExpertiseLevel, { bar: string; label: string }> = {
  Beginner:     { bar: "#f4b97a", label: "#c97a2e" },
  Intermediate: { bar: "#ea5600", label: "#ea5600" },
  Advanced:     { bar: "#c43f00", label: "#c43f00" },
  Expert:       { bar: "#7a2100", label: "#7a2100" },
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "16px",
    background: "#ffffff",
    borderRadius: "14px",
    padding: "16px 20px",
    width: "100%",
    boxSizing: "border-box",
  },
  iconWrapper: {
    flexShrink: 0,
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#fff4ee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: 0,
  },
  nameRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "8px",
  },
  name: {
    fontFamily: "'Syne', system-ui, sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "#1a1a1a",
    margin: 0,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  expertise: {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    flexShrink: 0,
  },
  trackOuter: {
    width: "100%",
    height: "6px",
    background: "#ebebeb",
    borderRadius: "999px",
    overflow: "hidden",
  },
};

const getTrackInnerStyle = (progress: number, color: string): React.CSSProperties => ({
  height: "100%",
  width: `${Math.min(100, Math.max(0, progress))}%`,
  background: color,
  borderRadius: "999px",
  transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
});

const SkillCard: React.FC<SkillCardProps> = ({
  icon,
  name,
  expertise,
  progress,
}) => {
  const Icon = icon as React.ElementType;
  const colors = expertiseColors[expertise];

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        ...styles.card,
        transition:
          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 12px 32px rgba(234, 86, 0, 0.22)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.iconWrapper}>
        <Icon size={24} color="#ea5600" aria-hidden="true" />
      </div>

      <div style={styles.right}>
        <div style={styles.nameRow}>
          <p style={styles.name}>{name}</p>

          <span style={{ ...styles.expertise, color: colors.label }}>
            {expertise}
          </span>
        </div>

        <div style={styles.trackOuter}>
          <div style={getTrackInnerStyle(progress, colors.bar)} />
        </div>
      </div>
    </div>
  );
};

export default SkillCard;