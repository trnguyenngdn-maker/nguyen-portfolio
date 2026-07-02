"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
        pdfHref: "/resumes/trung-nguyen-resume-en.pdf",
        download: "TrungNguyenNguyen_resume_English.pdf",
      },
      {
        title: "CV in French",
        folder: "Resume",
        pdfHref: "/resumes/trung-nguyen-resume-fr.pdf",
        download: "TrungNguyenNguyen_resume_French.pdf",
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
      "/interests/eat/eat-13.jpg",
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
      "/interests/travel-19.jpg",
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
      "/interests/listen-10.jpg",
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

  const selectedInterest =
    interestCategories.find((category) => category.id === selectedInterestId) ??
    interestCategories[0];

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
            { id: folderId, kind: "folder", title, zIndex },
          ];
        });
        return;
      }

      if (!dockItem || !isWindowApp(app)) {
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
    <div className="mac-window-layer pointer-events-none fixed inset-0 z-30">
      {windows.map((window) => (
        <section
          key={window.id}
          className={`mac-app-window pointer-events-auto ${
            window.kind === "app" && window.appId
              ? `mac-app-window-${window.appId}`
              : "mac-folder-window"
          }`}
          style={{ zIndex: window.zIndex }}
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
                  <div className="folder-info-thumbnail" aria-hidden="true" />
                  <div>
                    <h2>{window.title}</h2>
                    <p>Portfolio project</p>
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
                <span className="safari-address-icon" aria-hidden="true" />
                <span className="safari-address-text">education.local</span>
              </div>
              <div className="safari-toolbar-actions" aria-hidden="true">
                <span className="safari-translate-icon" />
                <span className="safari-reload-icon" />
                <span className="safari-share-icon" />
                <span className="safari-plus-icon" />
                <span className="safari-tabs-icon" />
              </div>
            </header>
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
                  <span aria-hidden="true" />
                </button>
                <div className="notes-toolbar-title">
                  <strong>All iCloud</strong>
                  <span>267 notes</span>
                </div>
                <div className="notes-toolbar-left-actions" aria-hidden="true">
                  <span className="notes-more-icon" />
                  <span className="notes-compose-icon" />
                </div>
                <div className="notes-toolbar-center-actions" aria-hidden="true">
                  <span>Aa</span>
                  <span className="notes-checklist-icon" />
                  <span className="notes-table-icon" />
                  <span className="notes-attach-icon" />
                </div>
                <div className="notes-toolbar-right-actions" aria-hidden="true">
                  <span className="notes-share-icon" />
                  <span className="notes-more-icon" />
                  <span className="notes-search-icon" />
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
                          <span>{note.folder}</span>
                        </button>
                      ))}
                    </section>
                  ))}
                </aside>
                <main className="notes-editor">
                  <time dateTime="2026-04-03T15:54">3 April 2026 at 15:54</time>
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
                  <div className="photos-grid">
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
            <div className="appstore-window-content">
              <aside className="appstore-sidebar">
                <div className="appstore-sidebar-controls">
                  <WindowControls
                    title={window.title}
                    onClose={() => closeWindow(window.id)}
                  />
                </div>
                <label className="appstore-search">
                  <span aria-hidden="true" />
                  <input placeholder="Search" aria-label="Search" />
                </label>
                <nav aria-label="App Store sections">
                  {appStoreNavItems.map((item, index) => (
                    <div
                      className={`appstore-nav-item ${
                        index === 0 ? "is-active" : ""
                      }`}
                      key={item}
                    >
                      <span aria-hidden="true" />
                      <p>{item}</p>
                      {item === "Updates" ? <em>7</em> : null}
                    </div>
                  ))}
                </nav>
                <div className="appstore-account">
                  <span aria-hidden="true" />
                  <p>Trung Nguyễn Nguy...</p>
                </div>
              </aside>
              <main className="appstore-discover">
                <h2>Discover</h2>
                <section className="appstore-hero-card">
                  <div>
                    <p>ESSENTIALS</p>
                    <h3>Get Started With Your MacBook Neo</h3>
                    <span>The best apps and games, picked by App Store Editors.</span>
                  </div>
                  <div className="appstore-hero-art" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </section>
                <div className="appstore-card-grid">
                  <article className="appstore-small-card">
                    <p>APPS WE LOVE</p>
                    <h3>Copy the Uncopyable</h3>
                    <span>If you can see text, TextSniper can grab it.</span>
                    <div aria-hidden="true" />
                  </article>
                  <article className="appstore-small-card">
                    <p>APPS WE LOVE</p>
                    <h3>Get Creative With AI in Adobe Lightroom</h3>
                    <span>Generative features make complex edits easier.</span>
                    <div aria-hidden="true" />
                  </article>
                </div>
                <footer className="appstore-section-footer">
                  <strong>Best New Apps and Updates</strong>
                  <span>See All</span>
                </footer>
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
          window.id === "skills" ? null : (
            <div className="mac-window-content" />
          )}
        </section>
      ))}
    </div>
  );
}
