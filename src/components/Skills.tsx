import {
  SiHtml5,
  SiCss,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiAngular,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiD3,
  SiStorybook,
  SiFigma,
  SiGraphql,
  SiGit,
  SiJenkins,
  SiJira,
  SiSwagger,
  SiPostman,
  SiVercel,
  SiGithubcopilot,
  SiPhp,
  SiPython,
  SiDjango,
  SiFastapi,
  SiSqlite,
  SiMysql,
  SiCockroachlabs,
  SiApachedruid,
  SiEslint,
  SiWebpack,
  SiRxdb,
} from "react-icons/si";

import {
  TbLayoutSidebar,
  TbComponents,
  TbBoxModel2,
  TbHierarchy3,
  TbApi,
  TbPlugConnected,
  TbCloudCog,
  TbBrain,
  TbRobot,
  TbWorld,
  TbAccessible,
  TbTestPipe,
  TbGauge,
  TbBuildingSkyscraper,
  TbRefresh,
  TbTopologyStar3,
  TbBrandAdobe,
} from "react-icons/tb";

import SkillCard from "../features/scroll-animation/components/skillCard";
import type { SkillCardProps } from "../features/scroll-animation/components/skillCard";

const skillData: SkillCardProps[] = [
  // Frontend
  { icon: SiHtml5, name: "HTML5", expertise: "Advanced", progress: 90 },
  { icon: SiCss, name: "CSS3", expertise: "Advanced", progress: 88 },
  { icon: SiSass, name: "SCSS", expertise: "Expert", progress: 92 },
  { icon: SiJavascript, name: "JavaScript", expertise: "Expert", progress: 95 },
  { icon: SiTypescript, name: "TypeScript", expertise: "Expert", progress: 96 },
  { icon: SiAngular, name: "Angular (v11–19)", expertise: "Expert", progress: 95 },
  { icon: SiReact, name: "React", expertise: "Expert", progress: 88 },

  // Core
  { icon: TbRefresh, name: "Reactive Forms", expertise: "Advanced", progress: 88 },
  { icon: SiRxdb, name: "RxJS", expertise: "Advanced", progress: 86 },
  { icon: TbLayoutSidebar, name: "Lazy Loading", expertise: "Advanced", progress: 84 },
  { icon: TbComponents, name: "Reusable Components", expertise: "Expert", progress: 95 },
  { icon: TbBoxModel2, name: "BEM", expertise: "Advanced", progress: 82 },
  { icon: TbHierarchy3, name: "Atomic Design", expertise: "Advanced", progress: 84 },
  { icon: TbTopologyStar3, name: "Design Systems", expertise: "Expert", progress: 92 },

  // Architecture & State
  { icon: TbTopologyStar3, name: "Micro-frontends", expertise: "Expert", progress: 90 },
  { icon: TbRefresh, name: "NgRx", expertise: "Advanced", progress: 85 },

  // UI
  { icon: SiBootstrap, name: "Bootstrap", expertise: "Advanced", progress: 82 },
  { icon: SiTailwindcss, name: "Tailwind CSS", expertise: "Expert", progress: 90 },
  { icon: SiD3, name: "D3.js", expertise: "Advanced", progress: 78 },
  { icon: SiStorybook, name: "Storybook", expertise: "Advanced", progress: 76 },
  { icon: SiFigma, name: "Figma", expertise: "Advanced", progress: 80 },
  { icon: TbBrandAdobe, name: "Adobe XD", expertise: "Advanced", progress: 74 },

  // API
  { icon: TbApi, name: "REST APIs", expertise: "Advanced", progress: 88 },
  { icon: TbPlugConnected, name: "WebSockets", expertise: "Advanced", progress: 78 },
  { icon: SiGraphql, name: "GraphQL", expertise: "Advanced", progress: 70 },
  { icon: TbApi, name: "OpenAPI", expertise: "Advanced", progress: 80 },

  // Tools
  { icon: SiGit, name: "Git", expertise: "Advanced", progress: 88 },
  { icon: SiJenkins, name: "Jenkins", expertise: "Advanced", progress: 76 },
  { icon: TbCloudCog, name: "CI / CD Pipelines", expertise: "Expert", progress: 90 },
  { icon: TbCloudCog, name: "DevOps Practices", expertise: "Expert", progress: 88 },
  { icon: SiJira, name: "Jira", expertise: "Advanced", progress: 84 },
  { icon: SiSwagger, name: "Swagger", expertise: "Advanced", progress: 82 },
  { icon: SiPostman, name: "Postman", expertise: "Advanced", progress: 90 },
  { icon: SiVercel, name: "Vercel", expertise: "Advanced", progress: 78 },
  { icon: TbBuildingSkyscraper, name: "MySQL Workbench", expertise: "Advanced", progress: 74 },
  { icon: TbBuildingSkyscraper, name: "Visual Studio", expertise: "Advanced", progress: 82 },
  { icon: SiGithubcopilot, name: "GitHub Copilot", expertise: "Advanced", progress: 88 },
  { icon: TbRobot, name: "Cursor AI", expertise: "Advanced", progress: 86 },
  { icon: TbBrain, name: "Claude AI", expertise: "Advanced", progress: 84 },
  { icon: TbBrain, name: "ChatGPT", expertise: "Advanced", progress: 92 },
  { icon: SiWebpack, name: "Webpack / Build", expertise: "Expert", progress: 90 },

  // Methodology
  { icon: TbRefresh, name: "Agile", expertise: "Advanced", progress: 92 },
  { icon: TbRefresh, name: "Waterfall", expertise: "Advanced", progress: 72 },

  // Backend
  { icon: SiPhp, name: "PHP", expertise: "Advanced", progress: 72 },
  { icon: SiPython, name: "Python (Django)", expertise: "Expert", progress: 88 },
  { icon: SiDjango, name: "Django REST Framework", expertise: "Advanced", progress: 84 },
  { icon: SiFastapi, name: "FastAPI", expertise: "Advanced", progress: 78 },

  // Database
  { icon: SiSqlite, name: "SQLite", expertise: "Advanced", progress: 80 },
  { icon: SiMysql, name: "MySQL", expertise: "Advanced", progress: 84 },
  { icon: SiCockroachlabs, name: "CockroachDB", expertise: "Advanced", progress: 72 },
  { icon: SiApachedruid, name: "Apache Druid", expertise: "Expert", progress: 86 },

  // Quality
  { icon: TbGauge, name: "Performance", expertise: "Advanced", progress: 88 },
  { icon: SiEslint, name: "ESLint", expertise: "Advanced", progress: 84 },
  { icon: TbTestPipe, name: "Testing", expertise: "Advanced", progress: 80 },

  // Scale & UX
  { icon: TbBuildingSkyscraper, name: "Enterprise Scale", expertise: "Advanced", progress: 90 },
  { icon: TbWorld, name: "i18n", expertise: "Advanced", progress: 82 },
  { icon: TbAccessible, name: "Accessibility", expertise: "Expert", progress: 92 },
];

const Skills = () => {
  return (
    <>
      <style>
        {`
          .skills-section {
            background: #dedede;
            padding: 48px 40px;
            font-family: Helvetica, Arial, sans-serif;
            color: #000;
          }

          .skills-label {
            font-family: 'Syne', system-ui, sans-serif;
            font-size: 22px;
            font-weight: 400;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #ea5600;
            margin: 0 0 44px;
          }

          .skills-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }

          /* Responsive Breakpoints */
          @media (max-width: 1024px) {
            .skills-section {
              padding: 48px 30px;
            }
            
            .skills-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 768px) {
            .skills-section {
              padding: 40px 20px;
            }

            .skills-label {
              font-size: 20px;
              margin: 0 0 32px;
            }

            .skills-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="skills-section" id="skills">
        <h1 className="skills-label">Skills</h1>

        <div className="skills-grid">
          {skillData.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;