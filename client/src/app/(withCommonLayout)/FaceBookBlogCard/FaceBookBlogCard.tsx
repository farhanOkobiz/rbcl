"use client";
import React, { useEffect, useRef } from "react";

export type FaceBookBlogCardProps = {
  facebookUrl: string;
  title?: string;
  image?: string;
};

const FaceBookBlogCard: React.FC<FaceBookBlogCardProps> = ({
  facebookUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract actual Facebook URL if iframe HTML is passed
  let actualUrl = facebookUrl;
  let isVideo = false;

  // Check if the input is an iframe string
  if (facebookUrl.includes('<iframe')) {
    // Check if it's a video embed
    isVideo = facebookUrl.includes('plugins/video.php');

    // Extract the href parameter from the iframe
    const hrefMatch = facebookUrl.match(/href=([^&\s"]+)/);
    if (hrefMatch && hrefMatch[1]) {
      // Decode the URL (it's URL-encoded in the iframe)
      actualUrl = decodeURIComponent(hrefMatch[1]);
    }
  } else {
    // Check if the direct URL is a video URL
    isVideo = actualUrl.includes('/videos/');
  }

  useEffect(() => {
    // Load Facebook SDK
    if (!(window as any).FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);

      script.onload = () => {
        if ((window as any).FB) {
          (window as any).FB.XFBML.parse();
        }
      };
    } else {
      (window as any).FB.XFBML.parse();
    }
  }, [actualUrl]);

  if (!facebookUrl) return null;

  return (
    <div
      className="bg-white rounded-md"
      ref={containerRef}
      style={{
        marginTop: "2rem",
        width: "410px",
        maxWidth: "100%"
      }}
    >
      {isVideo ? (
        <div
          className="fb-video"
          data-href={actualUrl}
          data-width="410"
          data-show-text="true"
        ></div>
      ) : (
        <div
          className="fb-post"
          data-href={actualUrl}
          data-width="410"
          data-show-text="true"
        ></div>
      )}
    </div>
  );
};

export default FaceBookBlogCard;