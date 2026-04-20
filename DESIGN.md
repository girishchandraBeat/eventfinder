# Design Brief — Event Finder

**Tone & Purpose**: Immersive, premium tech showcase for event discovery. Dark glassmorphic aesthetic with vibrant neon accents. Conveys trust, energy, and visual sophistication for exploring and attending events.

**Color Palette**

| Token | OKLCH | Hex Approx | Usage |
|---|---|---|---|
| Background | 0.08 0 0 | #0a0a1a | Deep navy/black base |
| Card | 0.12 0.01 290 | #0f0f25 | Glassmorphic card backdrop |
| Foreground | 0.95 0 0 | #f2f2f2 | Primary text |
| Primary | 0.7 0.24 270 | #a855f7 | Purple accent, CTAs |
| Accent | 0.72 0.25 262 | #06b6d4 | Cyan glow, secondary highlights |
| Border | 0.2 0.01 270 | #1a1a3e | Subtle card borders |

**Category Badges**: Music=purple, Tech=blue, Food=orange, Art=pink, Sports=green, Comedy=yellow, Wellness=teal, Gaming=red, Business=indigo. Semi-transparent backgrounds with semi-opaque borders.

**Typography**

| Layer | Font | Usage |
|---|---|---|
| Display | General Sans Bold | Hero heading, section titles, category labels |
| Body | Inter Regular | Body copy, descriptions, metadata |
| Mono | JetBrains Mono | Code/tokens, technical details |

**Structural Zones**

| Zone | Background | Border | Elevation | Notes |
|---|---|---|---|---|
| Navigation | Dark glass 0.12/0.01/290 | border-white/20 | Backdrop blur 16px | Sticky, semi-transparent |
| Hero | Gradient purple→blue→cyan | None | Full-bleed gradient | Bold oversized text with gradient clip |
| Card Grid | background 0.08/0/0 | None | Background level | 3-col desktop, 2-col tablet, 1-col mobile |
| Event Cards | Glass 0.12/0.01/290 | border-white/20 | Elevated with glow | Neon glow on hover (purple/cyan shadow) |
| Footer | background 0.08/0/0 | border-t subtle | Muted | Mirror nav treatment |

**Motion & Animation**

- Smooth transitions: all 0.3s ease-out cubic-bezier(0.4, 0, 0.2, 1)
- Hover: card scale 1.03 + glow shadow purple-500/30 or cyan-500/30
- Pulse: "LIVE NOW" badge pulses with 2s glow animation
- Fade-in + slide-up on card mount (animate-in duration-500)

**Component Patterns**

- Cards: `.glass` utility (rounded-xl, border white/20, bg white/10, backdrop-blur-xl)
- Glows: `.glow-primary` (shadow-purple-500/20) and `.glow-accent` (shadow-cyan-500/20)
- Badges: Color-coded category badges with pill shape, semi-transparent fill, border
- Buttons: Gradient background with smooth transition, neon glow on hover
- Search/Input: Glass effect with white/20 border, subtle focus glow

**Signature Detail**: Neon purple/cyan dual-color hover glow on cards creates immersive, premium feel. Glassmorphism throughout establishes cohesive, tech-forward aesthetic without feeling cold.
