"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";

type WindowApp =
  | "contact"
  | "education"
  | "assistant"
  | "resume"
  | "vibes"
  | "skills"
  | "killed";

type OpenWindow = {
  id: string;
  kind: "app" | "folder";
  appId?: WindowApp;
  title: string;
  shortTitle?: string;
  iconSrc?: string;
  role?: string;
  zIndex: number;
};

type NoteItem = {
  title: string;
  folder: string;
  content?: string[];
  checklistSections?: {
    heading: string;
    items: string[];
  }[];
  pdfHref?: string;
  download?: string;
};

type InterestIcon =
  | "restaurant"
  | "flight"
  | "music"
  | "palette"
  | "coffee";

type InterestCategory = {
  id: string;
  label: string;
  icon: InterestIcon;
  photos: string[];
};

const isWindowApp = (value: string | undefined): value is WindowApp =>
  value === "contact" ||
  value === "education" ||
  value === "assistant" ||
  value === "resume" ||
  value === "vibes" ||
  value === "skills" ||
  value === "killed";

function WindowControls({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="mac-window-controls" aria-label="Window controls">
      <button
        type="button"
        className="mac-window-control mac-window-close"
        aria-label={`Close ${title}`}
        onClick={onClose}
      />
      <button
        type="button"
        className="mac-window-control mac-window-minimize"
        aria-label="Collapse is not available yet"
        disabled
      />
      <button
        type="button"
        className="mac-window-control mac-window-expand"
        aria-label="Expand is not available yet"
        disabled
      />
    </div>
  );
}

const noteGroups = [
  {
    title: "Pinned",
    notes: [
      {
        title: "About me",
        folder: "Notes",
        content: [
          "Product Manager with 3+ years of international experience across B2B SaaS, consumer apps, and 0-to-1 product launches. I am a hands-on doer who turns ideas into clear strategy, concrete execution, and measurable business impact.",
        ],
        checklistSections: [
          {
            heading: "I am a Product Manager with an emphasis on:",
            items: [
              "User research",
              "Design",
              "Delightful user experience",
              "Complex systems",
            ],
          },
          {
            heading: "I have lived in:",
            items: [
              "Vietnam",
              "France",
              "Germany",
              "Switzerland",
              "Liechtenstein",
            ],
          },
          {
            heading: "I have domain knowledge in:",
            items: [
              "Identity verification technologies",
              "E-signature",
              "Cybersecurity",
              "Design systems",
            ],
          },
          {
            heading: "I thrive in:",
            items: [
              "International teams",
              "Multidisciplinary positions",
              "Fast-paced environments",
            ],
          },
          {
            heading: "I am fluent in:",
            items: ["English", "French", "Vietnamese"],
          },
        ],
      },
      {
        title: "Resume in English",
        folder: "Resume",
        pdfHref: "/resumes/nguyen-resume-english-v3.pdf",
        download: "Nguyen_Resume_English.pdf",
      },
      {
        title: "Resume in French",
        folder: "Resume",
        pdfHref: "/resumes/nguyen-resume-french-v5.pdf",
        download: "Nguyen_Resume_French.pdf",
      },
    ] satisfies NoteItem[],
  },
];

const defaultSelectedNote = noteGroups[0].notes[0];

const interestCategories: InterestCategory[] = [
  {
    id: "eat",
    label: "Eat",
    icon: "restaurant",
    photos: [
      "/interests/eat/eat-16.jpg",
      "/interests/eat/eat-01.jpg",
      "/interests/eat/eat-02.jpg",
      "/interests/eat/eat-17.jpg",
      "/interests/eat/eat-04.jpg",
      "/interests/eat/eat-05.jpg",
      "/interests/eat/eat-06.jpg",
      "/interests/eat/eat-07.jpg",
      "/interests/eat/eat-14.jpg",
      "/interests/eat/eat-09.jpg",
      "/interests/eat/eat-10.jpg",
      "/interests/eat/eat-11.jpg",
      "/interests/eat/eat-12.jpg",
      "/interests/eat/eat-15.jpg",
    ],
  },
  {
    id: "travel",
    label: "Travel",
    icon: "flight",
    photos: [
      "/interests/travel-19.jpg",
      "/interests/travel-01.jpg",
      "/interests/travel-02.jpg",
      "/interests/travel-03.jpg",
      "/interests/travel-04.jpg",
      "/interests/travel-05.jpg",
      "/interests/travel-06.jpg",
      "/interests/travel-07.jpg",
      "/interests/travel-08.jpg",
      "/interests/travel-09.jpg",
      "/interests/travel-10.jpg",
      "/interests/travel-11.jpg",
      "/interests/travel-12.jpg",
      "/interests/travel-13.jpg",
      "/interests/travel-14.jpg",
      "/interests/travel-15.jpg",
      "/interests/travel-16.jpg",
      "/interests/travel-17.jpg",
      "/interests/travel-18.jpg",
    ],
  },
  {
    id: "listen",
    label: "Listen",
    icon: "music",
    photos: [
      "/interests/listen-11.jpg",
      "/interests/listen-12.jpg",
      "/interests/listen-13.jpg",
      "/interests/listen-14.jpg",
      "/interests/listen-15.jpg",
      "/interests/listen-01.jpg",
      "/interests/listen-02.jpg",
      "/interests/listen-03.jpg",
      "/interests/listen-04.jpg",
      "/interests/listen-05.jpg",
      "/interests/listen-06.jpg",
      "/interests/listen-07.jpg",
      "/interests/listen-08.jpg",
      "/interests/listen-09.jpg",
    ],
  },
  {
    id: "create",
    label: "Craft",
    icon: "palette",
    photos: [
      "/interests/create-01.jpg",
      "/interests/create-02.jpg",
      "/interests/create-03.jpg",
      "/interests/create-04.jpg",
      "/interests/create-05.jpg",
      "/interests/create-06.jpg",
      "/interests/create-07.jpg",
      "/interests/create-08.jpg",
      "/interests/create-09.jpg",
      "/interests/create-10.jpg",
      "/interests/create-11.jpg",
      "/interests/create-12.jpg",
      "/interests/create-13.jpg",
      "/interests/create-14.jpg",
    ],
  },
  {
    id: "coffee",
    label: "Sip",
    icon: "coffee",
    photos: [
      "/interests/drink-13.jpg",
      "/interests/drink-04.jpg",
      "/interests/drink-01.jpg",
      "/interests/drink-02.jpg",
      "/interests/drink-03.jpg",
      "/interests/drink-05.jpg",
      "/interests/drink-06.jpg",
      "/interests/drink-07.jpg",
      "/interests/drink-08.jpg",
      "/interests/drink-09.jpg",
      "/interests/drink-10.jpg",
      "/interests/drink-11.jpg",
      "/interests/drink-12.jpg",
    ],
  },
];

const appStoreNavItems = [
  "Discover",
  "Arcade",
  "Create",
  "Work",
  "Play",
  "Develop",
  "Categories",
  "Updates",
];

type SkillTool = {
  name: string;
  icon?: string;
  abbr?: string;
  color?: string;
};

type SkillGroup = {
  name: string;
  description: string;
  tools?: SkillTool[];
  chips?: string[];
};

const ti = (name: string, slug: string): SkillTool => ({
  name,
  icon: `/tool-icons/${slug}.svg`,
});

const tp = (name: string, slug: string): SkillTool => ({
  name,
  icon: `/tool-icons/${slug}.png`,
});

const tf = (name: string, abbr: string, color: string): SkillTool => ({
  name,
  abbr,
  color,
});

const skillGroups: SkillGroup[] = [
  {
    name: "Product Strategy & Vision",
    description:
      "I leverage these tools to define and present the product roadmap, market opportunities, business goals, and technical constraints.",
    tools: [
      ti("Miro", "miro"),
      tp("FigJam", "figma-color"),
      ti("Google Slides", "googleslides"),
      ti("Notion", "notion"),
    ],
  },
  {
    name: "User Discovery & UX Research",
    description:
      "I use these methods to understand user behavior through interviews, qualitative and quantitative analysis, journey mapping, and structured research.",
    tools: [
      ti("Dovetail", "dovetail"),
      ti("Notion", "notion"),
      tp("Typeform", "typeform-ic"),
      tp("UserTesting", "usertesting"),
      ti("Hotjar", "hotjar"),
      ti("Google Forms", "googleforms"),
      tp("Otter.ai", "otter"),
      tp("Statista", "statista"),
    ],
  },
  {
    name: "Product Analytics & Data-Driven Decisions",
    description:
      "I use data to measure user behavior, validate product decisions, and prioritize what matters most.",
    tools: [
      tp("SQL", "sql"),
      ti("Google Analytics", "googleanalytics"),
      ti("Power BI", "powerbi"),
      ti("Tableau", "tableau"),
      ti("PostHog", "posthog2"),
      ti("Google Sheets", "googlesheets"),
    ],
  },
  {
    name: "AI-Assisted Product Workflows",
    description:
      "I use AI to accelerate discovery, prototyping, research synthesis, ideation, and content.",
    tools: [
      ti("ChatGPT", "chatgpt"),
      ti("Claude", "claude"),
      tp("Google Stitch", "googlestitch-v2"),
      ti("Make", "make"),
      ti("Replit", "replit"),
      ti("Lovable", "lovable"),
      tp("Codex", "codex-v2"),
    ],
  },
  {
    name: "Design & Prototyping",
    description:
      "I turn product ideas into clear user flows, wireframes, prototypes, and testable experiences.",
    tools: [
      tp("Figma", "figma-color"),
      ti("Miro", "miro"),
      ti("Canva", "canva"),
      ti("Framer", "framer"),
      ti("Webflow", "webflow"),
      tp("Google Stitch", "googlestitch-v2"),
    ],
  },
  {
    name: "Agile Delivery & Cross-Functional Collaboration",
    description:
      "I work with Engineering, Design, Legal, Compliance, Support, and GTM teams to ship products and features.",
    tools: [
      ti("Jira", "jira"),
      ti("Linear", "linear"),
      ti("Confluence", "confluence"),
      ti("Slack", "slack"),
      ti("Google Workspace", "googleworkspace"),
      ti("GitHub", "github"),
    ],
  },
  {
    name: "Technical Fluency for PMs",
    description:
      "I understand enough of the technical system and design challenges to make better product decisions and collaborate more effectively.",
    chips: [
      "Basic coding & data query",
      "GitHub",
      "APIs",
      "Databases",
      "Design systems",
      "Design foundations",
    ],
  },
  {
    name: "Collaboration & Influence",
    description:
      "I work across settings and functions to create alignment, resolve ambiguity, and move the product forward.",
    chips: [
      "Stakeholder alignment",
      "Structured communication",
      "Presentation",
      "Negotiation",
    ],
  },
];

