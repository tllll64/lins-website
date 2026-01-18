import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ProjectCard = ({ title, subtitle, image, link, className = "" }) => {
    return (
        <div className={`group relative block w-full bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 ${className}`}>
            {/* Image Container */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                )}
            </div>

            {/* Content */}
            <div className="flex items-center justify-between p-6 md:p-8">
                <div>
                    <h3 className="font-ds-sans font-semibold text-lg md:text-xl text-ds-cod mb-1">{title}</h3>
                    {subtitle && <p className="text-ds-dusty text-sm">{subtitle}</p>}
                </div>

                <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="text-ds-cod" />
                </div>
            </div>

            {link && <a href={link} className="absolute inset-0 z-10"><span className="sr-only">View project</span></a>}
        </div>
    );
};
