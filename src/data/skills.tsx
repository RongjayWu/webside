import { FaCss3Alt, FaDatabase, FaGitAlt, FaHtml5, FaJsSquare, FaNodeJs, FaPython, FaReact } from "react-icons/fa";

interface Skill {
  name: string;
  level: string;
  percent: number; // 熟練度百分比
  icon: JSX.Element;
}

export const skills = {
  frontend: [
    { name: 'React', level: '熟練', percent: 90, icon: <FaReact size={32} style={{ color: "rgba(97, 219, 251, 0.7)" }} /> },
    { name: 'HTML5', level: '熟練', percent: 95, icon: <FaHtml5 size={32} style={{ color: "rgba(227, 79, 38, 0.7)" }} /> },
    { name: 'CSS3', level: '熟練', percent: 90, icon: <FaCss3Alt size={32} style={{ color: "rgba(21, 114, 182, 0.7)" }} /> },
    { name: 'JavaScript', level: '熟練', percent: 90, icon: <FaJsSquare size={32} style={{ color: "rgba(247, 223, 30, 0.7)" }} /> },
  ],
  backend: [
    { name: 'Node.js', level: '熟練', percent: 85, icon: <FaNodeJs size={32} style={{ color: "rgba(51, 153, 51, 0.7)" }} /> },
    { name: 'Python', level: '中等', percent: 75, icon: <FaPython size={32} style={{ color: "rgba(55, 118, 171, 0.7)" }} /> },
    { name: 'Database', level: '中等', percent: 70, icon: <FaDatabase size={32} style={{ color: "rgba(77, 179, 61, 0.7)" }} /> },
  ],
  tools: [
    { name: 'Git', level: '熟練', percent: 90, icon: <FaGitAlt size={32} style={{ color: "rgba(240, 80, 50, 0.7)" }} /> },
  ],
};

