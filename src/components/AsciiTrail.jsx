import React, { useRef, useState, useEffect } from 'react';

/**
 * AsciiTrail — spits out terminal-style ASCII glyphs at the cursor as it moves
 * across the host section. Each glyph drifts + fades out. While the cursor is
 * idle it keeps emitting fainter glyphs at the last known position. Purely
 * decorative: the layer has pointer-events: none so it never blocks clicks.
 *
 * Drop it as the first child of a `position: relative` container (e.g. the hero
 * <Section>); it attaches its mousemove listener to the nearest <section>.
 */
const PALETTE = ['#3ECF8E', '#a855f7']; // spring-green + purple
// Emitted glyphs spell this message on a continuous loop (spaces stripped so
// every spawn shows a visible letter).
const MESSAGE = 'hello world i am lynn tian'.replace(/\s+/g, '').split('');
const MAX = 48;          // cap live glyphs
const MOVE_THROTTLE = 40;   // ms between spawns while moving
const IDLE_INTERVAL = 150;  // ms between spawns while idle
const IDLE_AFTER = 120;     // ms without movement => considered idle
const LIFE = 800;        // ms glyph lifetime

const AsciiTrail = () => {
    const layerRef = useRef(null);
    const idRef = useRef(0);
    const seqRef = useRef(0); // walks through MESSAGE, looping
    const lastSpawnRef = useRef(0);
    const lastMoveRef = useRef(0);
    const posRef = useRef(null); // last cursor pos within host
    const [chars, setChars] = useState([]);

    useEffect(() => {
        const layer = layerRef.current;
        const host = layer && layer.closest('section');
        if (!host) return;

        const spawn = (x, y, opacity) => {
            const id = idRef.current++;
            const glyph = {
                id,
                x,
                y,
                opacity,
                ch: MESSAGE[seqRef.current++ % MESSAGE.length],
                color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
                dx: (Math.random() - 0.5) * 44,
                dy: -18 - Math.random() * 34,
            };
            setChars((prev) => [...prev.slice(-(MAX - 1)), glyph]);
            setTimeout(() => {
                setChars((prev) => prev.filter((c) => c.id !== id));
            }, LIFE);
        };

        const onMove = (e) => {
            const rect = host.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            posRef.current = { x, y };
            lastMoveRef.current = performance.now();

            const now = performance.now();
            if (now - lastSpawnRef.current < MOVE_THROTTLE) return;
            lastSpawnRef.current = now;
            spawn(x, y, 1);
        };

        // Idle emitter — keep sputtering fainter glyphs where the cursor rests.
        const idleTimer = setInterval(() => {
            const p = posRef.current;
            if (!p) return;
            if (performance.now() - lastMoveRef.current < IDLE_AFTER) return;
            spawn(
                p.x + (Math.random() - 0.5) * 26,
                p.y + (Math.random() - 0.5) * 26,
                0.32,
            );
        }, IDLE_INTERVAL);

        host.addEventListener('mousemove', onMove);
        return () => {
            host.removeEventListener('mousemove', onMove);
            clearInterval(idleTimer);
        };
    }, []);

    return (
        <div
            ref={layerRef}
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 5,
            }}
        >
            {chars.map((c) => (
                <span
                    key={c.id}
                    style={{
                        position: 'absolute',
                        left: c.x,
                        top: c.y,
                        fontFamily: '"SFMono-Regular", Menlo, Consolas, monospace',
                        fontSize: '21px',
                        fontWeight: 700,
                        color: c.color,
                        '--dx': `${c.dx}px`,
                        '--dy': `${c.dy}px`,
                        '--o': c.opacity,
                        animation: `asciiFloat ${LIFE}ms ease-out forwards`,
                        willChange: 'transform, opacity',
                    }}
                >
                    {c.ch}
                </span>
            ))}
        </div>
    );
};

export default AsciiTrail;