const folderSections = [
  [
    "What did you work on?",
    "Project overview will live here. This area is intentionally ready for the story behind the work.",
  ],
  [
    "What made it hard?",
    "Problem framing, constraints, and the context that made this project worth building.",
  ],
  [
    "What did you do?",
    "Responsibilities, decisions, process, and the parts of the project I directly owned.",
  ],
  [
    "How did you get there?",
    "How the work actually unfolded: the research, the iterations, the trade-offs, and the moments that shaped the final direction.",
  ],
  [
    "What changed?",
    "Outcomes, signals, lessons, and measurable results will be added here.",
  ],
];

// One-line intro shown at the top of a project window, keyed by folder id.
const folderIntros: Record<string, string> = {
  "fepha-founder-2026":
    "Fepha is my attempt to turn an overlooked coffee culture into a modern European consumer brand, where I intentionally applied product management principles to a physical product world.",
  "ghostcatch-founder-2026":
    "GhostCatch is a subscription manager I built to help people find, track, and act on the recurring payments they often forget about, without connecting their bank account.",
  "scrollar-founder-2026":
    "Scrollar is a gamified screen time manager I built around one simple idea: time is as precious as money, and every scroll is a little piece of your life spent.",
  "docusign-pm-2025":
    "I managed identity verification products at Docusign, where every product decision had to balance trust, security, user experience, regulation, and scale.",
  "axa-pm-2024":
    "I helped scale AXA's Global Design System by making it more useful, easier to adopt, and more connected to the real needs of local product teams.",
  "loreal-ux-2024":
    "I helped L'Oréal understand how consumers experience data privacy and brand content across digital touchpoints, and turned those insights into clearer recommendations for the business.",
  "darkfindr-pm-2023":
    "DarkFindR is my first product experience that taught me adding features is not the same as building a product.",
};

