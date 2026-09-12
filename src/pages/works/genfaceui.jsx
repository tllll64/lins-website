import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { typography } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';
import teaser from '../../assets/works/genfaceui/genfaceui_teaser.webp'; // 原头图：置于 Overview 下方
import craftCover from '../../assets/Home/GenFaceUI.webp'; // 页头图：与 Craft 页封面一致
import frameworkImg from '../../assets/works/genfaceui/genfaceui_framework.webp';
import architectureImg from '../../assets/works/genfaceui/genfaceui_architecture.webp';
import overviewImg from '../../assets/works/genfaceui/genfaceui_overview.webp';
import tasksImg from '../../assets/works/genfaceui/genfaceui_tasks.webp';

/* ------------------------------------------------------------------ */
/*  Vercel designmd — monochrome token set（与侨批详情页一致）         */
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
    { label: 'Team', value: 'Yate Ge, Lin Tian, Yi Dai, Shuhan Pan, Yiwen Zhang, Qi Wang, Weiwei Guo*, Xiaohua Sun*' },
    { label: 'My Role', value: 'System Design\nFrontend Development\nUser Study\nPaper Writing' },
    { label: 'Time', value: '2025.06-2025.09' },
    { label: 'Publication', value: "CHI'26 Full Paper (CCF-A)\nUIST'25 Poster" },
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
export const GenFaceUI = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isUltraWide = useMediaQuery('(min-width: 1728px)');
    const isDesktop = useMediaQuery('(min-width: 1400px)');
    const isLaptop = useMediaQuery('(min-width: 1100px)');

    // Framer-style tiered content width（与侨批页一致）
    const containerMax = isUltraWide ? 'calc(100vw - 48px)' : isDesktop ? '1400px' : isLaptop ? '1100px' : '100%';

    /* 正文段落 — 与侨批页 Overview 一致的样式 */
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

    /* 图文区 — 图片按自然比例展示，960px 居中（与 sharelink 一致），带说明文字 */
    const Figure = ({ src, caption }) => (
        <div style={{ marginTop: '28px', maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div style={{
                width: '100%',
                background: V.surface,
                border: `1px solid ${V.line}`,
                borderRadius: V.radius,
                overflow: 'hidden',
            }}>
                <img
                    src={src}
                    alt={caption}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
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

    /* 内容区块（标题在左不换行，正文在右，同行开始；三区块宽度一致） */
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
                                GenFaceUI
                            </span>
                            <span style={{
                                display: 'block',
                                fontSize: isMobile ? '20px' : '34px',
                                lineHeight: isMobile ? '28px' : '44px',
                                fontWeight: 500,
                                letterSpacing: '0.02em',
                                marginTop: isMobile ? '8px' : '16px',
                            }}>
                                面向智能体的生成式个性化表情界面
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
                        gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr',
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

                {/* 3 — Cover（Craft 封面，5:3 通栏，与侨批头图规格一致） */}
                <section style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '36px 24px 0' : '56px 32px 0',
                }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '5 / 3',
                        overflow: 'hidden',
                        background: V.surface,
                        border: `1px solid ${V.line}`,
                        borderRadius: V.radius,
                    }}>
                        <img
                            src={craftCover}
                            alt="GenFaceUI cover"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </div>
                </section>

                {/* 4 — Overview（标题样式与其他区块一致） */}
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
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '24px' : '48px',
                        alignItems: 'start',
                    }}>
                        <Body>
                            GenFaceUI explores generative personalized facial expression interfaces for intelligent agents from a meta-design perspective. Built on the GPFEI framework, it helps designers create facial templates, apply semantic tags, define context-expression rules, and iteratively test run-time generation within coherent, rule-bounded design spaces. A qualitative study with 12 designers showed gains in controllability and consistency while also revealing the need for better visual structure and lightweight explanations; I led the project's system design, prototype development, and paper writing. An early version was presented as a poster at UIST 2025, and the full research was published at CHI 2026.
                        </Body>
                        <Body>
                            GenFaceUI 以元设计视角切入，探索如何让设计师为智能体打造生成式个性化表情界面。我们提出 GPFEI 框架，让设计师可以创建表情模板、标注语义、制定情境与表情的映射规则，并在可控的设计空间中反复测试运行时的生成效果。12 位设计师参与的定性研究表明，系统显著提升了表情的可控性与一致性，也指出了对更直观的视觉结构和轻量化解释的需求。本人主导了系统设计、原型开发与论文撰写。早期成果以 Poster 形式发表于 UIST 2025，完整研究发表于 CHI 2026。
                        </Body>
                    </div>
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
                    <Figure src={teaser} />
                </section>

                {/* 5 — GPFEI Framework */}
                <Section eyebrow="GPFEI Framework">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '24px' : '48px',
                        alignItems: 'start',
                    }}>
                        <Body>
                            Generative facial expression interfaces introduce a different design problem from traditional asset-authored expression systems. Instead of fully specifying every facial state before deployment, designers need to define the conditions, constraints, and visual vocabulary that will guide generation at run time. To address this, we proposed the Generative Personalized Facial Expression Interface (GPFEI) framework from a meta-design perspective.
                        </Body>
                        <Body>
                            GPFEI structures the design space around three core elements: rule-bounded generative spaces, character identity, and context-expression mapping. At design time, designers define facial elements, layouts, colors, semantic tags, and mapping rules that constrain the space of possible outputs. At run time, the AI system interprets interaction context and generates facial expressions that remain aligned with those authored constraints. This reframes the designer's role from manually authoring every expression asset to designing the rules and structures through which the system can evolve expressively over time.
                        </Body>
                    </div>
                    <Figure
                        src={frameworkImg}
                        caption="Overview of the GPFEI framework."
                    />
                </Section>

                {/* 6 — GenFaceUI System */}
                <Section eyebrow="GenFaceUI System">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '24px' : '48px',
                        alignItems: 'start',
                    }}>
                        <Body>
                            To operationalize the framework, we developed GenFaceUI, a proof-of-concept meta-design tool for generative personalized facial expression interfaces. The system supports the full workflow of facial expression interface design: creating facial templates, assigning semantic tags to visual elements, authoring context-expression rules, and testing generation outcomes with the model in the loop. Rather than treating generation as an opaque backend process, GenFaceUI makes the structure of the design space visible and editable to designers.
                        </Body>
                        <Body>
                            The system combines a design canvas, semantic element management, rule authoring, and iterative preview into one environment. Designers can compose faces from modular visual elements, define how expressions should change across contexts, and preserve character consistency by explicitly constraining what can or cannot vary. This makes the system suitable not only for expressive chatbot faces, but also for role-specific service agents and more personalized AI companions.
                        </Body>
                    </div>
                    <Figure
                        src={architectureImg}
                        caption="GenFaceUI architecture."
                    />
                    <Figure
                        src={overviewImg}
                        caption="GenFaceUI interface."
                    />
                </Section>

                {/* 7 — Designer Study */}
                <Section eyebrow="Designer Study">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '24px' : '48px',
                        alignItems: 'start',
                    }}>
                        <Body>
                            We evaluated GenFaceUI through a qualitative study with 12 designers using three representative tasks: designing a basic chatbot face, customizing a service robot with role-specific visual identities, and creating a personalized AI companion. These tasks were chosen to cover different levels of complexity and different forms of character adaptation, allowing us to examine how designers engaged with meta-design practices in realistic scenarios.
                        </Body>
                        <Body>
                            The study showed that designers perceived clear gains in controllability and consistency when working with rule-based generative expressions, while also surfacing important limitations. Participants needed more structured visual mechanisms for understanding the design space and lighter-weight explanations of how system outputs were produced. These findings suggest that future generative facial expression tools should support not only flexible generation, but also stronger interpretability and designer-facing scaffolding.
                        </Body>
                    </div>
                    <Figure
                        src={tasksImg}
                        caption="Three design tasks used in the study."
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
