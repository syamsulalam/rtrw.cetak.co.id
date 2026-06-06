# Codebase Overview

This document provides a comprehensive overview of the current codebase structure, logic, and file interdependencies for the SILAS (Sistem Informasi Layanan Surat Pengantar) platform.

## Directory Structure & Files

### Configuration Files
- **`/package.json`**: Manages dependencies, scripts, and basic project metadata. Configures the Vite development server to run on port 3000.
- **`/tsconfig.json`**: TypeScript configuration, ensuring strict type checking and proper module resolution.
- **`/vite.config.ts`**: Vite bundler configuration, integrating React and Tailwind CSS plugins, and setting up path aliases (`@/`).
- **`/.env.example`**: Example environment variables file defining required secrets.
- **`/AGENTS.md`**: Persists agent instruction guidelines and communication rules centered around self-direction.

### Entry Points & Core Orchestrator
- **`/index.html`**: The main HTML file. Serves as the mounting point for the React application (`<div id="root"></div>`) and loads `/src/main.tsx`.
- **`/src/main.tsx`**: The primary React entry point. It renders the `App` component within a `StrictMode` boundary and imports the global stylesheet `/src/index.css`.
- **`/src/index.css`**: Global CSS styling entry. Imports and configures the Tailwind CSS system via `@import "tailwindcss";` and sets visual font variables.
- **`/src/types.ts`**: Centralized, typed contracts representing system enums, roles ('guest' | 'onboarding' | 'warga' | 'pengurus'), active views, demographic blocks, and config options.
- **`/src/mockData.ts`**: Static and reactive databases loaded with mock citizens, status lists, map coordinate outlines, and default RT configurations.
- **`/src/App.tsx`**: Lightweight central state director. It coordinates mock accounts, manages local storage caching, routes between views, implements action channels (add, delete, approve, reject), and hosts an evaluating shortcut for switching roles seamlessly.

### Layout Wrappers (`/src/components/`)
- **`AppLayout.tsx`**: Dynamic container shell wrapping page contents with responsive offsets. Includes responsive top header modules and context sidebars.
- **`Sidebar.tsx`**: Responsive navigation pane displaying custom link lists and active links based on credentials. Includes a demo switch shortcut.
- **`Header.tsx`**:Sticky top bar featuring contextual titles, search lookups, responsive labels, and simulated notice controls.

### Portal Subcomponents (`/src/components/`)
- **`LoginScreen.tsx`**: Indonesian-themed landing platform for role switching. Features pre-filled demo accounts for instant login, and active fields for unregistered members.
- **`WargaOnboarding.tsx`**: Guided multi-step demographic onboarding form featuring an interactive drag-and-drop KTP scanner simulation.
- **`WargaDashboard.tsx`**: Complete portal for registered citizens. Highlights active tracking timelines, customizable forms for requesting letters, and RT help desk details.
- **`DashboardUtama.tsx`**: Master control deck for the administration. Displays interactive SVG territorial charts, metric trackers, active request rosters, and search filters.
- **`TinjauanPengajuanSurat.tsx`**: Live high-fidelity replica of traditional village "Surat Pengantar" sheets. It allows admins to sign and stamp documents dynamically via overlapping layered graphics, and simulates printing flows.
- **`PengaturanWilayah.tsx`**: Configuration desk for managing residential blocks, adding sector lists, downloading registration invitation QR codes, and custom layouts.
- **`ProfilPengurus.tsx`**: Modular profile dashboard for updating administrative credentials, uploading signatures, RT stamps, and tracking service statistics.
