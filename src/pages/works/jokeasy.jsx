import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { typography } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';
import teaser from '../../assets/works/jokeasy/jokeasy_teaser.webp'; // 原头图：置于 Overview 下方
import interfaceImg from '../../assets/works/jokeasy/jokeasy_interface.webp';
import inspirationImg from '../../assets/works/jokeasy/jokeasy_inspiration.webp';
import jokemapImg from '../../assets/works/jokeasy/jokeasy_jokemap.webp';
import pipelineImg from '../../assets/works/jokeasy/jokeasy_pipeline.webp';
import studyImg from '../../assets/works/jokeasy/jokeasy_study.webp';
import baselineImg from '../../assets/works/jokeasy/jokeasy_baseline.webp';
import usecaseImg from '../../assets/works/jokeasy/jokeasy_usecase.webp';

/* ------------------------------------------------------------------ */
/*  Vercel designmd — monochrome token set（与侨批/GenFaceUI 页一致）  */
/* ------------------------------------------------------------------ */
const V = {
    bg: '#FFFFFF',
    ink: '#000000',
    inkSoft: '#333333',
    inkMuted: '#6B6B6B',
    line: '#E8E8E8',
    lineSoft: '#F0F0F0',
    surface: '#FAFAFA',
    surface2: '#F5F5F5',
    radius: '8px',
};

const projectFacts = [
    { label: 'Team', value: 'Yate Ge, Lin Tian, Chiqian Xu, Luyao Xu, Meiying Li, Yuanda Hu, Weiwei Guo*' },
    { label: 'My Role', value: 'System Design\nPaper Writing' },
    { label: 'Time', value: '2024.12-2025.02' },
    { label: 'Publication', value: "iasdr'25 Full Paper" },
];

