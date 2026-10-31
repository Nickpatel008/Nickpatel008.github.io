# Design System: Warm Editorial × Cool Technical (Portfolio V2)
**Framework**: Pure Semantic HTML5 &middot; Modern CSS3 Custom Properties &middot; Zero Heavy Dependencies  
**Standard**: WCAG 2.2 AA / AAA Accessible Contrast &middot; 60fps Native Rendering  
**Theme Support**: Primary Light Theme &middot; Secondary Dark Theme &middot; Dynamic Toggle

---

## 1. Approved Color System Tokens

```css
/* PRIMARY THEME: Warm Editorial Light (Default) */
:root {
  /* Surfaces */
  --canvas-base:        #F4F2EC; /* Warm editorial background */
  --canvas-surface:     #FBFAF7; /* Clean card & container surface */
  --canvas-muted:       #E8E4DA; /* Muted surface for tags, code, telemetry */
  --canvas-surface-up:  #EFECE4; /* Subtle elevated hover surface */

  /* Borders & Dividers */
  --rule-subtle:        #DCD9D0; /* Standard dividing rules */
  --rule-medium:        #CDC8BC; /* Card and component borders */
  --rule-strong:        #A8A193; /* Focus and interactive borders */

  /* Typography */
  --text-primary:       #171A1F; /* Strong near-black headers & emphasis */
  --text-secondary:     #626A73; /* Refined secondary text (4.64:1 contrast) */
  --text-muted:         #626A73; /* Captions & metadata */
  --text-code:          #171A1F; /* Monospace technical identifiers */
  --text-on-accent:     #FFFFFF; /* White on electric blue (4.76:1 contrast) */

  /* Interactions */
  --accent:             #4263EB; /* Approved electric blue */
  --accent-interactive: #4263EB;
  --accent-hover:       #364FC7;
  --accent-subtle:      rgba(66, 99, 235, 0.09);

  /* Status */
  --signal-active:      #059669; /* Emerald status beacon */
  --signal-active-bg:   rgba(5, 150, 105, 0.10);
}

/* SECONDARY THEME: Deep Charcoal Dark */
[data-theme="dark"] {
  /* Surfaces */
  --canvas-base:        #15191E; /* Deep charcoal background */
  --canvas-surface:     #1D232A; /* Surface for cards & forms */
  --canvas-muted:       #252C34; /* Muted surface for tags, telemetry & code */
  --canvas-surface-up:  #2D353F; /* Elevated hover surface */

  /* Borders & Dividers */
  --rule-subtle:        #343A43; /* Standard hairline rules */
  --rule-medium:        #454D59; /* Card borders */
  --rule-strong:        #5C6777; /* Focus and interactive borders */

  /* Typography */
  --text-primary:       #F1EEE6; /* Warm off-white */
  --text-secondary:     #A7AFB8; /* Slate gray (7.46:1 contrast) */
  --text-muted:         #A7AFB8; /* Captions & timestamps */
  --text-code:          #F1EEE6;
  --text-on-accent:     #15191E; /* Deep charcoal on light electric blue (7.88:1) */

  /* Interactions */
  --accent:             #8EA2FF; /* Approved electric blue for dark mode */
  --accent-interactive: #8EA2FF;
  --accent-hover:       #ADC0FF;
  --accent-subtle:      rgba(142, 162, 255, 0.14);

  /* Status */
  --signal-active:      #10B981;
  --signal-active-bg:   rgba(16, 185, 129, 0.12);
}
```

---

## 2. Typography Scale & Hierarchy

Strictly two complementary font families:
1. **Primary Font (Headings & Narrative Copy)**:
   `font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;`
2. **Secondary Font (Technical Specs, Code & Telemetry)**:
   `font-family: 'JetBrains Mono', "SF Mono", Consolas, Menlo, monospace;`

### Type Scale Specification

| Role | Font Family | Size | Weight | Line Height | Tracking | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Name** | Inter | `clamp(2.25rem, 4vw, 3.25rem)` | `700` | `1.1` | `-0.035em` | Hero Name Identity |
| **Section Title** | Inter | `clamp(1.25rem, 2vw, 1.5rem)` | `600` | `1.25` | `-0.025em` | Major Section Headers |
| **Case Study Heading**| Inter | `1.1875rem` (19px) | `600` | `1.3` | `-0.015em` | Project & Role Titles |
| **Body Paragraph** | Inter | `0.9375rem` (15px) | `400` | `1.65` | `-0.01em` | Narrative Reading Copy |
| **Sub-body / Specs**| Inter | `0.875rem` (14px) | `400` | `1.6` | `0` | Card Descriptions & Bullets |
| **Technical Label** | JetBrains Mono | `0.6875rem` (11px) | `500` | `1.35` | `+0.04em` | Metadata, Tags, Metrics |
| **Metric Value** | JetBrains Mono | `1.5rem` (24px) | `600` | `1.1` | `-0.02em` | Numeric Telemetry Counters |

*Line-length rule*: Body narrative copy is strictly limited to a maximum width of `68ch` to maintain optimal reading ergonomics.

---

## 3. Spacing Scale (8-Point Harmonic Rhythm)

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-28: 112px;
}
```

---

## 4. Component Primitives

### A. Case Study Card
* **Background**: `var(--canvas-surface)`
* **Border**: $1\text{px}$ solid `var(--rule-subtle)`
* **Border Radius**: `10px`
* **Padding**: `24px` on desktop, `16px` on mobile.
* **Hover State**: Border transitions to `var(--rule-strong)`, background to `var(--canvas-surface-up)`.

### B. Action Buttons
* **Primary Button**: `background: var(--accent)`, `color: var(--text-on-accent)`, font: JetBrains Mono `0.8125rem`, weight `600`.
* **Secondary Button**: `background: var(--canvas-surface)`, `border: 1px solid var(--rule-medium)`, hover: `border-color: var(--accent); color: var(--accent);`.

### C. Theme Switcher
* **Button**: Minimalist toggle in sidebar header showing current theme status and switching effortlessly with full keyboard and screen reader accessibility.
