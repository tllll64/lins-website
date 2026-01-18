import React from 'react';
import { Navbar } from '../components/Navbar';
import { Section } from '../components/Section';
import { ASSETS } from '../constants/assets';
import { Twitter, Github, Mail, Phone, MessageCircle } from 'lucide-react';

export const About = () => {
    return (
        <div className="min-h-screen bg-ds-cararra">
            <Navbar />

            {/* Profile Section */}
            <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-32 md:pt-48 pb-20">
                <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12 md:gap-24">
                    <div className="flex-1 space-y-8">
                        <h1 className="font-ds-display text-4xl md:text-6xl text-ds-cod">ABOUT ME</h1>

                        <div className="space-y-6 font-ds-sans text-ds-cod leading-relaxed opacity-90">
                            <p>
                                Hey, I'm Chloe Tian. I'm a digital designer and AI engineer, dedicated to merging human-centered design with cutting-edge technology.
                            </p>
                            <p>
                                Based in Shanghai, I'm currently studying Interaction Design @<span className="font-semibold underline decoration-2 decoration-ds-black-40">D&I</span>, with a focus on 🤖 HAI research @<span className="font-semibold underline decoration-2 decoration-ds-black-40">CDI</span>.
                            </p>
                            <p>
                                I'm passionate about redefining the way we interact with technology, making it more intuitive, seamless, and integrated into our everyday lives.
                            </p>
                        </div>

                        <div className="pt-4 space-y-3">
                            <h3 className="font-ds-sans font-bold italic text-lg">Seeking 2025 internship opportunities!</h3>
                            <div className="flex flex-wrap gap-6 text-sm text-ds-dusty">
                                <div className="flex items-center gap-2">
                                    <Phone size={16} /> <span>(+86) 15968545540</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MessageCircle size={16} /> <span>LittleLionTOP</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={16} /> <span>Astronaut7L@163.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full md:w-auto flex justify-center md:justify-end">
                        <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500">
                            <img src={ASSETS.profile} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Work With */}
            {/* Note: Logos were not fully extracted, using text placeholder/structure for now based on intent */}
            <Section title="WORK WITH" className="text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder for logos if needed, or text */}
                    <div className="h-12 flex items-center justify-center font-ds-display text-xl">ByteDance</div>
                    <div className="h-12 flex items-center justify-center font-ds-display text-xl">Microsoft</div>
                    <div className="h-12 flex items-center justify-center font-ds-display text-xl">NIO</div>
                    <div className="h-12 flex items-center justify-center font-ds-display text-xl">Xiaomi</div>
                </div>
            </Section>

            {/* Latest News */}
            <Section title="LATEST NEWS">
                <div className="space-y-8 max-w-3xl mx-auto">
                    {[
                        { date: "[01/2026]", emoji: "✨", text: "My first CHI! 四月份巴黎梦幻见！感谢学术之途的每一位引路人，给世界贡献一份 contribution （本 N 人的终极梦想）正在一步步实现中 ✨" },
                        { date: "[11/2025]", emoji: "🎉", text: "CHI 首轮 拿到了 ARR A ARR ARR ！完全超乎预期的成绩～ 持续奋战中 💪" },
                        { date: "[11/2025]", emoji: "🔮", text: "本人的毕设研究课题 “元设计驱动的生成式设计研究” 开动啦！和小前 UIST、CHI 论文一脉相承的研究方向，持续一年半，期待由我主导的、严谨细腻的、为真实世界作出贡献的研究成果..." },
                        { date: "[10/2025]", emoji: "🎵", text: "字节跳动 TikTok AI 业务实习啦，很庆幸自己在过去的一年里积累了很多关于 AI 的知识和思考，能被面试官看到。" }
                    ].map((item, index) => (
                        <div key={index} className="flex gap-4 items-start group">
                            <span className="font-ds-mono font-bold text-ds-cod whitespace-nowrap">{item.emoji} {item.date}</span>
                            <p className="text-ds-black-40 group-hover:text-ds-cod transition-colors">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Extra Extra - Photo Grid */}
            <Section title="EXTRA EXTRA !" subtitle="When I'm not working, you'd find me 🏃 citywalking, 💗 volunteering, 🧘 traveling, 🎵 listening to R&B songs, 🍮 relishing desserts, and 👧 taking care of my nephew (德华带娃).">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="aspect-square rounded-2xl overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-300">
                        <img src={ASSETS.photo1} alt="Life 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden -rotate-2 hover:rotate-0 transition-transform duration-300">
                        <img src={ASSETS.photo2} alt="Life 2" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden rotate-1 hover:rotate-0 transition-transform duration-300">
                        <img src={ASSETS.photo3} alt="Life 3" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden -rotate-1 hover:rotate-0 transition-transform duration-300">
                        <img src={ASSETS.photo4} alt="Life 4" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-300">
                        <img src={ASSETS.photo5} alt="Life 5" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden -rotate-2 hover:rotate-0 transition-transform duration-300">
                        <img src={ASSETS.photo6} alt="Life 6" className="w-full h-full object-cover" />
                    </div>
                </div>
            </Section>


            {/* Footer */}
            <footer className="bg-ds-cod text-ds-cararra pt-24 pb-12">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <h2 className="font-ds-display text-2xl md:text-3xl mb-4">CONTACT ME</h2>
                        <p className="text-ds-dusty text-sm max-w-md">
                            Thanks for reaching the end of the page. If you want to learn more, email me or verify what I'm working on, feel free to get in touch!
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 text-sm text-ds-dusty">
                        <div className="flex items-center gap-2 hover:text-ds-white transition-colors cursor-pointer">
                            <Phone size={16} /> <span>(+86) 15968545540</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-ds-white transition-colors cursor-pointer">
                            <MessageCircle size={16} /> <span>LittleLionTOP</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-ds-white transition-colors cursor-pointer">
                            <Mail size={16} /> <span>Astronaut7L@163.com</span>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6 md:px-12 max-w-7xl mt-12 text-xs text-ds-dusty/40 text-center md:text-left">
                    Designed and Coded by Chloe Tian • 2025 · Copyright @ 2025
                </div>
            </footer>
        </div>
    );
};
