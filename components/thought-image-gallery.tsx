"use client";

import { useEffect, useMemo, useState } from "react";

export function ThoughtImageGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) return;

      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return (prev + 1) % images.length;
        });
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return (prev - 1 + images.length) % images.length;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  const displayImages = useMemo(() => images.slice(0, 4), [images]);

  if (!images || images.length === 0) return null;

  const count = images.length;

  return (
    <>
      <div className="space-y-3">
        {count === 1 ? (
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="group relative block w-full overflow-hidden rounded-2xl"
          >
            <img
              src={images[0]}
              alt=""
              className="h-[280px] w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:h-[360px]"
            />
          </button>
        ) : count === 2 ? (
          <div className="grid grid-cols-2 gap-3">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative overflow-hidden rounded-2xl"
              >
                <img
                  src={image}
                  alt=""
                  className="h-[190px] w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:h-[240px]"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {displayImages.map((image, index) => {
              const isLastOverlay = count > 4 && index === 3;
              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={image}
                    alt=""
                    className="h-[170px] w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:h-[220px]"
                  />
                  {isLastOverlay ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-lg font-medium text-white">
                      +{count - 4}
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}

        {count > 1 ? (
          <div className="text-right text-[12px] text-zinc-400 dark:text-zinc-500">
            共 {count} 张
          </div>
        ) : null}
      </div>

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 bg-black/85"
          onClick={() => setActiveIndex(null)}
        >
          <div className="flex h-full w-full items-center justify-center p-4">
            <div
              className="relative flex max-h-[92vh] max-w-[94vw] items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={images[activeIndex]}
                alt=""
                className="max-h-[92vh] max-w-[94vw] rounded-xl object-contain"
              />

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1.5 text-sm text-white backdrop-blur"
              >
                关闭
              </button>

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === null ? prev : (prev - 1 + images.length) % images.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-xl text-white backdrop-blur"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === null ? prev : (prev + 1) % images.length
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-xl text-white backdrop-blur"
                  >
                    ›
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs text-white backdrop-blur">
                    {activeIndex + 1} / {images.length}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}