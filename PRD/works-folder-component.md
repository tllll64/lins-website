# Works Folder Component PRD

## Overview
A dynamic, interactive folder component for the "Works" section of the portfolio website. It serves as a visual anchor and a summary of the projects (Internship, AI-Driven, Digital).

## Visual Design
- **Style**: macOS-inspired folder icon.
- **Color**: Blue gradient (`linear-gradient(135deg, #6BB6FF 0%, #5BA3E8 100%)`).
- **Dimensions**: Base 280x240px (scaled to 0.6x in context).
- **Structure**:
  - **Back Tab**: Top-left tab.
  - **Back Body**: Main folder backing.
  - **Content Layer**: 
    - Contains 3 scattered logos (Promote, Tako, Lingxi).
    - Logos have different initial rotations and positions to look natural/scattered.
  - **Front Body**: 
    - Shorter than back (82% height).
    - Contains text.
    - Animate/Flip capability.

## Content
- **Title**: "Lynn's Projects"
  - Font size: 26px
  - Weight: 600
  - Position: Top left of front body.
- **Subtitle**: "Internship, AI-Driven, Digital"
  - Font size: 15px
  - Weight: 500
  - Position: Bottom of front body.
  - Truncation: Ellipsis if too long (single line).
- **Logos**:
  - Promote_logo.png
  - Tako_logo.png
  - Lingxi_logo.png

## Interactions & Animation
- **Hover State**:
  - **Container**: Scales up by 1.02x.
  - **Folder Cover**: Rotates open (rotateX 35deg) with 3D perspective.
  - **Text**: Fades out (opacity 0) to reveal contents.
  - **Logos**: 
    - "Jump" out (translateY upwards).
    - Spread slightly.
    - Z-index increases.
    - Bounce effect (spring physics or cubic-bezier).
- **Default State**:
  - Closed folder.
  - Text visible.
  - Logos partially hidden/peeking.

## Technical Implementation
- **Component**: `FolderIcon.jsx`
- **Props**:
  - `title`: String
  - `subtitle`: String
  - `folderImages`: Array of image sources
  - `scale`: Number
  - `onClick`: Function
- **Styling**: Inline styles with CSS transitions and transforms.
- **Dependencies**: `lucide-react` (icons, if used), standard React hooks.
