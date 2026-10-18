'use client';

import * as React from 'react';
import { CirclePlay, Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';

const videoSrc = '/videos/matikaren-video-recenzia.mp4';
const posterSrc = '/videos/matikaren-video-recenzia-poster-sedi.jpg';

type FullscreenVideo = HTMLVideoElement & {
  webkitDisplayingFullscreen?: boolean;
  webkitEnterFullscreen?: () => void;
};

function formatTime(seconds: number) {
  const wholeSeconds = Math.max(0, Math.floor(seconds));
  return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(2, '0')}`;
}

export function VideoReview() {
  const [started, setStarted] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [controlsVisible, setControlsVisible] = React.useState(true);
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const [nativeFullscreen, setNativeFullscreen] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const keepFullscreenPaused = React.useRef(false);
  const controlsTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelControlsHide = React.useCallback(() => {
    if (controlsTimer.current !== null) {
      clearTimeout(controlsTimer.current);
      controlsTimer.current = null;
    }
  }, []);

  const revealControls = React.useCallback(() => {
    cancelControlsHide();
    setControlsVisible(true);
  }, [cancelControlsHide]);

  const hideOverlay = React.useCallback(() => {
    cancelControlsHide();
    setOverlayVisible(false);
    setControlsVisible(false);
  }, [cancelControlsHide]);

  const hideControlsSoon = React.useCallback((delay = 2500) => {
    cancelControlsHide();
    const video = videoRef.current;
    if (!video || video.paused) return;

    controlsTimer.current = setTimeout(() => {
      controlsTimer.current = null;
      const fullscreenVideo = video as FullscreenVideo;
      if (!video.paused && !video.ended && !document.fullscreenElement && !fullscreenVideo.webkitDisplayingFullscreen) {
        setOverlayVisible(false);
        setControlsVisible(false);
      }
    }, delay);
  }, [cancelControlsHide]);

  const toggleOverlay = () => {
    if (overlayVisible) {
      hideOverlay();
      return;
    }
    setOverlayVisible(true);
    revealControls();
    hideControlsSoon();
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setOverlayVisible(false);
      void video.play().catch(() => setFailed(true));
    } else {
      video.pause();
    }
  };

  const enterFullscreen = async () => {
    const video = videoRef.current as FullscreenVideo | null;
    if (!video) return;
    keepFullscreenPaused.current = video.paused;
    video.controls = true;
    setNativeFullscreen(true);
    try {
      if (video.requestFullscreen) {
        await video.requestFullscreen();
        if (keepFullscreenPaused.current) video.pause();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      } else {
        video.controls = false;
        setNativeFullscreen(false);
      }
    } catch {
      video.controls = false;
      setNativeFullscreen(false);
    }
  };

  React.useEffect(() => {
    const video = videoRef.current as FullscreenVideo | null;
    if (!started || !video) return;
    const restoreInlineControls = () => {
      video.controls = false;
      setNativeFullscreen(false);
      setOverlayVisible(video.paused);
      revealControls();
      hideControlsSoon();
    };
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === video) {
        setNativeFullscreen(true);
        if (keepFullscreenPaused.current) video.pause();
      } else if (!video.webkitDisplayingFullscreen) {
        restoreInlineControls();
      }
    };
    const handleNativeFullscreenBegin = () => {
      setNativeFullscreen(true);
      if (keepFullscreenPaused.current) video.pause();
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    video.addEventListener('webkitbeginfullscreen', handleNativeFullscreenBegin);
    video.addEventListener('webkitendfullscreen', restoreInlineControls);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      video.removeEventListener('webkitbeginfullscreen', handleNativeFullscreenBegin);
      video.removeEventListener('webkitendfullscreen', restoreInlineControls);
    };
  }, [started, hideControlsSoon, revealControls]);

  React.useEffect(() => {
    const mobile = window.matchMedia('(max-width: 639px)');
    const handleResize = () => revealControls();
    mobile.addEventListener('change', handleResize);
    return () => {
      mobile.removeEventListener('change', handleResize);
      cancelControlsHide();
    };
  }, [cancelControlsHide, revealControls]);

  return (
    <figure className="mx-auto w-full max-w-[280px]">
      <figcaption className="mb-4 text-balance text-center text-[19px] font-extrabold leading-[1.3] text-[#09266f]">
        Recenzia minuloročných deviatakov <span className="text-[#075cff]">na kurz</span>
      </figcaption>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] border border-[#cad9f4] bg-[#071a45] shadow-[0_16px_40px_rgba(24,72,158,.18)]">
        {started ? (
          <>
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              width={720}
              height={1280}
              controls={nativeFullscreen}
              playsInline
              autoPlay
              preload="auto"
              tabIndex={0}
              aria-label="Video recenzia Matikárne"
              onLoadedMetadata={(event) => {
                const length = event.currentTarget.duration;
                setDuration(Number.isFinite(length) ? length : 0);
              }}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              onVolumeChange={(event) => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)}
              onPlaying={() => {
                setPlaying(true);
                hideControlsSoon(overlayVisible ? 2500 : 800);
              }}
              onPointerDown={revealControls}
              onPointerUp={() => hideControlsSoon()}
              onPointerCancel={() => hideControlsSoon()}
              onKeyDown={(event) => {
                revealControls();
                if (event.key === ' ' && !event.currentTarget.controls) {
                  event.preventDefault();
                  if (event.currentTarget.paused) {
                    void event.currentTarget.play().catch(() => setFailed(true));
                  } else {
                    event.currentTarget.pause();
                  }
                }
              }}
              onPause={() => {
                setOverlayVisible(true);
                setPlaying(false);
                revealControls();
              }}
              onEnded={() => {
                setOverlayVisible(true);
                setPlaying(false);
                revealControls();
              }}
              onWaiting={revealControls}
              onError={() => setFailed(true)}
              className="block h-full w-full scale-[1.045] object-cover [&:fullscreen]:scale-100 [&:fullscreen]:object-contain"
            >
              Váš prehliadač nepodporuje prehrávanie videa.
            </video>
            {overlayVisible && (
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/10" />
            )}
            <button
              type="button"
              aria-label={overlayVisible ? 'Skryť ovládanie videa' : 'Zobraziť ovládanie videa'}
              onClick={toggleOverlay}
              className="absolute inset-0 touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#75acff]"
            />
            {overlayVisible && (
              <button
                type="button"
                aria-label={playing ? 'Pozastaviť video recenziu' : 'Pokračovať vo videu'}
                onClick={togglePlayback}
                className="absolute left-1/2 top-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 touch-manipulation place-items-center rounded-full bg-black/25 text-white transition-colors hover:bg-black/35 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#75acff]"
              >
                {playing ? <Pause aria-hidden="true" className="size-9 fill-current" strokeWidth={1.6} /> : <Play aria-hidden="true" className="ml-1 size-9 fill-current" strokeWidth={1.6} />}
              </button>
            )}
            {controlsVisible && !nativeFullscreen && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-7 text-white">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-[12px] font-semibold tabular-nums">{formatTime(currentTime)} / {formatTime(duration)}</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      aria-label={muted ? 'Zapnúť zvuk videa' : 'Stlmiť video'}
                      onClick={() => {
                        const video = videoRef.current;
                        if (video) {
                          if (video.muted || video.volume === 0) {
                            video.muted = false;
                            if (video.volume === 0) video.volume = 1;
                          } else {
                            video.muted = true;
                          }
                        }
                        hideControlsSoon();
                      }}
                      className="pointer-events-auto grid size-9 place-items-center rounded-full hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75acff]"
                    >
                      {muted ? <VolumeX aria-hidden="true" className="size-5" /> : <Volume2 aria-hidden="true" className="size-5" />}
                    </button>
                    <button
                      type="button"
                      aria-label="Video na celú obrazovku"
                      onClick={() => void enterFullscreen()}
                      className="pointer-events-auto grid size-9 place-items-center rounded-full hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75acff]"
                    >
                      <Maximize aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.1}
                  value={Math.min(currentTime, duration || 1)}
                  disabled={!duration}
                  aria-label="Priebeh videa"
                  aria-valuetext={`${formatTime(currentTime)} z ${formatTime(duration)}`}
                  onPointerDown={cancelControlsHide}
                  onPointerUp={() => hideControlsSoon()}
                  onChange={(event) => {
                    const time = Number(event.currentTarget.value);
                    if (videoRef.current) videoRef.current.currentTime = time;
                    setCurrentTime(time);
                    hideControlsSoon();
                  }}
                  className="pointer-events-auto block h-6 w-full cursor-pointer accent-[#75acff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75acff]"
                />
              </div>
            )}
          </>
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
