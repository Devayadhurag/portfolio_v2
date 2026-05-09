import React from "react";
import type { IconType } from "react-icons";
import "./skillCard.css";

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

const SkillCard: React.FC<SkillCardProps> = ({
  icon,
  name,
  expertise,
  progress,
}) => {
  const Icon = icon as React.ElementType;
  const colors = expertiseColors[expertise];

  return (
    <div className="skill-card">
      <div className="skill-icon-wrapper">
        <Icon size={24} color="#ea5600" aria-hidden="true" />
      </div>

      <div className="skill-right">
        <div className="skill-name-row">
          <p className="skill-name">{name}</p>

          <span className="skill-expertise" style={{ color: colors.label }}>
            {expertise}
          </span>
        </div>

        <div className="skill-track-outer">
          <div 
            className="skill-track-inner" 
            style={{ 
              width: `${Math.min(100, Math.max(0, progress))}%`,
              background: colors.bar 
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default SkillCard;