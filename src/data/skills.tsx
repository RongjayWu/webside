import { FaCss3Alt, FaDatabase, FaGitAlt, FaHtml5, FaJsSquare, FaJava, FaPython, FaReact, FaFire ,FaGithub, FaNodeJs, } from "react-icons/fa";
import { SiDart, SiFlutter, SiGo, SiCplusplus } from "react-icons/si";

interface Skill {
  name: string;
  icon: (size: number) => JSX.Element;
}

export const skills = {
  frontend: [
    { name: 'React', icon: (size: number) => <FaReact size={size} /> },
    { name: 'HTML5', icon: (size: number) => <FaHtml5 size={size} /> },
    { name: 'CSS3', icon: (size: number) => <FaCss3Alt size={size} /> },
    { name: 'JavaScript', icon: (size: number) => <FaJsSquare size={size} /> },
    { name: 'Dart', icon: (size: number) => <SiDart size={size} /> },
  ],
  backend: [
    { name: 'Java', icon: (size: number) => <FaJava size={size} /> },
    { name: 'Python', icon: (size: number) => <FaPython size={size} /> },
    { name: 'Go', icon: (size: number) => <SiGo size={size} /> },
    { name: 'C++', icon: (size: number) => <SiCplusplus size={size} /> },
    { name: 'Database', icon: (size: number) => <FaDatabase size={size} /> },
  ],
  frame: [
    { name: 'Next.js', icon: (size: number) => <FaReact size={size} /> },
    { name: 'Flutter', icon: (size: number) => <SiFlutter size={size} /> },
    { name: 'Flame', icon: (size: number) => <FaFire size={size} /> },
    { name: 'Express', icon: (size: number) => <FaNodeJs size={size} /> },
  ],
  tools: [
    { name: 'Git', icon: (size: number) => <FaGitAlt size={size} /> },
    { name: 'Github', icon: (size: number) => <FaGithub size={size} /> },
  ],
};

