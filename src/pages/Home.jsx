import React from 'react';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { GridCard } from '../components/GridCard';
import { BlogCard } from '../components/BlogCard';
import { Navbar } from '../components/Navbar';
import { ASSETS } from '../constants/assets';
import { Twitter, Github, Mail } from 'lucide-react';

export const Home = () => {
    return (
        <div className="min-h-screen bg-ds-cararra">
            <Navbar />

            {/* Hero / Header */}
            <header className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto" id="works">
                <h1 className="font-ds-display text-4xl md:text-6xl text-ds-cod mb-6">SELECTED WORKS</h1>
                <p className="font-ds-sans text-ds-dusty text-sm md:text-base">
                    2023-2024年 实习项目产出和复盘思考
                </p>
            </header>

            {/* Selected Works - Vertical Stack */}
            <div className="px-6 md:px-12 max-w-7xl mx-auto space-y-12 md:space-y-24 mb-32">
                <ProjectCard
                    title="TikTok ToB Dataviz"
                    subtitle="数据可视化产品设计实习"
                    image={ASSETS.tiktok}
                />
                <ProjectCard
                    title="Procreate"
                    subtitle="iOS移动端产品设计复刻"
                    image={ASSETS.pro}
                />
                <ProjectCard
                    title="Dashboard UI"
                    subtitle="B端CRM系统界面设计"
                    image={ASSETS.dashboard}
                />
            </div>

            <div id="explorations">
                {/* AI Projects */}
                <Section title="AI PROJECTS" subtitle="研究与实践生成式 AI在Web/App界面的应用与落地">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        <GridCard
                            title="AI Creative Tool"
                            category="AI Application"
                            image={ASSETS.ai1}
                        />
                        <GridCard
                            title="Generative Music"
                            category="Web Interface"
                            image={ASSETS.ai2}
                        />
                    </div>
                </Section>

                {/* Digital Projects */}
                <Section title="DIGITAL PROJECTS" subtitle="多端适配与交互 logic 探究">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        <GridCard
                            title="Xiaomi Smart Home"
                            category="IoT App"
                            image={ASSETS.digital1}
                        />
                        <GridCard
                            title="NIO Cockpit"
                            category="HMI Design"
                            image={ASSETS.digital2}
                        />
                        <GridCard
                            title="7.23 Event"
                            category="Campaign"
                            image={ASSETS.digital3}
                        />
                        <GridCard
                            title="AR Glasses"
                            category="Hardware Interface"
                            image={ASSETS.digital4}
                        />
                    </div>
                </Section>
            </div>

            {/* Reflection Blog & Footer (Dark Section) */}
            <footer className="bg-ds-cod text-ds-cararra pt-24 pb-12" id="about">
                <Section title="REFLECTION BLOG" subtitle="AIGC 期间的思考与 HMI 和智能交互设计相关的沉淀" dark className="!py-0 !px-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                        <BlogCard
                            title="Reflection on AI Tools"
                            date="2023.10.24"
                            image={ASSETS.blog1}
                        />
                        <BlogCard
                            title="Interface Design Trends"
                            date="2023.11.15"
                            image={ASSETS.blog2}
                        />
                        <BlogCard
                            title="Design Systems in 2024"
                            date="2024.01.10"
                            image={ASSETS.blog1}
                        />
                        <BlogCard
                            title="The Future of HMI"
                            date="2024.02.01"
                            image={ASSETS.blog2}
                        />
                        <BlogCard
                            title="My Internship Journey"
                            date="2024.02.15"
                            image={ASSETS.blog1}
                        />
                        <BlogCard
                            title="Minimalism in 2024"
                            date="2024.03.01"
                            image={ASSETS.blog2}
                        />
                    </div>
                </Section>

                <div className="container mx-auto px-6 md:px-12 max-w-7xl border-t border-ds-white/10 pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <h2 className="font-ds-display text-2xl md:text-3xl mb-4">CONTACT ME</h2>
                        <p className="text-ds-dusty text-sm max-w-md">
                            Thanks for reaching the end of the page. If you want to learn more, email me or verify what I'm working on, feel free to get in touch!
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 text-sm text-ds-dusty">
                        <div className="flex items-center gap-2 hover:text-ds-white transition-colors cursor-pointer">
                            <Mail size={16} /> <span>email@example.com</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-ds-white transition-colors cursor-pointer">
                            <Twitter size={16} /> <span>@design_handle</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-ds-white transition-colors cursor-pointer">
                            <Github size={16} /> <span>/developer-profile</span>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6 md:px-12 max-w-7xl mt-12 text-xs text-ds-dusty/40 text-center md:text-left">
                    © 2024 Lin's Design. All rights reserved.
                </div>
            </footer>

        </div>
    );
};
