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
        title: "CV in English",
        folder: "Resume",
        pdfHref: "/resumes/nguyen-resume-english-v2.pdf",
        download: "Nguyen_Resume_English.pdf",
      },
      {
        title: "CV in French",
        folder: "Resume",
        pdfHref: "/resumes/nguyen-resume-french-v3.pdf",
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
    "About",
    "Project overview will live here. This area is intentionally ready for the story behind the work.",
  ],
  [
    "Challenge",
    "Problem framing, constraints, and the context that made this project worth building.",
  ],
  [
    "My Role",
    "Responsibilities, decisions, process, and the parts of the project I directly owned.",
  ],
  [
    "Impact",
    "Outcomes, signals, lessons, and measurable results will be added here.",
  ],
];

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
            { id: folderId, kind: "folder", title, iconSrc, role, zIndex },
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
                  Information about: {window.title}
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
                    <p>{window.role ?? "Portfolio project"}</p>
                  </div>
                </div>
                <div className="folder-info-description">
                  This project window is structured like a macOS information
                  panel. The final case study copy will replace these placeholders.
                </div>
                <div className="folder-info-section-list">
                  {folderSections.map(([section, text]) => (
                    <section className="folder-info-section" key={section}>
                      <h3>{section}</h3>
                      <div className="folder-info-empty">
                        <p>{text}</p>
                      </div>
                    </section>
                  ))}
                  <section className="folder-info-section">
                    <h3>Details</h3>
                    <p className="folder-info-type">
                      <strong>Type:</strong> Product / Design / Build
                    </p>
                  </section>
                  <section className="folder-info-section">
                    <h3>Preview</h3>
                    <div className="folder-info-preview" aria-hidden="true" />
                  </section>
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
                  <span aria-hidden="true" />
                </button>
                <div className="photos-toolbar-title">
                  <strong>My interests</strong>
                  <span>23 Jun 2026</span>
                </div>
                <div className="photos-toolbar-actions" aria-hidden="true">
                  <span className="photos-filter-icon" />
                  <span className="photos-list-icon" />
                  <span className="photos-more-icon" />
                  <span className="photos-info-icon" />
                  <span className="photos-share-icon" />
                  <span className="photos-heart-icon" />
                  <span className="photos-search-icon" />
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
            <div className="claude-window">
              <aside className="claude-sidebar">
                <div className="claude-sidebar-head">
                  <WindowControls
                    title={window.title}
                    onClose={() => closeWindow(window.id)}
                  />
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
                  <button type="button" className="claude-chat-item is-active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
                      <path d="M4 5h16v11H9l-5 4z" />
                    </svg>
                    How my brain works
                  </button>
                  <button type="button" className="claude-chat-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
                      <path d="M4 5h16v11H9l-5 4z" />
                    </svg>
                    My other thoughts
                  </button>
                </div>
              </aside>

              <main className="claude-main claude-main-chat">
                <div className="claude-thread">
                  <div className="claude-msg claude-msg-user">
                    <p>So… how does your brain actually work, Nguyen?</p>
                  </div>

                  <div className="claude-msg claude-msg-ni">
                    <span className="claude-msg-spark" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1c.4 3.6 1.2 5.8 2.5 7.1S17.4 10.6 21 11c-3.6.4-5.8 1.2-7.1 2.5S12.4 17.4 12 21c-.4-3.6-1.2-5.8-2.5-7.1S6.6 11.4 3 11c3.6-.4 5.8-1.2 7.1-2.5S11.6 4.6 12 1Z" />
                      </svg>
                    </span>
                    <div className="claude-msg-body">
                      <p>Honestly? Like a product manager who can&apos;t switch off.</p>
                      <p>
                        Three questions run quietly in the background almost all the
                        time:
                      </p>
                      <ol>
                        <li>
                          <strong>Who is this for?</strong> I map every problem back
                          to a real person and what they&apos;re actually trying to
                          get done.
                        </li>
                        <li>
                          <strong>
                            What&apos;s the smallest thing worth shipping?
                          </strong>{" "}
                          I&apos;d rather learn from something real in a week than
                          plan something perfect for a quarter.
                        </li>
                        <li>
                          <strong>How does this connect to everything else?</strong>{" "}
                          I collect patterns across cybersecurity, coffee, design,
                          and consumer apps — and the best ideas usually come from
                          colliding two of them.
                        </li>
                      </ol>
                      <p>
                        So it&apos;s less &ldquo;genius alone in a room&rdquo; and
                        more &ldquo;curious kid with a whiteboard, a wall of sticky
                        notes, and far too many browser tabs.&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="claude-msg claude-msg-user">
                    <p>And when you get stuck?</p>
                  </div>

                  <div className="claude-msg claude-msg-ni">
                    <span className="claude-msg-spark" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1c.4 3.6 1.2 5.8 2.5 7.1S17.4 10.6 21 11c-3.6.4-5.8 1.2-7.1 2.5S12.4 17.4 12 21c-.4-3.6-1.2-5.8-2.5-7.1S6.6 11.4 3 11c3.6-.4 5.8-1.2 7.1-2.5S11.6 4.6 12 1Z" />
                      </svg>
                    </span>
                    <div className="claude-msg-body">
                      <p>
                        I stop staring at the screen. I go talk to a user, take a
                        walk, or ship something small and a little ugly just to see
                        what breaks.
                      </p>
                      <p>
                        Momentum beats perfection — clarity almost always shows up
                        once something real is in front of me.
                      </p>
                    </div>
                  </div>
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
            </div>
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
