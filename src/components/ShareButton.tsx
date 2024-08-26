"use client";

import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareButtonProps {
  title?: string;
  url?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title = "Web Lens",
  url = "https://weblens.vercel.app/",
}) => {
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({ title, url: currentUrl });
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  };

  return (
    <button
      className="flex mb-4 gap-x-1 mx-auto bg-indigo-500 hover:bg-indigo-700 text-white font-light p-3 rounded-full text-center ring-1 ring-black ring-inset"
      onClick={handleShare}
    >
      Compartir <Share2 />
    </button>
  );
};

export default ShareButton;
