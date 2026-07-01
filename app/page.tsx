import Image from "next/image";
import type { CSSProperties } from "react";
import ComicProfile from "./ComicProfile";
import DockWindowManager from "./DockWindowManager";

type DesktopFolder = {
  id: string;
  title: string;
  subtitle: string;
};

type DockApp = {
  label: string;
  iconSrc: string;
  windowApp:
    | "contact"
    | "education"
    | "assistant"
    | "resume"
    | "vibes"
    | "skills";
  avatarEmotion?:
    | "mail"
    | "safari"
    | "claude"
    | "notes"
    | "photos"
    | "app-store";
  active?: boolean;
};

const folders: DesktopFolder[] = [
  {
    id: "cybersecurity-consultant-2022",
    title: "Cybersecurity Consultant",
    subtitle: "2022",
  },
  {
    id: "product-manager-2023",
    title: "Product Manager",
    subtitle: "2023",
  },
  {
    id: "product-management-consultant-2024",
    title: "Product Management Consultant",
    subtitle: "2024",
  },
  {
    id: "product-manager-2025-a",
    title: "Product Manager",
    subtitle: "2025",
  },
  {
    id: "product-manager-2025-b",
    title: "Product Manager",
    subtitle: "2025",
  },
  {
    id: "product-builder-2026-a",
    title: "Product Builder",
    subtitle: "2026",
  },
  {
    id: "product-builder-2026-b",
    title: "Product Builder",
    subtitle: "2026",
  },
  {
    id: "physical-product-builder-next",
    title: "Physical Product Builder",
    subtitle: "Next",
  },
];

const dockApps: DockApp[] = [
  {
    label: "Contact Me",
    iconSrc: "/dock-icons/mail.png",
    windowApp: "contact",
    avatarEmotion: "mail",
    active: true,
  },
  {
    label: "Educations",
    iconSrc: "/dock-icons/safari.png",
    windowApp: "education",
    avatarEmotion: "safari",
    active: true,
  },
  {
    label: "My assistant",
    iconSrc: "/dock-icons/claude.png",
    windowApp: "assistant",
    avatarEmotion: "claude",
    active: true,
  },
  {
    label: "Resume",
    iconSrc: "/dock-icons/notes.png",
    windowApp: "resume",
    avatarEmotion: "notes",
  },
  {
    label: "My Vibes",
    iconSrc: "/dock-icons/photos.png",
    windowApp: "vibes",
    avatarEmotion: "photos",
  },
  {
    label: "My skills",
    iconSrc: "/dock-icons/app-store.png",
    windowApp: "skills",
    avatarEmotion: "app-store",
  },
];

const folderClusters = [
  folders.slice(0, 3),
  folders.slice(3, 5),
  folders.slice(5),
];

const folderClusterOffsets = folderClusters.reduce<number[]>(
  (offsets, cluster, index) => {
    const previousOffset = index === 0 ? 0 : offsets[index - 1] + folderClusters[index - 1].length;
    offsets.push(previousOffset);
    return offsets;
  },
  [],
);

function FolderShortcut({
  id,
  title,
  subtitle,
  introDelay,
}: DesktopFolder & { introDelay: number }) {
  return (
    <div className="group w-[118px]">
      <button
        type="button"
        className="mac-desktop-icon flex w-full flex-col items-center gap-2 text-center"
        data-folder-window={id}
        data-folder-title={`${title} ${subtitle}`}
        style={{ "--pop-delay": `${introDelay}ms` } as CSSProperties}
      >
        <Image
          src="/dock-icons/folder.png"
          alt=""
          width={128}
          height={128}
          className="mac-folder-icon"
          aria-hidden="true"
          priority
        />
        <span className="mac-label space-y-0.5">
          <span className="block text-[13px] font-semibold leading-[14px]">{title}</span>
          <span className="block text-[12px] font-medium leading-[14px] text-white/95">
            {subtitle}
          </span>
        </span>
      </button>
    </div>
  );
}

