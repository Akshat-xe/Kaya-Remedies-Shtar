import React, { useEffect, useRef, useState } from "react";

interface DeepZoomViewerProps {
  /**
   * Path to the DZI descriptor file, e.g. "/deepzoom/my-image.dzi"
   */
  dziUrl: string;
  /**
   * Custom CSS classes for the container
   */
  className?: string;
  /**
   * Show navigator map in the corner (default: true)
   */
  showNavigator?: boolean;
  /**
   * Show zooming/panning navigation toolbar controls (default: true)
   */
  showNavigationControl?: boolean;
}

export const DeepZoomViewer: React.FC<DeepZoomViewerProps> = ({
  dziUrl,
  className = "w-full h-full min-h-[500px] rounded-3xl overflow-hidden border border-sage/15 bg-card/25 backdrop-blur-md relative",
  showNavigator = true,
  showNavigationControl = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    setLoading(true);
    setError(null);
    let osdInstance: any = null;

    // Dynamically import OpenSeadragon client-side only
    import("openseadragon")
      .then((module) => {
        const OpenSeadragon = module.default;
        if (!containerRef.current) return;

        const osd = OpenSeadragon({
          element: containerRef.current,
          prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
          tileSources: dziUrl,
          showNavigationControl,
          showNavigator,
          navigatorPosition: "BOTTOM_RIGHT",
          navigatorSizeRatio: 0.12,
          wrapHorizontal: false,
          wrapVertical: false,
          minZoomImageRatio: 0.9,
          maxZoomPixelRatio: 2,
          visibilityRatio: 0.5,
          constrainDuringPan: true,
          blendTime: 0.15,
          gestureSettingsMouse: {
            clickToZoom: true,
            dblClickToZoom: true,
            pinchToZoom: true,
            scrollToZoom: true,
          },
        });

        osd.addHandler("open-failed", () => {
          setError(`Failed to load Deep Zoom image from: ${dziUrl}`);
          setLoading(false);
        });

        osd.addHandler("open", () => {
          setLoading(false);
        });

        osdInstance = osd;
        setViewer(osd);
      })
      .catch((err) => {
        console.error("Failed to load OpenSeadragon dynamically:", err);
        setError("Failed to load image viewer component.");
        setLoading(false);
      });

    return () => {
      if (osdInstance) {
        osdInstance.destroy();
      }
      setViewer(null);
    };
  }, [dziUrl, showNavigator, showNavigationControl]);

  return (
    <div className={`${className} flex items-center justify-center`}>
      {/* Viewer Target */}
      <div ref={containerRef} className="w-full h-full absolute inset-0 z-0" />

      {/* Loading Overlay */}
      {loading && !error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none animate-fade-in">
          <div className="w-10 h-10 rounded-full border-2 border-sage/20 border-t-sage animate-spin mb-4" />
          <p className="font-sans text-xs uppercase tracking-widest text-sage font-medium animate-pulse">
            Loading High-Res Pyramid...
          </p>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/90 p-6 text-center">
          <div className="text-3xl mb-3">⚠️</div>
          <h4 className="font-serif text-lg text-mist mb-2">Deep Zoom Error</h4>
          <p className="font-sans text-xs text-leaf/70 max-w-sm leading-relaxed">{error}</p>
          <p className="font-sans text-[10px] text-moss/50 mt-4">
            Make sure the slicing script has processed this image and generated public/deepzoom files.
          </p>
        </div>
      )}
    </div>
  );
};
