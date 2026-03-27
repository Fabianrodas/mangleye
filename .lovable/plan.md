

# Plan: Rebrand to Mangleye + Storytelling Landing Page + Light Nature Color Palette

## Summary

Three changes: (1) rename the app from "Borde Vivo AI" to "Mangleye" everywhere, (2) rebuild the landing page as a cinematic scroll-driven storytelling experience with 5 narrative sections and subtle 3D/animated elements, (3) shift the entire color system from dark cyberpunk tones to a light, nature-inspired palette.

---

## 1. Rename to "Mangleye"

Replace all occurrences of "Borde Vivo AI" / "Borde Vivo" / "BV" across ~7 files:
- `index.html` (title, og:title, twitter:title)
- `Header.tsx`
- `Landing.tsx`
- `About.tsx`
- `Methodology.tsx`
- `TechnicalReport.tsx`
- Memory files updated to reflect the new name

---

## 2. New Color Palette (Light, Nature + Culture)

Shift from dark theme (`background: 200 20% 8%`) to a warm, light nature palette:

| Token | New value | Feel |
|-------|-----------|------|
| background | `48 30% 96%` | warm off-white |
| foreground | `200 18% 15%` | deep teal-gray |
| card | `48 25% 99%` | near white |
| primary | `168 55% 38%` | mangrove green |
| secondary | `45 20% 92%` | warm sand |
| accent | `195 65% 45%` | estuary cyan |
| muted | `45 15% 88%` | light sand |
| destructive | `5 70% 55%` | coral risk |
| border | `45 15% 85%` | soft warm line |
| geo-blue | `200 70% 50%` | water |
| geo-green | `160 55% 40%` | ecology |
| geo-amber | `38 85% 55%` | warning |
| geo-red | `5 70% 58%` | coral/risk |
| geo-cyan | `190 75% 48%` | flow |

Update `src/index.css` CSS variables, `.text-gradient` utility, glassmorphism utilities (lighter glass), and Leaflet overrides to match the light base.

---

## 3. Storytelling Landing Page

Completely rebuild `Landing.tsx` as a cinematic scroll-driven page with 5 narrative sections. Each section takes most of the viewport height and uses `framer-motion` scroll-triggered animations.

### Section 1: Hero (Impact)
- Full-height hero with headline: *"Guayaquil no solo se inundó. Perdió sus bordes protectores."*
- Subtle animated SVG water lines flowing across a stylized map silhouette of Guayaquil
- CTA: "Explorar el mapa"
- Soft gradient background (white → cyan wash)

### Section 2: Before vs After (3D Conceptual)
- Two side-by-side isometric illustrations built with CSS 3D transforms (no WebGL needed, Dora-style):
  - **Before**: hard concrete edge, water pooling, gray urban block — CSS 3D boxes with shadows
  - **After**: green vegetation edge, distributed water flow, trees — same geometry with green/cyan palette
- Toggle or scroll-reveal to transition between states
- Labels for key elements

### Section 3: What This Area Lost
- Three animated counter/stat cards that reveal on scroll:
  - Natural protection (mangrove coverage lost %)
  - Infiltration capacity (imperviousness increase)
  - Flood buffering (edge compression)
- Each with a simple SVG icon and progress ring animation
- Emotional copy connecting each metric to human impact

### Section 4: Water Flow Story (Edge Pressure Diagram)
- Animated SVG flow diagram showing two paths:
  - **Problem path**: rain → runoff → blocked edge → flooding (red/coral flow)
  - **Solution path**: rain → restored edge → distributed flow → reduced pressure (green/cyan flow)
- Animated with framer-motion staggered reveals
- Clean line-art style, not playful

### Section 5: System Decision Logic
- Visual flowchart showing how Mangleye decides:
  - Input: zone data → Analysis: flood + ecology + urban pressure → Output: protect / restore / revegetate / hybrid / not suitable
- Each decision node styled as a card with the corresponding badge color
- Animated connection lines

### Section 6: Citizen → Action Pipeline
- Horizontal stepped flow:
  - Report → Data aggregation → Priority scoring → Intervention plan → Impact
- Each step is a card that animates in sequence on scroll
- Final step shows a "before/after" thumbnail

### Section 7: CTA Footer
- "Explora las zonas prioritarias" with map link
- Secondary links to methodology and about

### Visual approach (Dora-style):
- CSS `perspective` + `transform: rotateX/rotateY` for isometric 3D blocks (no Three.js needed)
- Large type, generous whitespace, full-viewport sections
- Smooth `framer-motion` `whileInView` animations with stagger
- Soft shadows, no hard borders
- Map symbol previews showing the zone icons with their new colors

---

## Technical Details

### Files modified:
- `index.html` — title/meta tags
- `src/index.css` — complete color variable overhaul + utility updates
- `src/components/Header.tsx` — rename to Mangleye
- `src/pages/Landing.tsx` — complete rewrite (~400-500 lines)
- `src/pages/About.tsx` — rename references
- `src/pages/Methodology.tsx` — rename references
- `src/pages/TechnicalReport.tsx` — rename references

### Files created:
- `src/components/landing/HeroSection.tsx`
- `src/components/landing/BeforeAfterIsometric.tsx`
- `src/components/landing/AreaLostSection.tsx`
- `src/components/landing/WaterFlowDiagram.tsx`
- `src/components/landing/SystemDecision.tsx`
- `src/components/landing/CitizenPipeline.tsx`

### Dependencies:
- No new packages needed. Uses existing `framer-motion` for all animations and CSS 3D transforms for isometric views.

### Memory updates:
- Update `mem://product/vision` with new name "Mangleye"
- Update `mem://style/visual-identity` with the light color palette

