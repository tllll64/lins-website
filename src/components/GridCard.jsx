import React from 'react';
import { ArrowRight } from 'lucide-react';

export const GridCard = ({ title, category, image, className = "" }) => {
    return (
        <div className={`group cursor-pointer ${className}`}>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ds-white/50 mb-4 relative">
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}
                <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight size={16} className="text-ds-cod" />
                </div>
            </div>
            <div className="flex justify-between items-start">
                <h3 className="font-ds-sans font-semibold text-ds-cod">{title}</h3>
                <span className="text-xs text-ds-dusty uppercase tracking-wide">{category}</span>
            </div>
        </div>
    );
};
