import { FaCss3Alt, FaDatabase, FaGitAlt, FaHtml5, FaJsSquare, FaJava, FaPython, FaReact, FaFire ,FaGithub, FaNodeJs, } from "react-icons/fa";
import { SiDart, SiFlutter } from "react-icons/si";

interface Skill {
  name: string;
  level: string;
  percent: number; // 熟練度百分比
  icon: JSX.Element;
}

export const skills = {
  frontend: [
    { name: 'React', level: '中等', percent: 60, icon: <FaReact size={32} style={{ color: "rgba(97, 219, 251, 0.7)" }} /> },
    { name: 'HTML5', level: '中等', percent: 55, icon: <FaHtml5 size={32} style={{ color: "rgba(227, 79, 38, 0.7)" }} /> },
    { name: 'CSS3', level: '中等', percent: 50, icon: <FaCss3Alt size={32} style={{ color: "rgba(21, 114, 182, 0.7)" }} /> },
    { name: 'JavaScript', level: '中等', percent: 55, icon: <FaJsSquare size={32} style={{ color: "rgba(247, 223, 30, 0.7)" }} /> },
    { name: 'Dart', level: '中等', percent: 60, icon: <SiDart size={32} style={{ color: "#0175C2" }} /> },
  ],
  backend: [
    { name: 'Java', level: '中等', percent: 70, icon: <FaJava size={32} style={{ color: "rgba(51, 153, 51, 0.7)" }} /> },
    { name: 'Python', level: '中等', percent: 75, icon: <FaPython size={32} style={{ color: "rgba(55, 118, 171, 0.7)" }} /> },
    { name: 'Database', level: '普通', percent: 40, icon: <FaDatabase size={32} style={{ color: "rgba(77, 179, 61, 0.7)" }} /> },
  ],
  frame: [
    { name: 'Next.js', level: '中等', percent: 60, icon: <FaReact size={32} style={{ color: "rgba(97, 219, 251, 0.7)" }} /> },
  { name: 'Flutter', level: '中等', percent: 60, icon: <SiFlutter size={32} style={{ color: "#02569B" }} /> },
  { name: 'Flame', level: '中等', percent: 55, icon: <FaFire size={32} style={{ color: "#EE4E2C" }} /> },
    { name: 'Express', level: '普通', percent: 30, icon: <FaNodeJs size={32} style={{ color: "rgba(51, 153, 51, 0.7)" }} /> },
  ],
  tools: [
    { name: 'Git', level: '中等', percent: 65, icon: <FaGitAlt size={32} style={{ color: "rgba(240, 80, 50, 0.7)" }} /> },
    { name: 'Github', level: '中等', percent: 65, icon: <FaGithub  size={32} style={{ color: "#181717" }} /> },
  ],
};