// External links shown next to the role in a project window, keyed by folder id.
type FolderLink = { label: string; href: string };
const folderLinks: Record<string, FolderLink[]> = {
  "fepha-founder-2026": [{ label: "Visit website", href: "https://fephacoffee.com/" }],
  "docusign-pm-2025": [
    { label: "Docusign Identity Verification", href: "https://www.docusign.com/products/identify" },
  ],
  "ghostcatch-founder-2026": [
    { label: "App Store", href: "https://apps.apple.com/fr/app/ghostcatch-sub-tracker/id6761310942" },
    { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.ghostcatch.app&hl=en_GB" },
  ],
  "scrollar-founder-2026": [
    { label: "App Store", href: "https://apps.apple.com/us/app/scrollar-screen-time-control/id6761416368" },
    { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.scrollar.scrollar&hl=en" },
  ],
  "axa-pm-2024": [
    { label: "Design System", href: "https://designsystem.axa.com/" },
    { label: "Case study", href: "https://en.haigo.io/case-study/axa-design-system" },
  ],
  "darkfindr-pm-2023": [{ label: "Visit website", href: "https://darkfindr.io/" }],
};

// Photos/GIFs with captions shown inside a project window, keyed by folder id
// then by the section index they belong under.
type MediaItem = { src: string; caption: string; poster?: string; youtubeId?: string };
const folderSectionMedia: Record<string, Record<number, MediaItem[]>> = {
  "fepha-founder-2026": {
    0: [
      {
        src: "/project-media/fepha/brand-ideation.png",
        caption:
          "Putting our first ideas together for our ideal brand: what it shows, how it feels, and how it connects with its audience.",
      },
      {
        src: "/project-media/fepha/brand-universe.png",
        caption: "Designing our brand's universe.",
      },
    ],
    2: [
      {
        src: "/project-media/fepha/paper-mockup.jpg",
        caption: "Our very first mock-up of the product on paper.",
      },
      {
        src: "/project-media/fepha/packaging-prototype.png",
        caption: "Prototyping our coffee packaging.",
      },
    ],
    3: [
      {
        src: "/project-media/fepha/shopify-store.png",
        caption: "Designing and coding our Shopify store.",
      },
      {
        src: "/project-media/fepha/first-sample.jpg",
        caption: "Receiving our first coffee sample.",
      },
      {
        src: "/project-media/fepha/roasting-profile.jpg",
        caption: "Working with our roaster to develop our coffee roasting profile.",
      },
    ],
  },
  "ghostcatch-founder-2026": {
    0: [
      {
        src: "/project-media/ghostcatch/logo-ghost.png",
        caption: "Exploring the GhostCatch logo and creating different ghost personalities for the product universe.",
      },
    ],
    2: [
      {
        src: "/project-media/ghostcatch/magic-scan.mp4",
        poster: "/project-media/ghostcatch/magic-scan-poster.jpg",
        caption:
          "One of the product's core features, the magic scan: the user selects multiple photos of subscription invoices or screenshots, and the app detects all their subscriptions in the blink of an eye, powered by OpenAI's latest API.",
      },
    ],
    3: [
      {
        src: "/project-media/ghostcatch/paper-wireframes.jpg",
        caption: "My first wireframes on paper.",
      },
      {
        src: "/project-media/ghostcatch/hifi-mockups.png",
        caption: "Turning the wireframes into high-fidelity mockups.",
      },
      {
        src: "/project-media/ghostcatch/product-page.png",
        caption: "Designing the product page on App Store and Play Store.",
      },
    ],
  },
  "scrollar-founder-2026": {
    0: [
      {
        src: "/project-media/scrollar/coin-concept.png",
        caption:
          "The emotional engagement of the app lies in the fact that time is as precious as money: every moment spent doomscrolling is a coin lost, represented in the app.",
      },
    ],
    1: [
      {
        src: "/project-media/scrollar/doomscroll-social.jpg",
        caption:
          "People openly share about doomscrolling on social media and constantly look for ways to stop it.",
      },
    ],
    2: [
      {
        src: "/project-media/scrollar/blocking-rules.mp4",
        poster: "/project-media/scrollar/blocking-rules-poster.jpg",
        caption:
          "The app lets users block addictive apps with different blocking rules: during specific hours or for a set time limit.",
      },
      {
        src: "/project-media/scrollar/hammy.mp4",
        poster: "/project-media/scrollar/hammy-poster.jpg",
        caption: "Hammy is the screen time companion that evolves as the user saves screen time.",
      },
    ],
    3: [
      {
        src: "/project-media/scrollar/first-mockup.png",
        caption: "The very first mockup version of the app.",
      },
      {
        src: "/project-media/scrollar/product-page.png",
        caption: "Designing the product page on App Store and Play Store.",
      },
    ],
  },
  "docusign-pm-2025": {
    0: [
      {
        src: "/project-media/docusign/first-day.jpg",
        caption: "My first day at Docusign.",
      },
      {
        src: "/project-media/docusign/idv-solutions.png",
        caption:
          "A list of Docusign's identity verification solutions, among which Phone Authentication is the most used, with 10M monthly transactions.",
      },
    ],
    2: [
      {
        src: "/project-media/docusign/phone-auth.png",
        caption:
          "Phone Authentication experience: the user is asked to enter an OTP code sent to their phone.",
      },
    ],
    4: [
      {
        src: "/project-media/docusign/eid-schemes.png",
        caption:
          "eID is a high-trust verification method, letting users verify their identity with specific bank or government-based credentials (especially popular in the Nordic countries).",
      },
    ],
  },
  "axa-pm-2024": {
    0: [
      {
        src: "/project-media/axa/design-system-home.png",
        caption:
          "AXA's design system, often listed among the top design systems in industry roundups (for example, designsystemhunt.com).",
      },
      {
        src: "https://www.youtube.com/watch?v=Zx9M3wdQ_ZE",
        youtubeId: "Zx9M3wdQ_ZE",
        caption: "Introduction to AXA's Design System.",
      },
    ],
    3: [
      {
        src: "/project-media/axa/design-workshop.jpg",
        caption:
          "A design thinking workshop to align the whole team around how to build and deploy the Design Tokens, making it easier for local entities to adopt the design system.",
      },
    ],
  },
  "loreal-ux-2024": {
    0: [
      {
        src: "/project-media/loreal/brands-grid-v2.png",
        caption:
          "L'Oréal is a maison of 37 brands, each with its own DNA, but together they all contribute to the image of L'Oréal.",
      },
    ],
    4: [
      {
        src: "/project-media/loreal/on-the-job.jpg",
        caption: "Just a random photo from a day working on the L'Oréal site.",
      },
    ],
  },
  "darkfindr-pm-2023": {
    3: [
      {
        src: "/project-media/darkfindr/cyberbooster-pitch.jpg",
        caption:
          "Preparing for our pitch and product demo at CyberBooster, the incubator we integrated DarkFindR into.",
      },
      {
        src: "/project-media/darkfindr/cyberbooster-promotion.png",
        caption: "Our CyberBooster promotion of 2023: only 5 startups were selected.",
      },
      {
        src: "/project-media/darkfindr/wavestone-report.png",
        caption:
          "DarkFindR was identified as one of the emerging startups in the French cybersecurity ecosystem in 2024, in one of Wavestone's reports.",
      },
    ],
  },
};

// Per-project section titles and content, keyed by folder id.
const projectFolderSections: Record<string, string[][]> = {
  "fepha-founder-2026": [
    [
      "What is this beautiful thing you made?",
      `Fepha is a Vietnamese specialty coffee brand I co-founded to reimagine Vietnamese coffee for the European market.

Vietnam is the second-largest coffee producer in the world, yet its name is still strangely invisible in the specialty coffee scene. We want to change that by building a brand that feels premium, playful, modern, and proudly rooted in Vietnamese coffee culture.`,
    ],
    [
      "Why build it?",
      `The opportunity came from a gap we couldn't unsee. Vietnamese coffee has history, taste, rituals, and cultural richness, but in Europe it is still often associated with cheap robusta, supermarket blends, or traditional restaurant drinks.

At the same time, Gen Z consumers are increasingly curious about Asian beverages, new rituals, and culturally rich products, from matcha to boba to Vietnamese coffee content on TikTok and Instagram. We saw space for a brand that speaks their language: visual, engaging, accessible, and not afraid to make Vietnamese coffee feel fresh.`,
    ],
    [
      "What did you pour in?",
      `I treated Fepha like a 0-to-1 product, but in a world where iteration is much harder than software. In digital products, you can tweak a flow, change a button, or ship a new version quickly. In the physical world, every decision has weight: packaging has minimum order quantities, suppliers have lead times, logistics can break, and one wrong production choice can become expensive fast.

That forced me to apply my PM toolkit even more intentionally: customer discovery, positioning, design, prototyping, supplier negotiation, cost estimation, launch planning, and fast iteration. I also used quick prototypes to align with my co-founder on the brand vision, because sometimes a rough mockup is the fastest way to turn abstract ideas into shared decisions.`,
    ],
    [
      "How did it come together?",
      `We built Fepha by reducing uncertainty step by step. First, define the customer. Then, clarify the positioning. Then, find the right suppliers, packaging partners, roasters, and logistics setup. Every step was about asking: what is the smallest version we can launch with, without compromising the story or the product experience?

The upcoming crowdfunding campaign is part of that same logic. It is not only a funding tool, it is our first real market test. We want to use it to create momentum, validate demand, understand which products resonate most, and avoid scaling blindly before the market gives us a signal.`,
    ],
    [
      "What did it stir?",
      `Fepha taught me that product thinking is not limited to apps or SaaS. The same instincts apply: understand the user, identify the opportunity, prototype fast, align people, manage trade-offs, launch, measure, and iterate.

But physical products made those lessons feel sharper. You cannot pretend operations are separate from product. Brand, packaging, sourcing, roasting, logistics, cost, and go-to-market all shape the customer experience. Fepha is personal because it comes from my culture, but it is also one of my clearest examples of high-agency product building: turning a market gap into something real enough to launch.`,
    ],
  ],
  "ghostcatch-founder-2026": [
    [
      "What is this beautiful thing you made?",
      `GhostCatch started from a very familiar feeling: "Wait… am I still paying for this?"

Free trials quietly turn into monthly charges. Annual plans renew before people notice. Small subscriptions hide in emails, invoices, and app store receipts until they become real money. I wanted to build a simple, privacy-conscious way for people to regain visibility over what they pay for, without asking them to connect their bank account on day one.

The app lets users create a clean subscription library, scan bills or confirmation emails with AI, and receive gentle reminders before renewals. The experience is designed to feel light, useful, and non-judgmental: not another finance dashboard full of guilt, but a small ghost-hunting companion for forgotten recurring payments.`,
    ],
    [
      "How did you spot the gap?",
      `I wasn't trying to invent a completely new category. Subscription tracking is already a proven need, and the waste behind it is real. A 2025 CNET survey found that Americans spend nearly $1,100 per year on subscriptions, with about $200 going to services they rarely or never use.

So I studied competitors, App Store reviews, TikTok comments, and user complaints. A clear split started to show: some apps automatically detect subscriptions by connecting to your bank account, which is powerful but uncomfortable for privacy-conscious users. Others avoid bank access, but force people to manually enter every subscription one by one.

GhostCatch sits in the middle: users stay in control, but they can also scan a bill, receipt, or confirmation email and let the app detect the subscription details for them.`,
    ],
    [
      "How does it work?",
      `I built GhostCatch around three simple flows: add, detect, and remind.

Users can manually add a subscription when they already know what they're paying for, or use the scan feature to capture a bill, receipt, or subscription confirmation. The app extracts the key details automatically: service name, price, billing cycle, and renewal date.

Once saved, each subscription becomes part of a clean library where users can see what they pay for, how often they pay, and what is coming up next. Before a renewal, GhostCatch sends a gentle reminder so users can decide whether to keep, cancel, or review it.`,
    ],
    [
      "How did it come together?",
      `GhostCatch started as a way for me to keep up with emerging AI-assisted product workflows while forcing myself to actually ship something. Not a prototype, not a portfolio concept: a real app, available on Android, used by real people.

I used competitor research to find the gap, quick prototyping to shape the experience, and AI-assisted workflows to move faster from idea to production. The build was intentionally lean: ship the smallest useful version, watch how users respond, improve the flows, and keep the product simple enough to understand immediately.`,
    ],
    [
      "What did it give back?",
      `Within six weeks of launch, GhostCatch grew to 2,000 users and started generating passive income. More importantly, it proved something to me as a product builder: I could independently spot a market gap, build a usable product, launch it, and get real people to use it.

It also changed how I think about AI-assisted workflows. The value was not that "AI built the app for me." The value was that AI reduced the distance between idea, prototype, and release. GhostCatch became one of my clearest examples of high-agency product work: find a painful everyday problem, add a better experience layer, ship fast, and learn from the market.`,
    ],
  ],
  "scrollar-founder-2026": [
    [
      "What is this beautiful thing you made?",
      `Scrollar started from a feeling I think many people know too well: opening your phone "just for five minutes," then realizing half an hour disappeared.

I wanted to build a screen time manager that felt less like a punishment and more like a small, motivating system for reclaiming attention. Most screen time tools feel cold, hidden in settings, or too easy to ignore. Scrollar turns the experience into something more visual, emotional, and playful.

The name comes from Scrolling + Dollar. The idea is simple: every scroll has a cost. Not always in money, but in focus, energy, sleep, creativity, relationships, and real-life experiences. Scrollar helps users set limits, block distracting apps, track the time they save, and stay motivated through Hammy, a retro pixel-style pig companion that grows as users reclaim their time.`,
    ],
    [
      "What problem were you solving?",
      `The starting point was simple: more and more people know they spend too much time on their phones, but knowing the problem does not automatically change the behavior. On Reddit, TikTok, and other social platforms, people openly talk about phone addiction, doomscrolling, and the feeling of breaking the same promise to themselves again and again.

Apple already has Screen Time, but the conversations around it revealed two major pain points: it is too easy to bypass, and it does not give users enough flexibility. Many people don't just need a limit. They need a system that feels personal, harder to ignore, and motivating enough to survive past the first few days.`,
    ],
    [
      "What did you build differently?",
      `I designed Scrollar around three ideas: granular control, stronger blocking, and emotional engagement.

Users can define more specific screen time rules instead of relying on one generic blocking mode. The app is designed to make bypassing limits harder, so the user's future self is better protected from their impulsive self. And instead of making the experience feel punitive, Scrollar turns progress into something visible: Hammy grows as users save time and unlocks playful skins inspired by childhood characters and internet culture.

The inspiration came partly from products like Duolingo. Innovation is not always about inventing a completely new category. Sometimes, it is about taking a proven engagement mechanic from one domain and applying it to a behavior that badly needs a better experience.`,
    ],
    [
      "How did it come together?",
      `The hardest part was not only building the app. It was earning the right to build it properly. Screen time data is sensitive, and access to these APIs requires strict platform approval and privacy requirements. That forced me to think carefully about trust, user consent, data minimization, and how to explain the product clearly.

Once the foundation was unlocked, I used AI-assisted workflows with tools like Claude Code, Google Stitch, and Figma Make to move quickly from idea to prototype to launch. I designed the onboarding very intentionally: not just asking users what they want to block, but helping them realize what their screen time is costing them, and showing what they could gain by changing the habit.`,
    ],
    [
      "What did it give back?",
      `Within six weeks of launch, Scrollar grew to 1,500 users. More importantly, it taught me how much product management in consumer products is about behavior, not just features.

A screen time app is not successful because it has a timer. It is successful if it helps someone make a better decision in a weak moment. Scrollar became a strong exercise in user-centric product thinking: understand the emotional pain, study why existing solutions fail, design around motivation and friction, navigate privacy constraints, ship fast, and learn from real users.`,
    ],
  ],
  "docusign-pm-2025": [
    [
      "What was I managing?",
      `I worked on Identify, the product portfolio that verifies whether someone is really who they claim to be before they can access or sign a Docusign document.

A simple example: when you open a Docusign envelope and need to enter a phone number, receive an OTP, and confirm your identity. That is identity verification. It is one of Docusign's biggest add-ons, used by customers around the world to protect sensitive agreements.

I managed products including Phone Authentication, eID, and Identity Wallet, with Phone Authentication being the most-used product in the portfolio, processing 10M+ transactions per month.`,
    ],
    [
      "What made the product space hard?",
      `Identity verification is not a place where you can "move fast and break things." The product sits directly between trust, compliance, customer workflows, and the signing experience. If the experience is too slow, users drop. If it is too loose, security suffers. If a migration is handled poorly, customer systems can break.

That made the role deeply cross-functional. I worked with Engineering, Design, Compliance, Legal, Strategic Partnerships, Support, and GTM teams across a complex international organization. A big part of the job was not just defining what to build, but making sure every team understood the trade-offs behind the decision.`,
    ],
    [
      "How did I modernize without breaking trust?",
      `A major part of my work focused on Phone Authentication, the most widely used identity product in the portfolio. The challenge was that Docusign had multiple Phone Auth experiences running on different technical stacks. One legacy version was still heavily used by customers, but its outdated UX and old tech stack created high maintenance costs and around 2,200 support tickets per year.

The strategic direction was clear: migrate customers toward the newer Phone Authentication experience and eventually sunset the legacy product. But the execution was delicate. Customers had built Phone Auth deeply into their workflows, and the legacy product still had features they depended on. We could not simply deprecate it and hope for the best.

So I helped define a multi-year sunset roadmap: understand what was blocking migration, identify which legacy capabilities needed to be rebuilt, and align stakeholders around a path that reduced risk while moving the product toward a more modern experience.`,
    ],
    [
      "What was the first unlock?",
      `One of the biggest blockers was a legacy feature that allowed trusted repeat users to skip authentication. For customers, this mattered because it reduced friction for people who had already proven their identity before. Without that feature, migrating to the new product would have meant a worse experience for some users.

So the first step was to rebuild this capability in the modern Phone Authentication product. I defined the product requirements and worked with 2 engineers and 2 designers to shape the experience. The feature was projected to reduce authentication time by 36% for 2M monthly trusted repeat users.

This was a good example of product judgment in a mature environment: sometimes the smartest feature is not the flashiest one. It is the one that removes a blocker, protects the customer experience, and unlocks a bigger strategic migration.`,
    ],
    [
      "How did I approach eID?",
      `On the eID side, the challenge was different. eID was more about market expansion, regulation, vendor strategy, and cost structure.

As international regulations evolved, more markets needed faster, more secure, and locally compliant ways to verify identity. At the same time, some existing eID providers had become expensive, while newer vendors offered better pricing, coverage, and service.

I worked on the integration of new eID suppliers into the Docusign platform, helping improve international coverage in markets where eID is critical, such as Germany and the Nordics. The initiative was projected to reduce yearly vendor costs by 65%, while strengthening Docusign's ability to serve regulated markets.`,
    ],
    [
      "What did it teach me?",
      `Docusign taught me how different product management feels at scale. In a startup, speed is often the biggest advantage. In a product like identity verification, precision matters just as much.

I learned how to make product decisions in a space where user experience, security, compliance, technical debt, vendor strategy, and customer trust all collide. It sharpened the way I think about trade-offs: not just "what should we build?" but "what can we change safely, who will be affected, what could break, and how do we bring everyone with us?"

That experience made me a stronger PM because it forced me to operate with both ambition and care. Move the product forward, yes, but never forget the trust sitting underneath it.`,
    ],
  ],
  "axa-pm-2024": [
    [
      "What was I working on?",
      `AXA's Global Design System is the shared foundation that helps AXA's international entities build digital products with the same brand language, design rules, and user experience standards.

Concretely, it includes design guidelines, Figma component libraries, and front-end component libraries used across web, mobile apps, landing pages, and other digital touchpoints. Haigo, the agency I worked for, originally initiated this global design system years ago. When I joined, my role was to continue evolving it as a Product Manager Consultant, working with 3 engineers, 1 tech lead, 2 other PMs, and 2 designers.`,
    ],
    [
      "What made it challenging?",
      `The hard part of a design system is not only building good components. It is getting people to actually use them.

AXA is a large and decentralized organization. Each local entity has different products, constraints, habits, maturity levels, and priorities. Some teams need components for mobile apps, others for web platforms or marketing pages. A "perfect" solution for everyone rarely exists.

So the real product challenge was adoption: how do we make the design system practical enough that local teams want to use it, flexible enough to fit different contexts, and consistent enough to protect the AXA brand globally?`,
    ],
    [
      "How did I approach it?",
      `I treated the local entities as users of the product. I spoke with them, collected feedback, understood their use cases, and helped prioritize the components and improvements that would create the most reusable value across the organization.

This meant constantly balancing trade-offs: global consistency versus local flexibility, design quality versus engineering capacity, long-term scalability versus short-term needs. As an external PM, I also had to be very intentional in how I communicated, not by imposing decisions from the outside, but by creating alignment and making the system feel useful for the teams who had to adopt it.`,
    ],
    [
      "What did we improve?",
      `One major initiative was the integration of Design Tokens. Instead of asking teams to manually choose the right color, spacing, or style every time, tokens gave them a more structured way to apply AXA's design rules based on context.

For example, a team building a landing page should not have to guess which shade of blue to use. The system should guide them toward the right design decision by default. That is the power of a good design system: it reduces friction, avoids inconsistencies, and helps teams move faster while staying on-brand.

These efforts contributed to a 32% increase in monthly active usage of AXA's Global Design System after one year.`,
    ],
    [
      "What else did I build?",
      `I also helped design, build, and deploy a design maturity assessment interface for 30+ AXA entities.

The goal was to help each entity assess its own digital and design maturity: what tools they were using, where they needed support, what capabilities were missing, and what opportunities could help them improve. The output was not just a score. It helped identify concrete opportunities: new tooling, training, leadership support, better resources, or stronger design practices.

This was especially interesting because it turned a vague transformation topic, "how mature are we digitally?", into something structured, visible, and actionable.`,
    ],
    [
      "What did it teach me?",
      `AXA taught me that a product does not always look like an app. Sometimes, the product is a system, a library, a workflow, or a shared language that helps many teams build better things.

It also taught me that adoption is a product problem. A design system can be beautifully made, but if teams don't understand it, trust it, or see how it helps their daily work, it fails. My role was to help bridge that gap: listen to teams, understand their constraints, prioritize what mattered most, and make the system easier to use at scale.

This experience made me a sharper PM because it forced me to think beyond one user journey. I had to think about many teams, many contexts, and one shared system that needed to work for all of them.`,
    ],
  ],
  "loreal-ux-2024": [
    [
      "What was I working on?",
      `I worked with Haigo for L'Oréal CMI (Customer & Market Insights) on a research project exploring how consumers interact with L'Oréal's digital experiences across multiple brands.

My focus was on two areas, data privacy and content experience, for two major brands of the house. The challenge was that each brand had its own way of collecting data, communicating with users, and creating content, but from the customer's point of view, all of these interactions still shaped the image of L'Oréal as a whole.`,
    ],
    [
      "How did I approach it?",
      `I led the research workstream for these topics from end to end: designing interview guides, recruiting consumers, running interviews, synthesizing insights, and turning them into recommendations.

The goal was not just to collect opinions. It was to understand how people build trust, what makes them uncomfortable, what kind of content they actually want from each platform, and how L'Oréal could create a more consistent experience without making every brand feel the same.`,
    ],
    [
      "What did we learn?",
      `On data privacy, the key learning was that users are not simply "for" or "against" sharing data. Their reaction depends heavily on context. They are more open to sharing information when the value exchange feels clear, useful, and proportionate: for example, better recommendations, more relevant content, or a smoother shopping experience. But when the request feels vague, hidden, or disconnected from an obvious benefit, trust drops quickly.

On content, we saw that consumers do not expect the same thing from every platform. On TikTok, they are more open to entertainment, creator-led formats, trends, and content that feels spontaneous or educational without being too polished. On Instagram, aesthetics matter much more: people expect visual consistency, aspiration, brand universe, and beautiful product storytelling. For a house like L'Oréal, this means content strategy cannot be copy-pasted across channels. The same brand needs to adapt its tone, format, and level of polish depending on where the customer meets it.`,
    ],
    [
      "What did it become?",
      `Together with other UX researchers, we designed a multi-brand customer journey framework mapping 16 touchpoints across digital, retail, and customer-facing channels.

The framework helped L'Oréal teams visualize the highs and lows of the customer experience: where consumers felt inspired, where trust could be strengthened, where content helped decision-making, and where the experience risked becoming confusing or overwhelming.`,
    ],
    [
      "What did it teach me?",
      `This project taught me how to run research in a structured, useful, and business-oriented way. Good research is not just about asking questions; it is about turning messy human signals into decisions that teams can actually act on.

It also reinforced something I strongly believe as a PM: trust, clarity, relevance, and channel fit are not "soft" topics. They directly shape engagement, conversion, loyalty, and brand perception.`,
    ],
  ],
  "darkfindr-pm-2023": [
    [
      "What was I walking into?",
      `I joined Wannath right after school as an IT Engineer Consultant, working on cybersecurity projects. Very quickly, I became curious about the product side: not just how security tools work, but who they are for, what pain they solve, and why a company would actually buy them.

That curiosity led me to DarkFindR, an internal incubator project around dark web monitoring. At the time, the product was still blurry. Previous teams had added features, but the product lacked a clear buyer, use case, positioning, and commercial story. Wannath had struggled to sell it, so my role became to help reset the direction.`,
    ],
    [
      "How did I approach it?",
      `I started by going back to the basics: who is the buyer, who is the user, what problem are we solving, and what gap exists in the market?

Because this was a B2B cybersecurity product, I spent the first month speaking with potential buyers and users to understand how companies deal with leaked data on the dark web, what existing solutions failed to cover, and what kind of alerts or intelligence would actually be useful enough to pay for.`,
    ],
    [
      "What did we build?",
      `Working with two engineers, I helped redefine the MVP around a smaller, clearer set of features instead of continuing to stack functionality without purpose.

The goal was not to build the most complete dark web monitoring platform. It was to build the first version that could prove the product's value: identify leaked company data, make the risk understandable, and help teams act on it before it became a bigger security issue.`,
    ],
    [
      "What did it unlock?",
      `Once the product story became clearer, we decided the next step was to apply to CyberBooster, a French cybersecurity incubator. Cybersecurity was becoming a strategic topic in France, and we believed DarkFindR could fit that momentum.

The project was accepted, and we secured €150K in funding. Beyond the money, CyberBooster gave us access to something just as valuable: a network of potential buyers, strategic advice, leads, training, and credibility in the cybersecurity ecosystem.`,
    ],
    [
      "What did it teach me?",
      `DarkFindR was my first real lesson in product management: a product is not a pile of features. A product needs a clear user, a clear buyer, a clear pain, and a reason to exist in the market.

It also taught me how powerful product positioning can be. The same technology can feel confusing or compelling depending on how clearly you frame the problem, the customer, and the business value. For a first PM experience, it was intense, but it gave me the foundation for how I still think today: start with the problem, talk to the market, define the smallest valuable product, and build around a story people can believe in.`,
    ],
  ],
};

type Recommendation = {
  name: string;
  initials: string;
  headline: string;
  org: string;
  relationship: string;
  date: string;
  accent: string;
  source: string;
  image: string;
  width: number;
  height: number;
};

const recommendations: Recommendation[] = [
  {
    name: "Melanie Moreno",
    initials: "MM",
    headline: "Product Director, Identify at DocuSign",
    org: "DocuSign",
    relationship: "Managed Nguyen directly",
    date: "Nov 2025",
    accent: "#3b6fb6",
    source: "LinkedIn",
    image: "/recommendations/melanie.png",
    width: 1342,
    height: 504,
  },
  {
    name: "Lucas Grassi Gurfein",
    initials: "LG",
    headline: "Product leader building global identity & compliance systems",
    org: "DocuSign",
    relationship: "Senior to Nguyen on the Identify team",
    date: "Nov 2025",
    accent: "#2f9e8f",
    source: "LinkedIn",
    image: "/recommendations/lucas.png",
    width: 1368,
    height: 648,
  },
  {
    name: "Amaury Chapelle",
    initials: "AC",
    headline: "Supervisor & collaborator, Unitech Alumni Association",
    org: "Unitech Alumni Association",
    relationship: "Worked closely with Nguyen for a year",
    date: "2023",
    accent: "#7c5cf0",
    source: "Reference letter",
    image: "/recommendations/unitech.png",
    width: 1068,
    height: 1560,
  },
  {
    name: "Hilti Corporation",
    initials: "HC",
    headline: "Reference · Energy & Industry, Fire Protection",
    org: "Hilti",
    relationship: "Internship, Schaan (Liechtenstein)",
    date: "Apr–Aug 2022",
    accent: "#d2051e",
    source: "Reference letter",
    image: "/recommendations/hilti.png",
    width: 1280,
    height: 1818,
  },
];

type ProductOSTopic = {
  title: string;
  question: string;
  paras: string[];
};

const productOS: ProductOSTopic[] = [
  {
    title: "I start with the real problem, not just the request",
    question: "How do you decide what's truly worth solving?",
    paras: [
      `When someone brings a requirement, I try not to jump directly into solution mode. A request is often only the surface of something deeper: a user frustration, a business constraint, an internal process issue, or a technical limitation that has been ignored for too long.`,
      `I learned this especially while working on legacy authentication products at Docusign. On the surface, the problem looked like support tickets and outdated user flows. But underneath, it was also about technical debt, slow feature development, client frustration, and the difficulty of evolving a product used by millions of customers. That experience taught me that before building the thing right, I need to understand whether we are solving the right problem.`,
    ],
  },
  {
    title: "I look for the opportunity behind the problem",
    question: "Where do your best product ideas come from?",
    paras: [
      `I'm naturally curious about gaps: gaps in the market, gaps in user experience, gaps between what people need and what existing products actually offer. That's probably the entrepreneurial part of me.`,
      `I saw this while building Fepha, my Vietnamese specialty coffee brand. At first, it looked like a simple consumer product idea. But the more I explored the market, the more I saw a bigger opportunity: Vietnamese coffee was often known in Europe through nostalgic or mass-market clichés, while its specialty side was still underrepresented. That pushed me to think not only about the product, but also about positioning, storytelling, sourcing, packaging, logistics, and go-to-market. A good opportunity is rarely just one feature or one product. It is a full system to build around.`,
    ],
  },
  {
    title: "I use research to make things less blurry",
    question: "How do you make decisions under ambiguity?",
    paras: [
      `I don't see research as a formal step that happens before "real product work." For me, research is how I make unclear problems easier to work with. When there is ambiguity, my first reflex is to separate facts from assumptions: what do we actually know, what are we guessing, and which assumption could hurt us the most if we are wrong?`,
      `At L'Oréal, interviewing customers across France, the UK, and the US taught me how differently people can interpret the same topic, like data privacy or e-commerce content, depending on culture, context, and expectations. At AXA, working with 30+ entities taught me that research is not only about external users. Internal teams also have needs, constraints, habits, and blind spots. In both cases, research helped turn messy signals into clearer product decisions.`,
      `But I also learned that research does not remove ambiguity completely, and that's okay. At some point, you need to make a decision with the best evidence available. That's why I try to define what success would look like upfront: the behavior we want to change, the metric we want to move, or the learning we want to get. Then I revisit the decision after launch or adoption, using real feedback to decide whether we should double down, adjust, or rethink the approach.`,
    ],
  },
  {
    title: "I prototype fast because ideas need to be tested",
    question: "How do you de-risk an idea before building?",
    paras: [
      `I like making ideas tangible quickly. A rough prototype is often more useful than a perfect document, because people can react to it. Users can tell you what feels wrong. Designers can challenge the flow. Engineers can spot complexity. Stakeholders can finally see what you mean.`,
      `Building Scrollar and GhostCatch made this very real for me. When you don't have a large team, you can't hide behind process forever. You need to build, test, learn, and adjust. AI-assisted tools like Claude Code, Google Stitch, and Figma Make helped me move faster, but the real lesson was not "AI makes things quick." The lesson was that the faster I can make an idea testable, the faster I can find out whether it deserves more investment.`,
    ],
  },
  {
    title: "I handle competing priorities by making trade-offs visible",
    question: "How do you handle competing priorities?",
    paras: [
      `A big part of product management is helping teams decide what matters most when everything feels important. I try not to treat prioritization as a political debate or a loudest-voice-wins exercise. Instead, I like making the decision more structured: what is the expected user value, business impact, urgency, confidence level, and effort?`,
      `Depending on the context, I use frameworks like RICE to compare opportunities more objectively, but I don't treat the score as the decision itself. The score is a conversation tool. It helps surface assumptions, compare impact versus effort, and make trade-offs easier to discuss. Then I bring in inputs from engineering, design, compliance, support, GTM, or clients to understand technical complexity, regulatory constraints, operational risk, and customer impact.`,
      `Docusign taught me how important this is in a regulated product environment. A better authentication experience is not just a UX improvement; it also involves security, compliance, engineering feasibility, vendor constraints, support burden, and market coverage. AXA taught me the same thing at organizational scale: when many local entities rely on the same design system, prioritization is not only about building the best component, but about choosing what creates the most reusable value across teams.`,
      `Over time, I've learned that good prioritization is not about making everyone fully happy. It's about helping everyone understand why a decision makes sense, what trade-offs we are accepting, and what we will revisit later if the context changes.`,
    ],
  },
  {
    title: "I ship, measure, and keep learning",
    question: "How do you know if a product actually worked?",
    paras: [
      `I care about shipping. A product only becomes real when people use it, react to it, struggle with it, or benefit from it. But I don't see launch as the finish line. It's more like the start of the next learning loop.`,
      `Some of my most valuable product lessons came from measuring what happened after the work was shipped or adopted: reducing authentication time, lowering vendor costs, increasing design system usage, identifying UX improvement opportunities, or seeing real users interact with my own apps. These outcomes remind me that the goal is not to ship more things. The goal is to create a change that users, teams, or the business can actually feel.`,
    ],
  },
];

type OSMessageKind =
  | { kind: "intro" }
  | { kind: "menu" }
  | { kind: "user"; topic: number }
  | { kind: "answer"; topic: number }
  | { kind: "thinking" };

type OSMessage = OSMessageKind & { id: number };

function NiSpark() {
  return (
    <span className="claude-msg-spark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1c.4 3.6 1.2 5.8 2.5 7.1S17.4 10.6 21 11c-3.6.4-5.8 1.2-7.1 2.5S12.4 17.4 12 21c-.4-3.6-1.2-5.8-2.5-7.1S6.6 11.4 3 11c3.6-.4 5.8-1.2 7.1-2.5S11.6 4.6 12 1Z" />
      </svg>
    </span>
  );
}

function ProductOSChat() {
  const [messages, setMessages] = useState<OSMessage[]>([]);
  const threadRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const idRef = useRef(0);
  const startedRef = useRef(false);

  const addThinking = () =>
    setMessages((prev) => [
      ...prev,
      { id: (idRef.current += 1), kind: "thinking" },
    ]);
  const reveal = (msg: OSMessageKind) =>
    setMessages((prev) => [
      ...prev.filter((m) => m.kind !== "thinking"),
      { ...msg, id: (idRef.current += 1) } as OSMessage,
    ]);

  useEffect(() => {
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;
    addThinking();
    setTimeout(() => {
      reveal({ kind: "intro" });
      setTimeout(() => {
        addThinking();
        setTimeout(() => reveal({ kind: "menu" }), 750);
      }, 450);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = threadRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const pick = (topic: number) => {
    if (busyRef.current) {
      return;
    }
    busyRef.current = true;
    setMessages((prev) => {
      const base =
        prev[prev.length - 1]?.kind === "menu" ? prev.slice(0, -1) : prev;
      return [
        ...base,
        { id: (idRef.current += 1), kind: "user", topic },
        { id: (idRef.current += 1), kind: "thinking" },
      ];
    });
    setTimeout(() => {
      reveal({ kind: "answer", topic });
      setTimeout(() => {
        addThinking();
        setTimeout(() => {
          reveal({ kind: "menu" });
          busyRef.current = false;
        }, 800);
      }, 450);
    }, 1150);
  };

  return (
    <main className="claude-main claude-main-chat">
      <div className="claude-thread" ref={threadRef}>
        {messages.map((msg) => {
          if (msg.kind === "thinking") {
            return (
              <div className="claude-msg claude-msg-ni claude-anim" key={msg.id}>
                <NiSpark />
                <div className="claude-thinking" aria-label="Thinking">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            );
          }
          if (msg.kind === "intro") {
            return (
              <div className="claude-msg claude-msg-ni claude-anim" key={msg.id}>
                <NiSpark />
                <div className="claude-msg-body">
                  <p className="claude-os-heading">
                    My Product Operating System
                  </p>
                  <p>
                    I like building products from messy starting points.
                    Sometimes it&apos;s a vague user pain, sometimes it&apos;s a
                    stakeholder request, sometimes it&apos;s a market opportunity
                    that feels obvious but hasn&apos;t been properly explored yet.
                  </p>
                  <p>
                    Over time, working across B2B SaaS, UX research, design
                    systems, identity verification, consumer apps, and even
                    e-commerce, I&apos;ve learned that product management is
                    rarely about having the smartest idea in the room. It&apos;s
                    more often about creating clarity, making trade-offs visible,
                    bringing people with different perspectives together, and
                    moving forward before everything feels perfectly certain.
                  </p>
                </div>
              </div>
            );
          }
          if (msg.kind === "menu") {
            return (
              <div className="claude-msg claude-msg-ni claude-anim" key={msg.id}>
                <NiSpark />
                <div className="claude-msg-body">
                  <p className="claude-os-menu-q">
                    What do you want to know more about how I operate?
                  </p>
                  <div className="claude-os-options">
                    {productOS.map((topic, topicIndex) => (
                      <button
                        type="button"
                        key={topic.title}
                        className="claude-os-option"
                        onClick={() => pick(topicIndex)}
                      >
                        {topic.question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
          if (msg.kind === "user") {
            return (
              <div
                className="claude-msg claude-msg-user claude-anim"
                key={msg.id}
              >
                <p>{productOS[msg.topic].question}</p>
              </div>
            );
          }
          return (
            <div className="claude-msg claude-msg-ni claude-anim" key={msg.id}>
              <NiSpark />
              <div className="claude-msg-body">
                <p className="claude-os-heading">{productOS[msg.topic].title}</p>
                {productOS[msg.topic].paras.map((para, paraIndex) => (
                  <p key={paraIndex}>{para}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="claude-reply">
        <div className="claude-reply-bar">
          <span className="claude-plus" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
          <span className="claude-reply-placeholder">Reply to NI…</span>
          <span className="claude-reply-send" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </span>
        </div>
      </div>
    </main>
  );
}

type ValueTopic = { id: string; tab?: string; title: string; para: string };

const valueTopics: ValueTopic[] = [
  {
    id: "fair",
    tab: "I do not expect life to be fair",
    title:
      "I do not expect life to be fair, but I do expect myself to rise from mistakes",
    para: `Coming from an underrepresented background, I've had moments where life felt unfair in very real ways, where the lack of access, guidance, network, or familiarity with the system cost me opportunities. Sometimes, I made mistakes because I was still learning the rules of the game. And sometimes, honestly, it was just pure bad luck: the wrong timing, the wrong context, the wrong door closing before I even had a chance to prove myself. Moving countries, changing paths, building products, interviewing, failing, restarting. None of it has ever felt perfectly fair or perfectly timed.

But I do believe in my ability to learn, recover, and come back sharper. For me, resilience is not about pretending things are easy or forcing every setback to have a beautiful meaning. It's about refusing to let one rejection, one failure, or one unlucky moment become my final definition.`,
  },
  {
    id: "motion",
    title: "An idiot in motion is greater than an immobile genius",
    para: `I have a strong bias for action. I would rather build a rough prototype, talk to users, test an ugly first version, or send the first message than wait forever for the perfect plan. Some of my best learnings came from moving before I felt fully ready. Thinking matters, of course, but in product, motion creates feedback, and feedback creates better judgment.`,
  },
  {
    id: "luck",
    title: "I can create luck",
    para: `I don't see luck as something purely random. A lot of luck comes from increasing the surface area for opportunities: meeting people, sharing work, asking questions, building side projects, applying even when it feels ambitious, and putting ideas into the world. I can't control every outcome, but I can control how often I show up, how prepared I am, and how many doors I give life the chance to open.`,
  },
  {
    id: "giveback",
    title: "Always give back to your community",
    para: `I wouldn't be where I am without people who shared advice, opened doors, reviewed my work, or simply believed I could do more. That makes me feel responsible to do the same for others. I actively contribute to the Vietnamese student community by coaching and advising students who are starting their journey in Europe, especially when they are navigating studies, careers, interviews, or life in a new country.

Giving back has also been a big part of my experience with the UNITECH international community. After two meaningful years in the program, I continued for two more years as PMO and Paris Local Chapter lead, organizing events, connecting people, and helping grow the network. For me, success feels more meaningful when it circulates, when what I've learned can make someone else's path a little less lonely, confusing, or intimidating.`,
  },
  {
    id: "uncomfortable",
    title: "I grow when I feel uncomfortable",
    para: `My first flight abroad was the flight that brought me to France at 17. I was leaving home, entering a country where I did not yet speak the language fluently, and carrying not only my own hopes, but also the dreams of my parents. They come from a modest working-class background in Vietnam, and they taught me early the value of hard work, education, and perseverance.

I was scared, of course. But I was never demotivated. That discomfort became the beginning of a much bigger journey: learning a new language, adapting to a new culture, earning my place in higher education, and becoming the first person in my family to pursue university studies. Since then, I've learned to see discomfort as a signal that I'm entering a new level. Not every uncomfortable situation is good, but many of them have shown me who I can become when I don't run away too early.`,
  },
];

function ClaudeReplyBar() {
  return (
    <div className="claude-reply">
      <div className="claude-reply-bar">
        <span className="claude-plus" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
        <span className="claude-reply-placeholder">Reply to NI…</span>
        <span className="claude-reply-send" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function ValueChat({ value }: { value: ValueTopic }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 850);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="claude-main claude-main-chat">
      <div className="claude-thread">
        {revealed ? (
          <div className="claude-msg claude-msg-ni claude-anim">
            <NiSpark />
            <div className="claude-msg-body">
              <p className="claude-os-heading">{value.title}</p>
              {value.para.split("\n\n").map((para, paraIndex) => (
                <p key={paraIndex}>{para}</p>
              ))}
            </div>
          </div>
        ) : (
          <div className="claude-msg claude-msg-ni claude-anim">
            <NiSpark />
            <div className="claude-thinking" aria-label="Thinking">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>
      <ClaudeReplyBar />
    </main>
  );
}

function ChatItemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
      <path d="M4 5h16v11H9l-5 4z" />
    </svg>
  );
}

function AssistantWindow({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState("product-os");
  const activeValue = valueTopics.find((value) => value.id === selected);

  return (
    <div className="claude-window">
      <aside className="claude-sidebar">
        <div className="claude-sidebar-head">
          <WindowControls title={title} onClose={onClose} />
          <div className="claude-sidebar-tools" aria-hidden="true">
            <span className="claude-tool">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <rect x="3" y="4" width="18" height="16" rx="2.5" />
                <line x1="9" y1="4" x2="9" y2="20" />
              </svg>
            </span>
            <span className="claude-tool">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </span>
          </div>
        </div>

        <p className="claude-section-label">Pinned</p>
        <div className="claude-pinned">
          <button
            type="button"
            className={`claude-chat-item ${
              selected === "product-os" ? "is-active" : ""
            }`}
            onClick={() => setSelected("product-os")}
          >
            <ChatItemIcon />
            My Product Acumen
          </button>
        </div>

        <p className="claude-section-label">What I believe</p>
        <div className="claude-pinned">
          {valueTopics.map((value) => (
            <button
              type="button"
              key={value.id}
              className={`claude-chat-item ${
                selected === value.id ? "is-active" : ""
              }`}
              onClick={() => setSelected(value.id)}
            >
              <ChatItemIcon />
              {value.tab ?? value.title}
            </button>
          ))}
        </div>
      </aside>

      {activeValue ? (
        <ValueChat key={activeValue.id} value={activeValue} />
      ) : (
        <ProductOSChat />
      )}
    </div>
  );
}

function InterestSidebarIcon({ icon }: { icon: InterestIcon }) {
  if (icon === "restaurant") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.1 13.34 10.96 10.5l-1.41-1.41-2.12 2.12-4.24-4.24L1.78 8.38zm6.31-9.18h-1.56v6.75c0 1.07.83 1.94 1.87 2.06V20h1.56v-6.03c1.04-.12 1.87-.99 1.87-2.06V4.16h-1.56v3.12h-1.09zm5.07 0v8.75h1.56V20h1.56V4.16z" />
      </svg>
    );
  }

  if (icon === "flight") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m21 16-8.5-2.27V6.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v7.23L1 16v2l8.5-1.5V21l-2.5 1.5V24l4-1 4 1v-1.5L12.5 21v-4.5L21 18z" />
      </svg>
    );
  }

  if (icon === "music") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v10.55A4 4 0 1 0 14 17V7h6V3z" />
      </svg>
    );
  }

  if (icon === "palette") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0 0 18h1.6a2.4 2.4 0 0 0 0-4.8h-1.18a1.4 1.4 0 0 1 0-2.8H14A7 7 0 0 0 14 3zm-4.5 9A1.5 1.5 0 1 1 9 10.5 1.5 1.5 0 0 1 7.5 12m3-4A1.5 1.5 0 1 1 12 6.5 1.5 1.5 0 0 1 10.5 8m3 0A1.5 1.5 0 1 1 15 6.5 1.5 1.5 0 0 1 13.5 8m3 4a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 16.5 12" />
      </svg>
    );
  }

  if (icon === "coffee") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.5 3H6v10a4 4 0 0 0 4 4h5a4 4 0 0 0 3.87-3H19a3 3 0 0 0 0-6h-.5zm0 8h-.63V6H19a2 2 0 0 1 0 4zM6 19h14v2H6z" />
      </svg>
    );
  }

  return null;
}

export default function DockWindowManager() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);
  const [selectedNote, setSelectedNote] = useState<NoteItem>(defaultSelectedNote);
  const [selectedInterestId, setSelectedInterestId] = useState("eat");
  const photosGridRef = useRef<HTMLDivElement>(null);
  const viewWorkCursorRef = useRef<HTMLDivElement>(null);

  const selectedInterest =
    interestCategories.find((category) => category.id === selectedInterestId) ??
    interestCategories[0];

  useEffect(() => {
    photosGridRef.current?.scrollTo({ top: 0 });
  }, [selectedInterestId]);

  useEffect(() => {
    const cursor = viewWorkCursorRef.current;
    if (!cursor) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
      const target =
        event.target instanceof Element ? event.target : null;
      const folder = target?.closest("[data-folder-window]");
      const dockItem = target?.closest<HTMLElement>("[data-window-app]");

      let label: string | null = null;
      if (folder) {
        label = "View Work";
      } else if (dockItem) {
        label =
          dockItem.dataset.windowTitle ||
          dockItem.getAttribute("aria-label") ||
          null;
      }

      if (label) {
        cursor.textContent = label;
        cursor.classList.add("is-visible");
        document.body.classList.add("has-view-work-cursor");
      } else {
        cursor.classList.remove("is-visible");
        document.body.classList.remove("has-view-work-cursor");
      }
    };

    const handleLeave = () => {
      cursor.classList.remove("is-visible");
      document.body.classList.remove("has-view-work-cursor");
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.body.classList.remove("has-view-work-cursor");
    };
  }, []);

  useEffect(() => {
    const handleDockClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const dockItem = event.target.closest<HTMLElement>("[data-window-app]");
      const app = dockItem?.dataset.windowApp;
      const folderItem = event.target.closest<HTMLElement>("[data-folder-window]");
      const folderId = folderItem?.dataset.folderWindow;

      if (folderItem && folderId) {
        const title = folderItem.dataset.folderTitle || "Project";
        const shortTitle = folderItem.dataset.folderShorttitle || title;
        const iconSrc = folderItem.dataset.folderIcon;
        const role = folderItem.dataset.folderRole || "Portfolio project";
        const zIndex = nextZIndex + 1;

        setNextZIndex(zIndex);
        setWindows((currentWindows) => {
          if (currentWindows.some((window) => window.id === folderId)) {
            return currentWindows.map((window) =>
              window.id === folderId ? { ...window, zIndex } : window,
            );
          }

          return [
            ...currentWindows,
            { id: folderId, kind: "folder", title, shortTitle, iconSrc, role, zIndex },
          ];
        });
        return;
      }

      if (!dockItem || !isWindowApp(app)) {
        return;
      }

      if (app === "contact") {
        window.location.href =
          "mailto:trnguyen.ngdn@gmail.com?subject=Hello%20Nguyen";
        return;
      }

      const title =
        dockItem.dataset.windowTitle ||
        dockItem.getAttribute("aria-label") ||
        "Window";
      const zIndex = nextZIndex + 1;

      setNextZIndex(zIndex);
      setWindows((currentWindows) => {
        if (currentWindows.some((window) => window.id === app)) {
          return currentWindows.map((window) =>
            window.id === app ? { ...window, zIndex } : window,
          );
        }

        return [
          ...currentWindows,
          { id: app, kind: "app", appId: app, title, zIndex },
        ];
      });
    };

    document.addEventListener("click", handleDockClick);

    return () => {
      document.removeEventListener("click", handleDockClick);
    };
  }, [nextZIndex]);

  const closeWindow = (id: string) => {
    setWindows((currentWindows) =>
      currentWindows.filter((window) => window.id !== id),
    );
  };

  const focusWindow = (id: string) => {
    const zIndex = nextZIndex + 1;

    setNextZIndex(zIndex);
    setWindows((currentWindows) =>
      currentWindows.map((window) =>
        window.id === id ? { ...window, zIndex } : window,
      ),
    );
  };

  return (
    <>
    <div className="mac-window-layer pointer-events-none fixed inset-0 z-30">
      {windows.map((window, index) => (
        <section
          key={window.id}
          className={`mac-app-window pointer-events-auto ${
            window.kind === "app" && window.appId
              ? `mac-app-window-${window.appId}`
              : "mac-folder-window"
          }`}
          style={
            { zIndex: window.zIndex, "--stack-index": index } as CSSProperties
          }
          aria-label={`${window.title} window`}
          onMouseDown={() => focusWindow(window.id)}
        >
          {window.kind === "folder" ? (
            <>
              <header className="folder-info-toolbar">
                <WindowControls
                  title={window.title}
                  onClose={() => closeWindow(window.id)}
                />
                <p className="folder-info-title">
                  {window.shortTitle ?? window.title}
                </p>
              </header>
              <div className="folder-info-content">
                <div className="folder-info-summary">
                  {window.iconSrc ? (
                    <Image
                      src={window.iconSrc}
                      alt=""
                      width={96}
                      height={96}
                      className="folder-info-logo"
                      aria-hidden="true"
                    />
                  ) : (
                    <div className="folder-info-thumbnail" aria-hidden="true" />
                  )}
                  <div>
                    <h2>{window.title}</h2>
                    <p className="folder-info-role">
                      <span>{window.role ?? "Portfolio project"}</span>
                      {folderLinks[window.id]?.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="folder-info-link"
                        >
                          {link.label}
                        </a>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="folder-info-description">
                  {folderIntros[window.id] ??
                    "This project window is structured like a macOS information panel. The final case study copy will replace these placeholders."}
                </div>
                <div className="folder-info-section-list">
                  {(projectFolderSections[window.id] ?? folderSections).map(([section, text], sectionIndex) => (
                    <section className="folder-info-section" key={section}>
                      <h3>{section}</h3>
                      <div className="folder-info-empty">
                        <ul className="folder-info-list">
                          {text.split("\n\n").map((para, paraIndex) => (
                            <li key={paraIndex}>{para}</li>
                          ))}
                        </ul>
                      </div>
                      {folderSectionMedia[window.id]?.[sectionIndex]?.map((media) => (
                        <figure className="folder-info-figure" key={media.src}>
                          {media.youtubeId ? (
                            <div className="folder-info-embed">
                              <iframe
                                src={`https://www.youtube-nocookie.com/embed/${media.youtubeId}`}
                                title={media.caption}
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          ) : /\.(mp4|webm|mov)$/i.test(media.src) ? (
                            <video
                              src={media.src}
                              poster={media.poster}
                              controls
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={media.src} alt={media.caption} loading="lazy" />
                          )}
                          <figcaption>{media.caption}</figcaption>
                        </figure>
                      ))}
                    </section>
                  ))}
                </div>
              </div>
            </>
          ) : window.id === "education" ? (
            <>
            <header className="safari-window-toolbar">
              <WindowControls
                title={window.title}
                onClose={() => closeWindow(window.id)}
              />
              <button
                type="button"
                className="safari-toolbar-button safari-sidebar-button"
                aria-label="Show sidebar"
              >
                <span aria-hidden="true" />
              </button>
              <button
                type="button"
                className="safari-toolbar-button safari-chevron safari-chevron-left"
                aria-label="Back"
                disabled
              />
              <button
                type="button"
                className="safari-toolbar-button safari-chevron safari-chevron-right"
                aria-label="Forward"
                disabled
              />
              <div className="safari-address-bar" aria-label="Address">
                <svg
                  className="safari-addr-lock"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                <span className="safari-address-text">
                  nguyen.ex-colleagues.recommendations
                </span>
                <svg
                  className="safari-addr-reload"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 11a8 8 0 1 0-2.3 5.7" />
                  <path d="M20 4v6h-6" />
                </svg>
              </div>
              <div className="safari-toolbar-actions" aria-hidden="true">
                <span className="safari-action safari-aa">Aa</span>
                <span className="safari-action">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 15V4" />
                    <path d="m8 7 4-3 4 3" />
                    <path d="M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
                  </svg>
                </span>
                <span className="safari-action">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                <span className="safari-action">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="6" width="13" height="13" rx="2.5" />
                    <path d="M8 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1" />
                  </svg>
                </span>
              </div>
            </header>
            <div className="safari-page">
              <div className="rec-site">
                <h1 className="rec-title">
                  What people say about working with me?
                </h1>

                {recommendations.map((rec) => (
                  <article
                    className="rec-card"
                    key={rec.name}
                    style={{ "--accent": rec.accent } as CSSProperties}
                  >
                    <div className="rec-card-head">
                      <span className="rec-avatar" aria-hidden="true">
                        {rec.initials}
                      </span>
                      <div className="rec-id">
                        <div className="rec-name-row">
                          <h3>{rec.name}</h3>
                          <span className="rec-org-pill">{rec.org}</span>
                        </div>
                        <p className="rec-headline">{rec.headline}</p>
                        <p className="rec-rel">
                          {rec.relationship} · {rec.date}
                        </p>
                      </div>
                      <span className="rec-source">{rec.source}</span>
                    </div>
                    <figure className="rec-shot-wrap">
                      <Image
                        src={rec.image}
                        width={rec.width}
                        height={rec.height}
                        className="rec-shot"
                        alt={`Recommendation for Nguyen from ${rec.name} — ${rec.headline}`}
                        unoptimized
                      />
                    </figure>
                  </article>
                ))}

                <footer className="rec-footer">
                  <span className="rec-address-dot" aria-hidden="true" />
                  nguyen.ex-colleagues.recommendations
                </footer>
              </div>
            </div>
            </>
          ) : window.id === "resume" ? (
            <>
              <header className="notes-window-toolbar">
                <WindowControls
                  title={window.title}
                  onClose={() => closeWindow(window.id)}
                />
                <button
                  type="button"
                  className="notes-toolbar-button notes-sidebar-button"
                  aria-label="Show folders"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                    <rect x="3" y="5" width="18" height="14" rx="2.5" />
                    <line x1="9" y1="5" x2="9" y2="19" />
                  </svg>
                </button>
                <div className="notes-toolbar-title">
                  <strong>All iCloud</strong>
                  <span>267 notes</span>
                </div>
                <div className="notes-toolbar-left-actions" aria-hidden="true">
                  <span className="notes-tb-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="6" cy="12" r="1.6" />
                      <circle cx="12" cy="12" r="1.6" />
                      <circle cx="18" cy="12" r="1.6" />
                    </svg>
                  </span>
                  <span className="notes-tb-divider" />
                  <span className="notes-tb-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6" />
                      <path d="M18.4 2.6a2 2 0 0 1 2.8 2.8L12 14.7l-3.6 1 1-3.6z" />
                    </svg>
                  </span>
                </div>
                <div className="notes-toolbar-center-actions" aria-hidden="true">
                  <span className="notes-tb-aa">Aa</span>
                  <span className="notes-tb-glyph">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 7.5 1.4 1.4L7 6.3" />
                      <path d="m3 16 1.4 1.4L7 14.8" />
                      <line x1="11" y1="7.5" x2="21" y2="7.5" />
                      <line x1="11" y1="16" x2="21" y2="16" />
                    </svg>
                  </span>
                  <span className="notes-tb-glyph">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                      <rect x="3" y="4.5" width="18" height="15" rx="2" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <line x1="3" y1="14.5" x2="21" y2="14.5" />
                      <line x1="9" y1="4.5" x2="9" y2="19.5" />
                      <line x1="15" y1="4.5" x2="15" y2="19.5" />
                    </svg>
                  </span>
                  <span className="notes-tb-glyph">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.5 11.5 12 20a5 5 0 0 1-7-7l8-8a3.3 3.3 0 0 1 4.7 4.7l-8 8a1.6 1.6 0 0 1-2.3-2.3l7.4-7.4" />
                    </svg>
                  </span>
                </div>
                <div className="notes-toolbar-right-actions" aria-hidden="true">
                  <span className="notes-tb-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 15V4" />
                      <path d="m8 7 4-3 4 3" />
                      <path d="M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
                    </svg>
                  </span>
                  <span className="notes-tb-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="6" cy="12" r="1.6" />
                      <circle cx="12" cy="12" r="1.6" />
                      <circle cx="18" cy="12" r="1.6" />
                    </svg>
                  </span>
                  <span className="notes-tb-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                      <circle cx="11" cy="11" r="7" />
                      <line x1="16.5" y1="16.5" x2="21" y2="21" />
                    </svg>
                  </span>
                </div>
              </header>
              <div className="notes-window-content">
                <aside className="notes-sidebar">
                  {noteGroups.map((group) => (
                    <section className="notes-group" key={group.title}>
                      <h2>{group.title}</h2>
                      {group.notes.map((note) => (
                        <button
                          type="button"
                          className={`notes-list-item notes-list-button ${
                            selectedNote.title === note.title ? "is-active" : ""
                          }`}
                          key={note.title}
                          onClick={() => setSelectedNote(note)}
                        >
                          <h3>{note.title}</h3>
                          <span>
                            <svg
                              className="notes-folder-icon"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.8}
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4l1.8 2h9.2A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
                            </svg>
                            {note.folder}
                          </span>
                        </button>
                      ))}
                    </section>
                  ))}
                </aside>
                <main className="notes-editor">
                  <time dateTime="2026-07-10T11:05">10 July 2026 at 11:05</time>
                  <article
                    className={`notes-document ${
                      selectedNote.pdfHref ? "notes-document-pdf" : ""
                    }`}
                  >
                    <header className="notes-document-header">
                      <h2>{selectedNote.title}</h2>
                      {selectedNote.pdfHref ? (
                        <a
                          className="notes-download-button"
                          href={selectedNote.pdfHref}
                          download={selectedNote.download}
                        >
                          Download PDF
                        </a>
                      ) : null}
                    </header>
                    {selectedNote.pdfHref ? (
                      <iframe
                        className="notes-pdf-frame"
                        src={`${selectedNote.pdfHref}#view=FitH`}
                        title={selectedNote.title}
                      />
                    ) : (
                      <div className="notes-document-copy">
                        {selectedNote.content?.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {selectedNote.checklistSections?.map((section) => (
                          <section
                            className="notes-checklist-section"
                            key={section.heading}
                          >
                            <h3>{section.heading}</h3>
                            <ul className="notes-checklist">
                              {section.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </section>
                        ))}
                      </div>
                    )}
                  </article>
                </main>
              </div>
            </>
          ) : window.id === "vibes" ? (
            <>
              <header className="photos-window-toolbar">
                <WindowControls
                  title={window.title}
                  onClose={() => closeWindow(window.id)}
                />
                <button
                  type="button"
                  className="photos-sidebar-toggle"
                  aria-label="Show sidebar"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                    <rect x="3" y="5" width="18" height="14" rx="2.5" />
                    <line x1="9" y1="5" x2="9" y2="19" />
                  </svg>
                </button>
                <div className="photos-toolbar-title">
                  <strong>My interests</strong>
                  <span>23 Jun 2026</span>
                </div>
                <div className="photos-toolbar-actions" aria-hidden="true">
                  <div className="photos-tb-group">
                    <span className="photos-tb-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                        <rect x="4" y="4" width="7" height="7" rx="1.5" />
                        <rect x="13" y="4" width="7" height="7" rx="1.5" />
                        <rect x="4" y="13" width="7" height="7" rx="1.5" />
                        <rect x="13" y="13" width="7" height="7" rx="1.5" />
                      </svg>
                    </span>
                    <span className="photos-tb-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round">
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="4" y1="12" x2="15" y2="12" />
                        <line x1="4" y1="17" x2="10" y2="17" />
                      </svg>
                    </span>
                    <span className="photos-tb-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="6" cy="12" r="1.6" />
                        <circle cx="12" cy="12" r="1.6" />
                        <circle cx="18" cy="12" r="1.6" />
                      </svg>
                    </span>
                  </div>
                  <div className="photos-tb-group">
                    <span className="photos-tb-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <line x1="12" y1="11" x2="12" y2="16.5" />
                        <line x1="12" y1="7.6" x2="12" y2="7.7" />
                      </svg>
                    </span>
                    <span className="photos-tb-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 15V4" />
                        <path d="m8 7 4-3 4 3" />
                        <path d="M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
                      </svg>
                    </span>
                    <span className="photos-tb-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20s-6.5-4.2-9-8a4.4 4.4 0 0 1 9-4 4.4 4.4 0 0 1 9 4c-2.5 3.8-9 8-9 8Z" />
                      </svg>
                    </span>
                  </div>
                  <span className="photos-tb-search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                      <circle cx="11" cy="11" r="7" />
                      <line x1="16.5" y1="16.5" x2="21" y2="21" />
                    </svg>
                  </span>
                </div>
              </header>
              <div className="photos-window-content">
                <aside className="photos-sidebar">
                  {interestCategories.map((item) => (
                    <button
                      type="button"
                      className={`photos-sidebar-item ${
                        selectedInterest.id === item.id ? "is-active" : ""
                      }`}
                      key={item.id}
                      onClick={() => setSelectedInterestId(item.id)}
                    >
                      <span className="photos-sidebar-icon" aria-hidden="true">
                        <InterestSidebarIcon icon={item.icon} />
                      </span>
                      <p>{item.label}</p>
                    </button>
                  ))}
                </aside>
                <main className="photos-library">
                  <div className="photos-grid" ref={photosGridRef}>
                    {selectedInterest.photos.map((src) => (
                      <Image
                        alt=""
                        src={src}
                        width={500}
                        height={500}
                        className="photos-thumb"
                        key={src}
                        unoptimized
                      />
                    ))}
                  </div>
                  <p className="photos-count">
                    {selectedInterest.photos.length} Photos
                  </p>
                </main>
              </div>
            </>
          ) : window.id === "skills" ? (
            <div className="skills-store">
              <header className="skills-topbar">
                <WindowControls
                  title={window.title}
                  onClose={() => closeWindow(window.id)}
                />
              </header>
              <div className="skills-scroll">
                <div className="skills-inner">
                  <h1 className="skills-title">
                    Skills I use to build better products
                  </h1>
                  <div className="skills-grid">
                    {skillGroups.map((group) => (
                      <article className="skill-card" key={group.name}>
                        {group.tools ? (
                          <div className="skill-tools">
                            {group.tools.map((tool) => (
                              <span
                                className="skill-tool"
                                key={tool.name}
                                data-name={tool.name}
                              >
                                {tool.icon ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={tool.icon}
                                    alt={tool.name}
                                    loading="lazy"
                                  />
                                ) : (
                                  <span
                                    className="skill-tool-abbr"
                                    style={{ background: tool.color }}
                                  >
                                    {tool.abbr}
                                  </span>
                                )}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        {group.chips ? (
                          <div className="skill-chips">
                            {group.chips.map((chip) => (
                              <span className="skill-chip" key={chip}>
                                {chip}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        <h3>{group.name}</h3>
                        <p>{group.description}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : window.id === "assistant" ? (
            <AssistantWindow
              title={window.title}
              onClose={() => closeWindow(window.id)}
            />
          ) : (
            <header className="mac-window-toolbar">
              <WindowControls
                title={window.title}
                onClose={() => closeWindow(window.id)}
              />
              <p className="mac-window-title">{window.title}</p>
            </header>
          )}
          {window.kind === "folder" ||
          window.id === "resume" ||
          window.id === "vibes" ||
          window.id === "skills" ||
          window.id === "assistant" ||
          window.id === "education" ? null : (
            <div className="mac-window-content" />
          )}
        </section>
      ))}
    </div>
      <div
        className="view-work-cursor"
        ref={viewWorkCursorRef}
        aria-hidden="true"
      >
        View Work
      </div>
    </>
  );
}
