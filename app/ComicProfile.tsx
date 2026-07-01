"use client";

import ComicIntroCaption from "./ComicIntroCaption";
import TrackingAvatar from "./TrackingAvatar";

export default function ComicProfile() {
  return (
    <div className="comic-profile">
      <div className="comic-avatar">
        <div className="avatar-bouncer">
          <TrackingAvatar />
        </div>
      </div>
      <ComicIntroCaption />
    </div>
  );
}
