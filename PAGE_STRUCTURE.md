# Page Structure & Content Specification
**Document**: PAGE_STRUCTURE.md  
**Role**: Single-Page Architectural Ledger for Dhaval Patel  
**Execution Standard**: Semantic HTML5 &middot; Zero Layout Shift (CLS = 0)  

---

## 1. Macro Layout Composition

The site adopts an asymmetric dual-column editorial layout on desktop, collapsing into a linear, distraction-free document on mobile viewports.

```
┌──────────────────────────────────────┬─────────────────────────────────────────────────────────┐
│        STICKY LEFT SIDEBAR           │                    RIGHT MAIN STREAM                    │
│      (40% Width - Desktop Only)      │             (60% Width - Scrollable Content)            │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│                                      │                                                         │
│  [1.0] IDENTITY & ROLE               │  [2.0] EXECUTIVE SUMMARY & PHILOSOPHY                   │
│   • Dhaval Patel                     │   • 3+ years engineering enterprise systems             │
│   • Full Stack Developer             │   • Node.js, Next.js, PostgreSQL, Claude Code rules    │
│   • SDE II & Project Lead            │                                                         │
│                                      │  [3.0] FLAGSHIP ENTERPRISE CASE STUDIES                 │
│  [1.1] AVAILABILITY STATUS           │   • 3.1 Watch Assembly & Multi-Channel BI ERP           │
│   • Active Beacon (SDE II/Lead)      │   • 3.2 Industrial Manufacturing FIFO Ledger ERP        │
│                                      │   • 3.3 B2B Diamond Trading Platform                    │
│  [1.2] PRODUCTION TELEMETRY          │                                                         │
│   • 3+ Years Experience              │  [4.0] AGENTIC AI & PERFORMANCE ENGINEERING LAB         │
│   • 2 Enterprise ERPs Delivered      │   • 4.1 Claude Code Rule Architecture (.clauderc)       │
│   • 200+ Endpoints Load-Tested       │   • 4.2 Apache JMeter Stress Testing & Connection Pools │
│   • 4 Marketplace Real-Time Syncs    │   • 4.3 SwiftVision AI (Computer Vision with YOLOv5)    │
│                                      │                                                         │
│  [1.3] EDITORIAL INDEX (SCROLLSPY)   │  [5.0] CAREER CHRONOLOGY                                │
│   • 01 Overview                      │   • 5.1 Sarvadhi Solutions (SDE II & Project Lead)      │
│   • 02 Enterprise Case Studies       │   • 5.2 Differenz System (Node.js Developer)            │
│   • 03 Agentic AI & Performance      │                                                         │
│   • 04 Experience                    │  [6.0] TECHNICAL COMPETENCIES MATRIX                    │
│   • 05 Technical Matrix              │   • Backend Architecture, Data Modeling, Cloud, APIs    │
│   • 06 Contact                       │                                                         │
│                                      │  [7.0] CREDENTIALS & FOUNDATION                         │
│  [1.4] PRIMARY ACTIONS               │   • Google Cloud GenAI & Infrastructure Badges          │
│   • Download Verified Resume (PDF)   │   • Master of Computer Applications (MCA) Degree        │
│   • GitHub &middot; LinkedIn &middot;│                                                         │
│     Direct Email                     │  [8.0] COMMUNICATION CONSOLE & FOOTER                   │
│                                      │   • Validated Contact Form & Verified Direct Email      │
└──────────────────────────────────────┴─────────────────────────────────────────────────────────┘
```

---

## 2. Section-by-Section Content & Composition

### 1.0 & 1.1 Identity, Role & Availability Beacon
* **Display Name**: `Dhaval Patel`
* **Professional Subtitle**: `Full Stack Developer &middot; SDE II / Project Lead &middot; Agentic AI`
* **Status Pill**: Compact monospace indicator (`● AVAILABLE FOR SDE II / PROJECT LEAD ROLES`) with a 6px green beacon.

### 1.2 Production Telemetry (The Metric Strip)
A compact $2 \times 2$ grid on desktop ($4 \times 1$ on mobile) displaying concrete proof points:
1. `3+` — *Years Production Experience*
2. `2` — *Enterprise ERPs Led to Release*
3. `200+` — *Endpoints Load-Tested (JMeter)*
4. `4` — *Marketplace Channels Synced in Real Time*

---

### 2.0 Executive Summary & Engineering Philosophy
* **Location**: Right column lead.
* **Content**: Concise narrative explaining the bridge between deep backend engineering (PostgreSQL connection pool sizing, FIFO ledgers, PM2 clustering) and deterministic Agentic AI adoption (Claude Code custom rule authoring).

---

### 3.0 Flagship Enterprise Case Studies
Presented as structured architectural case studies (Problem $\rightarrow$ Architecture $\rightarrow$ Result):

#### 3.1 Watch Assembly & Multi-Channel E-Commerce ERP with BI
* **Role**: Project Lead
* **Stack**: `Node.js` &bull; `TypeScript` &bull; `PostgreSQL` &bull; `Sequelize` &bull; `Next.js` &bull; `AWS EC2` &bull; `JMeter`
* **Architecture Challenge**: Reconciling central warehouse stock levels across four distinct e-commerce marketplaces (Shopify, Amazon, Flipkart, Myntra) without race conditions or overselling.
* **Result**: Built an automated synchronization bridge with bidirectional delta checks that resolves stock gaps and powers executive BI reporting.

