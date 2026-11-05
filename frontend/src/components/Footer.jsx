import React from 'react';
import { ExternalLink, GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <p>© {new Date().getFullYear()} CRM Management System. All rights reserved.</p>
        </div>

        {/* Featured Educational Course Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            Recommended Training:
          </span>
          <a
            href="https://uncodemy.com/course/java-training-course-in-noida"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors"
          >
            Java Training Course in Noida
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-300">•</span>
          <a
            href="https://uncodemy.com/course/java-training-course-in-delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors"
          >
            Java Training Course in Delhi
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400">RESTful Spring Boot 3 & React CRM</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
