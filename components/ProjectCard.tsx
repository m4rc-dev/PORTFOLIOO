
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative w-full mb-16 md:mb-32">
      <div className="overflow-hidden rounded-2xl aspect-[16/9] bg-neutral-900 border border-white/5 transition-all duration-700 hover:border-white/20">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
        />
      </div>
      
      <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium text-neutral-500 font-mono tracking-wider">{project.year}</span>
            <div className="h-[1px] w-8 bg-neutral-800"></div>
            <div className="flex gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] text-neutral-400 uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-semibold mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
            {project.title}
          </h3>
          <p className="text-neutral-400 text-lg leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="flex items-start">
          <a href={project.link} className="flex items-center justify-center w-14 h-14 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-[-45deg]">
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