function DockIcon({
  label,
  iconSrc,
  windowApp,
  avatarEmotion,
  active,
  introDelay,
}: DockApp & { introDelay: number }) {
  const emotionProps = avatarEmotion
    ? { "data-avatar-emotion": avatarEmotion }
    : {};

  return (
    <button
      type="button"
      className="mac-dock-item group relative flex shrink-0 flex-col items-center"
      aria-label={label}
      title={label}
      data-window-app={windowApp}
      data-window-title={label}
      style={{ "--pop-delay": `${introDelay}ms` } as CSSProperties}
      {...emotionProps}
    >
      <Image
        src={iconSrc}
        alt=""
        width={128}
        height={128}
        className="dock-app-icon"
        aria-hidden="true"
        priority
      />
      {active ? <span className="dock-running-dot" aria-hidden="true" /> : null}
    </button>
  );
}

export default function Home() {
  return (
    <main className="mac-screen relative min-h-screen overflow-x-hidden text-white">
      <section className="relative z-10 flex min-h-screen flex-col">
        <DockWindowManager />
        <div className="mac-menu-bar flex h-6 items-center justify-between px-4 text-[13px] font-medium text-black/78">
          <div className="flex items-center gap-5">
            <span className="font-bold">Nguyen&apos;s portfolio</span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <span>Tue Jun 23</span>
            <span>09:53</span>
          </div>
        </div>

        <div className="desktop-stage relative flex-1 px-4 pb-32 pt-8 md:px-10 md:pb-32 lg:px-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 md:grid md:h-[calc(100vh-10rem)] md:min-h-[34rem] md:grid-cols-[minmax(30rem,45rem)_minmax(22rem,1fr)] md:items-center md:gap-12 xl:grid-cols-[minmax(28rem,36rem)_minmax(36rem,1fr)]">
            <div className="avatar-panel order-1 flex items-start justify-center pt-2 md:order-2 md:pt-0 md:justify-self-stretch">
              <ComicProfile />
            </div>

            <div className="folder-column order-2 grid grid-cols-2 justify-items-center gap-x-8 gap-y-7 md:order-1 md:block md:h-full md:w-full">
              {folderClusters.map((cluster, clusterIndex) => (
                <div
                  className={`folder-cluster folder-cluster-${clusterIndex + 1}`}
                  key={`cluster-${clusterIndex}`}
                >
                  {cluster.map((folder, folderIndex) => {
                      const introOrder = folderClusterOffsets[clusterIndex] + folderIndex;
                      const introDelay = 120 + introOrder * 85;

                      return (
                        <div
                          className={`folder-cluster-item folder-cluster-item-${folderIndex + 1}`}
                          key={folder.id}
                        >
                          <FolderShortcut {...folder} introDelay={introDelay} />
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-4 md:pb-6">
          <div className="mac-dock pointer-events-auto flex max-w-[760px] items-end justify-center gap-2.5 overflow-visible rounded-[23px] border border-white/20 bg-black/45 px-3.5 pb-3 pt-3 backdrop-blur-2xl md:gap-3.5 md:px-5">
            {dockApps.map((app, index) => (
              <DockIcon key={app.label} {...app} introDelay={760 + index * 70} />
            ))}
            <span className="dock-separator mx-1 h-[58px] w-px bg-white/18" />
            <button
              type="button"
              aria-label="Killed by Nguyen"
              title="Killed by Nguyen"
              className="mac-dock-item group relative flex shrink-0 flex-col items-center"
              data-window-app="killed"
              data-window-title="Killed by Nguyen"
              data-avatar-emotion="trash"
              style={{ "--pop-delay": `${760 + dockApps.length * 70}ms` } as CSSProperties}
            >
              <Image
                src="/dock-icons/trash.png"
                alt=""
                width={128}
                height={128}
                className="trash-icon"
                aria-hidden="true"
                priority
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
