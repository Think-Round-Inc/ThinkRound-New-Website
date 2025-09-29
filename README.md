# ThinkRound New Website

**ThinkRound Inc.**  
Next.js / Sanity-powered website for ThinkRound.

---

## Table of Contents

- [About](#about)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Running Locally](#running-locally)  
  - [Building for Production](#building-for-production)  
- [Project Structure](#project-structure)  
- [Data & CMS](#data--cms)  
- [Deployments](#deployments)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)

---

## About

This repository contains the code for the ThinkRound new website — a modern, content-driven site built with Next.js and Sanity as a headless CMS. The site supports dynamic content, images, and layout structures configured via Sanity schemas, and is optimized for performance and revalidation.

---

## Tech Stack

- **Frontend / Site Framework**: Next.js
- **CMS / Content Backend**: Sanity  
- **Image Handling**: `@sanity/image-url` + Next.js `Image` component  
- **Styling**: Tailwind CSS  
- **Hosting / Deployment**: Vercel
- **TypeScript**: For type safety throughout the application  

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or higher recommended)  
- npm
- Access to the Sanity project (API keys, dataset, etc.)  

### Installation

```bash
# Clone the repo
git clone https://github.com/Think-Round-Inc/ThinkRound-New-Website.git
cd ThinkRound-New-Website

# Install dependencies
npm install
# in studio-new_website
npm run dev

Open the Studio running locally in your browser from http://localhost:3333.
You should now see a screen prompting you to log in to the Studio.

# in nextjs-new_website
npm run dev
Open http://localhost:3000 in your browser to see front-end.

Or sign in and open deployed sanity studio in https://thinkround.sanity.studio/