/* Micro label — 与侨批页一致的 Eyebrow */
const Eyebrow = ({ children, style = {} }) => (
    <div style={{
        fontFamily: typography.body.fontFamily,
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: V.inkMuted,
        ...style,
    }}>
        {children}
    </div>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export const Jokeasy = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isUltraWide = useMediaQuery('(min-width: 1728px)');
    const isDesktop = useMediaQuery('(min-width: 1400px)');
    const isLaptop = useMediaQuery('(min-width: 1100px)');

    const containerMax = isUltraWide ? 'calc(100vw - 48px)' : isDesktop ? '1400px' : isLaptop ? '1100px' : '100%';

    /* 正文段落 */
    const Body = ({ children, style = {} }) => (
        <p style={{
            fontFamily: typography.body.fontFamily,
            fontSize: '18px',
            lineHeight: '30px',
            color: V.inkSoft,
            margin: 0,
            marginBottom: '24px',
            maxWidth: '640px',
            ...style,
        }}>
            {children}
        </p>
    );

    /* 图文区 — 默认 960px 居中，可传 maxWidth 调整；标注居中；图片自身带圆角 */
    const Figure = ({ src, caption, maxWidth = 960 }) => (
        <div style={{ marginTop: '28px', maxWidth, marginLeft: 'auto', marginRight: 'auto' }}>
            <div style={{
                width: '100%',
                border: `1px solid ${V.line}`,
                borderRadius: V.radius,
                overflow: 'hidden',
                lineHeight: 0,
            }}>
                <img
                    src={src}
                    alt={caption}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: V.radius,
                    }}
                />
            </div>
            {caption && (
                <figcaption style={{
                    fontFamily: typography.body.fontFamily,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: V.inkMuted,
                    marginTop: '12px',
                    textAlign: 'center',
                }}>
                    {caption}
                </figcaption>
            )}
        </div>
    );

    /* 两段正文左右并排 */
    const TwoCols = ({ children }) => (
        <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '24px' : '48px',
            alignItems: 'start',
        }}>
            {children}
        </div>
    );

    /* 内容区块（标题在左不换行，正文在右，同行开始；宽度一致） */
    const Section = ({ eyebrow, children }) => (
        <section style={{
            maxWidth: containerMax,
            margin: '0 auto',
            padding: isMobile ? '96px 24px 0' : '144px 32px 0',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '340px 1fr',
            gap: isMobile ? '20px' : '72px',
            alignItems: 'start',
        }}>
            <h2 style={{
                fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                fontSize: isMobile ? '28px' : '40px',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: V.ink,
                margin: 0,
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                paddingTop: isMobile ? 0 : '4px',
            }}>
                {eyebrow}
            </h2>
            <div>
                {children}
            </div>
        </section>
    );

    return (
        <div style={{
            minHeight: '100vh',
            background: V.bg,
            color: V.ink,
            paddingBottom: isMobile ? '80px' : '128px',
        }}>
            <Navbar theme="light" />

            <main>
                {/* 1 — Project name */}
                <section style={{ padding: isMobile ? '112px 24px 48px' : '150px 32px 80px' }}>
                    <div style={{ maxWidth: containerMax, margin: '0 auto' }}>
                        <Eyebrow style={{ marginBottom: '24px' }}>
                            AI Design Engineering
                        </Eyebrow>
                        <h1 style={{
                            fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                            fontWeight: 600,
                            letterSpacing: '-0.03em',
                            color: V.ink,
                            margin: 0,
                        }}>
                            <span style={{
                                display: 'block',
                                fontSize: isMobile ? '45px' : '90px',
                                lineHeight: isMobile ? '68px' : '122px',
                                letterSpacing: '-0.03em',
                                whiteSpace: 'nowrap',
                            }}>
                                Jokeasy
                            </span>
                            <span style={{
                                display: 'block',
                                fontSize: isMobile ? '20px' : '34px',
                                lineHeight: isMobile ? '28px' : '44px',
                                fontWeight: 500,
                                letterSpacing: '0.02em',
                                marginTop: isMobile ? '8px' : '16px',
                            }}>
                                搜索增强的人机协作主题笑话创作工具
                            </span>
                        </h1>
                    </div>
                </section>

                {/* 2 — Basic info */}
                <section>
                    <div style={{
                        maxWidth: containerMax,
                        margin: '0 auto',
                        borderTop: `1px solid ${V.line}`,
                        borderBottom: `1px solid ${V.line}`,
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                    }}>
                        {projectFacts.map((item, index) => (
                            <div
                                key={item.label}
                                style={{
                                    minHeight: isMobile ? '96px' : '120px',
                                    padding: isMobile ? '20px 14px' : '26px 24px',
                                    borderRight: (index === projectFacts.length - 1) || (isMobile && index % 2 === 1)
                                        ? 'none'
                                        : `1px solid ${V.line}`,
                                    borderBottom: isMobile && index < 2 ? `1px solid ${V.line}` : 'none',
                                }}
                            >
                                <Eyebrow style={{ marginBottom: '12px' }}>
                                    {item.label}
                                </Eyebrow>
                                <div style={{
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: isMobile ? '16px' : '19px',
                                    lineHeight: isMobile ? '26px' : '30px',
                                    color: V.ink,
                                    fontWeight: 500,
                                    whiteSpace: 'pre-line',
                                }}>
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3 — Cover（已去掉） */}

                {/* 4 — Overview（标题样式） */}
                <section style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '96px 24px 0' : '144px 32px 0',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '340px 1fr',
                    gap: isMobile ? '20px' : '72px',
                    alignItems: 'start',
                }}>
                    <h2 style={{
                        fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                        fontSize: isMobile ? '28px' : '40px',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: V.ink,
                        margin: 0,
                        lineHeight: 1.1,
                        whiteSpace: 'nowrap',
                        paddingTop: isMobile ? 0 : '4px',
                    }}>
                        Overview
                    </h2>
                    <TwoCols>
                        <Body>
                            Jokeasy is a search-enabled human-AI collaboration tool for thematic joke writing. It integrates a dual-role LLM agent as both material scout and prototype writer, providing a visual canvas where retrieved web content becomes editable inspiration blocks within a multistage workflow. A qualitative study with 18 participants (hobbyists, professional comedians, and HCI/AI specialists) showed that the approach enriches ideation while preserving author agency. The interactive prototype was built as a Figma widget plugin for rapid testing.
                        </Body>
                        <Body>
                            Jokeasy 是一个搜索增强的人机协作主题笑话创作工具。系统内置的 LLM 智能体同时充当“素材猎手”和“初稿写手”，将实时检索到的网络内容转化为可视化画布上可编辑的灵感卡片，创作者通过多阶段工作流逐步打磨作品。18 位参与者（含职业喜剧演员和 HCI/AI 学者）的定性研究显示，这一流程有效激发灵感且不削弱创作者的主导权。我们通过 Figma 插件的形式构建交互原型进行测试。
                        </Body>
                    </TwoCols>
                </section>

                {/* 4.5 — Teaser（Overview 下方，居中于文字区域） */}
                <section style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '60px 24px 0' : '88px 32px 0',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '340px 1fr',
                    gap: isMobile ? '20px' : '72px',
                    alignItems: 'start',
                }}>
                    {!isMobile && <div />}
                    <Figure
                        src={interfaceImg}
                        caption="The main interface of Jokeasy: (A) Topic Ideation Panel, (B) Joke Generation Results with three parallel joke maps, (C) Echo Assistant Panel."
                    />
                </section>

                {/* 5 — System Overview */}
                <Section eyebrow="System Overview">
                    <TwoCols>
                        <div>
                            <Body>
                                Thematic joke writing is inherently context-driven: creators hunt for timely stories, memes, and references, frame them into angles that can support a setup, and then weave a concise setup-punchline structure. Although LLMs can generate jokes conversationally, ordinary chat interfaces seldom give creators enough agency, control, or timely access to such source material. Jokeasy addresses this gap by coupling a search-enabled LLM agent with a structured visual canvas.
                            </Body>
                            <Body>
                                The system is built around three interrelated design considerations:
                            </Body>
                        </div>
                        <div>
                            {[
                                ['DC1', 'a dual-role LLM agent that acts as both a material scout and a prototype writer;'],
                                ['DC2', 'a multistage collaboration workflow built on editable inspiration blocks derived from search results; and'],
                                ['DC3', 'a visual, object-based canvas that externalizes the conversation into tangible, manipulable elements.'],
                            ].map(([tag, text]) => (
                                <div key={tag} style={{
                                    display: 'flex',
                                    gap: '12px',
                                    marginBottom: '10px',
                                }}>
                                    <span style={{
                                        fontFamily: typography.body.fontFamily,
                                        fontSize: '18px',
                                        lineHeight: '30px',
                                        fontWeight: 600,
                                        color: V.ink,
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {tag}
                                    </span>
                                    <span style={{
                                        fontFamily: typography.body.fontFamily,
                                        fontSize: '18px',
                                        lineHeight: '30px',
                                        color: V.inkSoft,
                                    }}>
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </TwoCols>
                    <Figure src={teaser} />
                </Section>

                {/* 6 — Multistage Workflow */}
                <Section eyebrow="Multistage Workflow">
                    <TwoCols>
                        <Body>
                            The joke creation process unfolds in four sequential phases. In Topic Ideation, the user enters a creation topic along with preferred styles and comedic techniques; Jokeasy generates a structured topic summary for review. During Inspiration Generation and Initial Prototype Creation, the LLM agent derives three inspiration themes, expands each into search queries, retrieves web content via the Tavily API, and distills the results into concise inspiration blocks that populate an inspiration pool. Each pool is merged with the topic summary to produce a provisional joke title and prototype joke content, together forming a joke map. Three such maps are presented side by side on the canvas.
                        </Body>
                        <Body>
                            In the Inspiration Validation and Collaborative Refinement phase, the writer inspects and refines each joke map. Selecting any inspiration block opens the Echo Assistant, which displays the retrieved source material and an echo summary explaining its relevance. Writers can modify, add, or remove blocks; every change triggers the system to re-run the search and regenerate the echo summary. Finally, in Joke Synthesis, after iterative refinement the system produces the final draft of each thematic joke.
                        </Body>
                    </TwoCols>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '24px' : '32px',
                        alignItems: 'start',
                    }}>
                        <Figure
                            src={inspirationImg}
                            maxWidth="90%"
                            caption="(A) Inspiration block modification: modify, add, or remove blocks."
                        />
                        <Figure
                            src={jokemapImg}
                            maxWidth="90%"
                            caption="(B) Joke map-level reorganization: remove, manually add, or AI-generate entire maps."
                        />
                    </div>
                </Section>

                {/* 7 — System Architecture */}
                <Section eyebrow="System Architecture">
                    <TwoCols>
                        <Body>
                            The front-end of Jokeasy is developed as a Figma widget plugin; the back-end is built using Node.js with moonshot-v1-auto 3 as the LLM backbone. The system implements core functions using an LLM-chain method with structured output.
                        </Body>
                        <Body>
                            The prompt preamble is organized into six key fields: [Role], [Input Context], [Overall Rules], [Output Formatting], [Workflow], and [Example]. The search functionality is implemented using the Tavily API.
                        </Body>
                    </TwoCols>
                    <Figure
                        src={pipelineImg}
                        maxWidth={960 * 1.2}
                        caption="The LLM-based pipeline: multistage content generation (left) and search-driven echo mechanism (right)."
                    />
                </Section>

                {/* 8 — User Study */}
                <Section eyebrow="User Study">
                    <TwoCols>
                        <Body>
                            We recruited 18 participants: 13 hobbyists and 5 expert users (including professional comedians with over five years of stand-up experience, an HCI specialist, and an AI researcher). Participants interacted with both Jokeasy and a conversational baseline system in counter-balanced order, each completing a stand-up comedy joke creation task. Sessions lasted approximately one hour, combining think-aloud protocols with semi-structured interviews.
                        </Body>
                        <Body>
                            Most participants (13/18) favoured Jokeasy over the baseline. They described its four-stage workflow as “organised and sequential from inspiration to the final product” and felt it “integrated several small functions involved in joke writing.” Fourteen participants praised the canvas for its structured clarity, comparing it to a mind map. Integrated search helped users “continuously spark new ideas” and “trace back why the AI generated this inspiration.”
                        </Body>
                    </TwoCols>
                    <Figure
                        src={studyImg}
                        caption="User study scenarios with hobbyist and expert participants."
                    />
                    <Figure
                        src={baselineImg}
                        caption="The conversational baseline system used for comparison."
                    />
                    <Figure
                        src={usecaseImg}
                        caption="Step-by-step interaction comparison between the baseline (C1) and Jokeasy (C2) for participant P7."
                    />
                </Section>

                {/* Back */}
                <section style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '72px 24px 0' : '104px 32px 0',
                }}>
                    <Link
                        to="/creative"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            fontFamily: typography.body.fontFamily,
                            fontSize: '15px',
                            fontWeight: 500,
                            color: V.ink,
                            textDecoration: 'none',
                            borderBottom: `1px solid ${V.line}`,
                            paddingBottom: '4px',
                            transition: 'border-color 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = V.ink)}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = V.line)}
                    >
                        ← Back to Creative
                    </Link>
                </section>
            </main>
        </div>
    );
};
