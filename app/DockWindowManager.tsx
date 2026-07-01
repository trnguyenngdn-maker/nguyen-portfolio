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
      ["Suivi depense Juine", "09:06  Titre de transp..."],
      ["Cool phrases", "02/06/2026  a full cir..."],
      ["People I can conn...", "09/01/2026  Locked"],
      ["1. Starting Con...", "21/06/2025  1. Let's ki..."],
      ["Idioms and expres...", "18/05/2025  Rant: nói..."],
      ["Phrasal verbs", "12/05/2025  Pull up:..."],
    ],
  },
  {
    title: "Today",
    notes: [["Portfolio website", "09:33  where: /Users/..."]],
  },
  {
    title: "Yesterday",
    notes: [["To do", "Yesterday  To-do Cla..."]],
  },
];

const photoThumbnails = [
  "/portfolio-assets/avatar-emotion-claude-v2.png",
  "/portfolio-assets/avatar-emotion-notes.png",
  "/portfolio-assets/avatar-emotion-mail-v2.png",
  "/portfolio-assets/avatar-base-no-pupils.png",
  "/portfolio-assets/avatar-emotion-app-store-v2.png",
  "/portfolio-assets/avatar-emotion-photos.png",
];

const photosSidebarItems = [
  "Library",
  "Collections",
  "Favourites",
  "Recently Saved",
  "Map",
  "Videos",
  "Screenshots",
  "People & Pets",
  "Recently Deleted",
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

export default function DockWindowManager() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);

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
                      {group.notes.map(([title, preview]) => (
                        <article className="notes-list-item" key={title}>
                          <h3>{title}</h3>
                          <p>{preview}</p>
                          <span>Notes</span>
                        </article>
                      ))}
                    </section>
                  ))}
                </aside>
                <main className="notes-editor">
                  <time dateTime="2026-04-03T15:54">3 April 2026 at 15:54</time>
                  <div className="notes-empty-page" />
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
                  <strong>Library</strong>
                  <span>23 Jun 2026</span>
                </div>
                <div className="photos-segmented-control" aria-hidden="true">
                  <span>Years</span>
                  <span>Months</span>
                  <span className="is-active">All Photos</span>
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
                  {photosSidebarItems.map((item, index) => (
                    <div
                      className={`photos-sidebar-item ${
                        index === 0 ? "is-active" : ""
                      }`}
                      key={item}
                    >
                      <span aria-hidden="true" />
                      <p>{item}</p>
                    </div>
                  ))}
                </aside>
                <main className="photos-library">
                  <div className="photos-grid">
                    {photoThumbnails.map((src) => (
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
                  <p className="photos-count">77 Photos, 34 Videos</p>
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