#### 3.2 Industrial Manufacturing ERP (FIFO Ledger)
* **Role**: Project Lead
* **Stack**: `Node.js` &bull; `TypeScript` &bull; `PostgreSQL` &bull; `Sequelize` &bull; `Next.js` &bull; `PM2`
* **Architecture Challenge**: Tracking the entire manufacturing lifecycle from RFQs and dynamic quotes to Bill of Materials (BOM) explosion, QC stages, and dispatch.
* **Result**: Implemented a strict FIFO (First-In, First-Out) batch inventory ledger preventing inventory valuation discrepancies and batch mixing.

#### 3.3 B2B Diamond Trading Platform
* **Role**: Backend Developer
* **Stack**: `Node.js` &bull; `TypeScript` &bull; `Express` &bull; `PostgreSQL` &bull; `Sequelize`
* **Architecture Challenge**: Multi-tier Role-Based Access Control (RBAC) handling sensitive stone valuations, dynamic memo issuance pipelines, and GST invoice exports.
* **Result**: Designed high-performance indexed queries delivering sub-40ms search times across heavy diamond inventories.

---

### 4.0 Agentic AI & Performance Engineering Lab

#### 4.1 Claude Code Rule Architecture
* Explains daily engineering use of Claude Code, demonstrating how custom `.clauderc` rules and system prompt directives enforce architecture conventions and run autonomous security audits inside CI/CD pipelines.

#### 4.2 Apache JMeter Stress Audits & Connection Tuning
* Synthetic traffic audit across 200+ REST endpoints.
* Isolated and resolved 28 critical timeout bottlenecks under load.
* Traced and mitigated EC2 memory leaks and tuned PostgreSQL connection pool limits under PM2 cluster mode.

#### 4.3 SwiftVision AI (Computer Vision Pipeline)
* Python, OpenCV, and YOLOv5 pipeline performing real-time multi-class object detection and classification over streaming video feeds.

---

### 5.0 Career Chronology

#### 5.1 Sarvadhi Solutions Pvt. Ltd. *(Mar 2025 – Oct 2026)*
* **Title**: Software Development Engineer II &middot; Project Lead
* **Location**: Surat, Gujarat, India
* **Key Achievements**:
  * Led module planning with PMs, task delegation across developers, code reviews, and production UAT releases across two enterprise ERPs.
  * Standardized development workflows using Claude Code rule files.
  * Spearheaded JMeter performance engineering and AWS EC2 infrastructure stabilization.

#### 5.2 Differenz System *(Feb 2022 – Oct 2023)*
* **Title**: Node.js Developer (Promoted from Trainee)
* **Location**: Surat, Gujarat, India
* **Key Achievements**:
  * Engineered complete subscription commerce engine: recurring checkout, coupon validation rules, and Firebase push messaging.
  * Led 4 backend developers on a recipe/meal platform deployed on AWS EC2 & RDS.

---

### 6.0 Technical Competency Matrix
Disciplined 4-quadrant layout with zero percentage bars:
* **Languages & Core**: TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3
* **Backend Architecture**: Node.js, Express, REST APIs, Socket.io, JWT, RBAC
* **Databases & Data Modeling**: PostgreSQL, MySQL, MongoDB, Sequelize (Migrations, Indexing, Seeders)
* **Cloud & Operations**: AWS (EC2, S3, RDS), PM2, Apache JMeter, CI/CD, Git
* **Marketplace Integrations**: Shopify API, Amazon SP-API, Flipkart, Myntra, Shiprocket, Firebase, Klaviyo

---

### 7.0 Credentials & Foundation
* **Academic**: Master of Computer Applications (MCA) — Veer Narmad South Gujarat University (2020 – 2022).
* **Google Cloud Badges**: Generative AI Fundamentals, Introduction to Large Language Models, Responsible AI, Infrastructure Modernization.

---

### 8.0 Communication Console & Verified Footer
* Semantic contact form (First Name, Email, Subject, Message) with accessible client-side validation.
* Direct email action (`mailto:dpatel0254@gmail.com`) with instant copy-to-clipboard button.
* Direct, verified link to downloadable PDF resume at `Docs/Dhaval_Resume.pdf`.

---

## 3. Responsive Behavior Across Viewports

| Viewport Tier | Resolution | Layout Behavior |
| :--- | :--- | :--- |
| **Desktop Wide** | $\ge 1280\text{px}$ | Full asymmetric dual-column: Sticky left identity (40%), scrollable right stream (60%). Maximum width capped at $1180\text{px}$. |
| **Desktop / Laptop** | $1024\text{px} - 1279\text{px}$ | Dual-column maintained with condensed $48\text{px}$ column gap and fluid typography scaling. |
| **Tablet** | $768\text{px} - 1023\text{px}$ | Left sidebar unpins and stacks above main stream. Telemetry metrics expand into a $4\times 1$ row. |
| **Mobile** | $\le 767\text{px}$ ($390\text{px}$ target) | Full linear single-column document. Zero horizontal overflow. Generous touch targets ($\ge 44\text{px}$). Sticky mini-bar with direct resume and contact quick-links. |

