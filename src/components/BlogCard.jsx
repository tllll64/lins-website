import React from 'react';

export const BlogCard = ({ title, date, image, className = "" }) => {
    return (
        <div className={`group cursor-pointer ${className}`}>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-ds-white/10 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                )}
            </div>
            <div>
                <h3 className="font-ds-sans font-medium text-ds-white mb-2 group-hover:text-ds-dusty transition-colors">{title}</h3>
                <span className="text-xs text-ds-dusty">{date}</span>
            </div>
        </div>
    );
};
