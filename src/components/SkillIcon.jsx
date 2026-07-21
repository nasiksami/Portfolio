import {
  SiPython, SiJavascript, SiSharp, SiCplusplus, SiOpenjdk, SiHtml5,
  SiTensorflow, SiPytorch, SiKeras, SiScikitlearn, SiLangchain, SiOpencv,
  SiStreamlit, SiDjango, SiFlask, SiDotnet, SiAngular, SiMysql, SiMongodb,
  SiElasticsearch, SiQdrant, SiDocker, SiJenkins, SiRabbitmq, SiLinux,
  SiGit, SiPostman, SiWireshark, SiGooglecolab,
} from 'react-icons/si';
import { FaAws, FaCss3Alt, FaDatabase } from 'react-icons/fa';
import { DiHeroku } from 'react-icons/di';
import { VscVscode } from 'react-icons/vsc';

/**
 * Slug → icon component.
 *
 * Simple Icons has removed several brand marks (Oracle, Tableau, Power BI,
 * AWS, Heroku, CSS3) over trademark policy, so those come from the Font
 * Awesome / Devicons / VS Code sets, or fall back to a monogram below.
 */
const ICONS = {
  python: SiPython,
  javascript: SiJavascript,
  csharp: SiSharp,
  cplusplus: SiCplusplus,
  java: SiOpenjdk,
  html5: SiHtml5,
  css3: FaCss3Alt,
  tensorflow: SiTensorflow,
  pytorch: SiPytorch,
  keras: SiKeras,
  scikitlearn: SiScikitlearn,
  langchain: SiLangchain,
  opencv: SiOpencv,
  streamlit: SiStreamlit,
  django: SiDjango,
  flask: SiFlask,
  dotnet: SiDotnet,
  angular: SiAngular,
  mysql: SiMysql,
  mongodb: SiMongodb,
  elasticsearch: SiElasticsearch,
  qdrant: SiQdrant,
  chromadb: FaDatabase,
  oracle: FaDatabase,
  docker: SiDocker,
  jenkins: SiJenkins,
  rabbitmq: SiRabbitmq,
  linux: SiLinux,
  aws: FaAws,
  heroku: DiHeroku,
  git: SiGit,
  postman: SiPostman,
  vscode: VscVscode,
  wireshark: SiWireshark,
  colab: SiGooglecolab,
};

/** Deterministic monogram for skills with no brand mark available. */
function Monogram({ name }) {
  const initials = name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="font-mono text-[0.65rem] font-bold leading-none tracking-tight"
    >
      {initials}
    </span>
  );
}

export default function SkillIcon({ icon, name, className = 'h-5 w-5' }) {
  const Icon = ICONS[icon];
  if (!Icon) return <Monogram name={name} />;
  return <Icon className={className} aria-hidden="true" />;
}
