'use client';

import * as React from 'react';
import { CirclePlay } from 'lucide-react';

const videoSrc = '/videos/matikaren-video-recenzia.mp4';
const posterSrc = '/videos/matikaren-video-recenzia-poster-otvorene-oci.jpg';

export function VideoReview() {
  const [started, setStarted] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  return (
    <figure className="mx-auto w-full max-w-[280px]">
      <figcaption className="mb-4 text-balance text-center text-[19px] font-extrabold leading-[1.3] text-[#09266f]">
        Recenzia minuloročných deviatakov <span className="text-[#075cff]">na kurz</span>
      </figcaption>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] border border-[#cad9f4] bg-[#071a45] shadow-[0_16px_40px_rgba(24,72,158,.18)]">
        {started ? (
          <video
            src={videoSrc}
            poster={posterSrc}
            width={720}
            height={1280}
            controls
            playsInline
            autoPlay
            preload="none"
            aria-label="Video recenzia Matikárne"
            onError={() => setFailed(true)}
            className="block h-full w-full scale-[1.045] object-cover [&:fullscreen]:scale-100 [&:fullscreen]:object-contain"
          >
            Váš prehliadač nepodporuje prehrávanie videa.
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            aria-label="Prehrať video recenziu Matikárne"
            className="group absolute inset-0 block h-full w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#75acff]"
          >
            <img
              src={posterSrc}
              alt=""
              width={720}
              height={1280}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#071a45]/85 via-transparent to-transparent" />
            <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
              <span className="grid size-[72px] place-items-center rounded-full bg-[#075cff]/95 text-white shadow-[0_8px_30px_rgba(0,0,0,.3)] transition group-hover:scale-105 group-hover:bg-[#064dcc]">
                <CirclePlay className="size-12" strokeWidth={1.8} />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-6 px-4 text-center text-[16px] font-extrabold text-white">
              Pozrieť video recenziu
            </span>
          </button>
        )}
      </div>
      {failed && (
        <p role="alert" className="mt-3 text-center text-[13px] text-[#405a8c]">
          Video sa nepodarilo prehrať.{' '}
          <a href={videoSrc} className="font-bold text-[#075cff] underline">
            Otvoriť video samostatne
          </a>
        </p>
      )}
    </figure>
  );
}
