"use client";

import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";

interface ImageCropperModalProps {
  imageSrc: string;
  onClose: () => void;
  onUploadSuccess: (cloudinaryUrl: string) => void;
}

// Helper to load image
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

// Canvas crop helper
async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Could not initialize canvas context");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas export failed"));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      0.92
    );
  });
}

export default function ImageCropperModal({
  imageSrc,
  onClose,
  onUploadSuccess,
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number>(4 / 5); // Default boutique fashion 4:5 ratio
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, currentPixels: Area) => {
    setCroppedAreaPixels(currentPixels);
  }, []);

  const handleCropAndUpload = async () => {
    if (!croppedAreaPixels) return;

    setUploading(true);
    setError(null);

    try {
      // 1. Generate cropped image blob
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      // 2. Upload to Cloudinary via server route
      const formData = new FormData();
      formData.append("file", croppedBlob, "category.jpg");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to upload to Cloudinary.");
      }

      // 3. Callback with secure URL
      onUploadSuccess(result.url);
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error cropping and uploading image.";
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        zIndex: 300,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "600px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.45rem",
                fontWeight: 500,
                color: "var(--color-charcoal)",
                margin: 0,
              }}
            >
              Crop Category Image
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: "0.2rem 0 0" }}>
              Pan and zoom to frame the category cover photo
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.25rem",
              color: "#9ca3af",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Cropper Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "360px",
            backgroundColor: "#1a1a1a",
          }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
          />
        </div>

        {/* Controls & Aspect Ratio */}
        <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #e5e7eb" }}>
          {error && (
            <div
              style={{
                backgroundColor: "#fee2e2",
                color: "#991b1b",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                padding: "0.6rem 0.85rem",
                fontSize: "0.82rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Zoom Slider */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", width: "50px" }}>
              Zoom:
            </span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              style={{ flex: 1, accentColor: "var(--color-charcoal)", cursor: "pointer" }}
            />
            <span style={{ fontSize: "0.8rem", color: "#6b7280", width: "40px", textAlign: "right" }}>
              {zoom.toFixed(1)}x
            </span>
          </div>

          {/* Aspect Ratio Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", width: "50px" }}>
              Ratio:
            </span>
            {[
              { label: "4:5 Portrait (Recommended)", val: 4 / 5 },
              { label: "1:1 Square", val: 1 },
              { label: "3:4 Classic", val: 3 / 4 },
            ].map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={() => setAspect(btn.val)}
                style={{
                  fontSize: "0.78rem",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "6px",
                  border: aspect === btn.val ? "1px solid var(--color-charcoal)" : "1px solid #d1d5db",
                  backgroundColor: aspect === btn.val ? "var(--color-charcoal)" : "#ffffff",
                  color: aspect === btn.val ? "#ffffff" : "#4b5563",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "all 0.15s",
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              style={{
                padding: "0.65rem 1.25rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                background: "none",
                fontSize: "0.88rem",
                cursor: uploading ? "not-allowed" : "pointer",
                color: "#4b5563",
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCropAndUpload}
              disabled={uploading}
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: "8px",
                border: "1px solid var(--color-charcoal)",
                backgroundColor: uploading ? "#6b7280" : "var(--color-charcoal)",
                color: "#ffffff",
                fontSize: "0.88rem",
                fontWeight: 600,
                cursor: uploading ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {uploading ? (
                <>
                  <svg
                    style={{ animation: "spin 1s linear infinite", width: "16px", height: "16px" }}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" style={{ opacity: 0.75 }} />
                  </svg>
                  <span>Uploading to Cloudinary...</span>
                </>
              ) : (
                <span>Crop & Save to Cloudinary</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
