"use client";
import React, { useEffect, useRef, useState } from "react";

export type FaceBookBlogCardProps = {
  facebookUrl: string;
  title?: string;
  image?: string;
  compact?: boolean; // New prop for table view
};

const FaceBookBlogCard: React.FC<FaceBookBlogCardProps> = ({
  facebookUrl,
  compact = false, // Default false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(500);
  const [key, setKey] = useState(0);

  let actualUrl = facebookUrl;
  let isVideo = false;

  // Detect iframe or video URL
  if (facebookUrl.includes("<iframe")) {
    isVideo = facebookUrl.includes("plugins/video.php");
    const hrefMatch = facebookUrl.match(/href=([^&\s"]+)/);
    if (hrefMatch && hrefMatch[1]) {
      actualUrl = decodeURIComponent(hrefMatch[1]);
    }
  } else {
    isVideo = actualUrl.includes("/videos/");
  }

  // Monitor container width changes
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        setKey(prev => prev + 1);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // Load Facebook SDK dynamically
  useEffect(() => {
    if (!(window as any).FB) {
      const script = document.createElement("script");
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      script.onload = () => {
        if ((window as any).FB) {
          (window as any).FB.XFBML.parse();
        }
      };
    } else {
      setTimeout(() => {
        if ((window as any).FB) {
          (window as any).FB.XFBML.parse();
        }
      }, 100);
    }
  }, [key, actualUrl]);

  if (!facebookUrl) return null;

  // Calculate optimal width based on compact mode
  const maxWidth = compact ? 100 : 100;
  const optimalWidth = Math.min(containerWidth, maxWidth);

  return (
    <div className={`rounded-md overflow-hidden bg-white ${compact ? 'max-h-[100px] overflow-y-auto' : ''}`}>
      <div
        ref={containerRef}
        key={key}
        className="rounded max-w-[100px] mx-auto overflow-x-auto"
        style={{
          maxWidth: `${maxWidth}px`,
        }}
      >
        {isVideo ? (
          <div
            className="fb-video"
            data-href={actualUrl}
            data-width={optimalWidth}
            data-show-text="true"
          ></div>
        ) : (
          <div
            className="fb-post"
            data-href={actualUrl}
            data-width={optimalWidth}
            data-show-text="true"
          ></div>
        )}
      </div>
    </div>
  );
};

export default FaceBookBlogCard;