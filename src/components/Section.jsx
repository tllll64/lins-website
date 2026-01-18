import React from 'react';

export const Section = ({ title, subtitle, children, className = "", dark = false }) => {
    return (
        <section className={`py-20 md:py-32 ${dark ? 'bg-ds-cod text-ds-cararra' : ''} ${className}`}>
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                {(title || subtitle) && (
                    <div className="mb-12 md:mb-20">
                        {title && (
                            <h2 className={`font-ds-display text-4xl md:text-5xl lg:text-6xl mb-4 ${dark ? 'text-ds-white' : 'text-ds-cod'}`}>
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className={`font-ds-sans text-sm md:text-base ${dark ? 'text-ds-dusty' : 'text-ds-dusty'}`}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};
