"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  aspectRatio: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [rows, setRows] = useState<any[]>([]);

  // Calculate optimal layout when container width changes
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial measurement
    updateContainerWidth();

    // Update on resize
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  // Calculate optimal layout when container width or images change
  useEffect(() => {
    if (containerWidth === 0 || images.length === 0) return;

    // Create a copy of images with calculated aspect ratios
    const processedImages = images.map((image) => {
      const [width, height] = image.aspectRatio.split("/").map(Number);
      return {
        ...image,
        ratio: width / height,
      };
    });

    // Calculate rows to eliminate gaps
    const idealHeight = 250; // Target row height
    const calculatedRows = [];
    let currentRow = [];
    let currentRowWidth = 0;

    // Process each image
    for (let i = 0; i < processedImages.length; i++) {
      const img = processedImages[i];

      // Calculate image width at ideal height
      const imgWidth = idealHeight * img.ratio;

      // Add image to current row
      currentRow.push({
        ...img,
        width: imgWidth,
        height: idealHeight,
      });

      currentRowWidth += imgWidth;

      // Check if row is full or last image
      const isLastImage = i === processedImages.length - 1;

      if (currentRowWidth >= containerWidth || isLastImage) {
        // Calculate scaling factor to fit row exactly to container width
        const scale = containerWidth / currentRowWidth;

        // Scale all images in the row
        const scaledRow = currentRow.map((img) => ({
          ...img,
          width: img.width * scale,
          height: img.height * scale,
        }));

        calculatedRows.push(scaledRow);

        // Reset for next row
        currentRow = [];
        currentRowWidth = 0;
      }
    }

    setRows(calculatedRows);
  }, [containerWidth, images]);

  return (
    <div ref={containerRef} className="flex-1 w-full">
      <div className="w-full">
        {rows.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex w-full"
            style={{ fontSize: 0 }}
          >
            {row.map((image: any) => (
              <div
                key={image.id}
                className="relative overflow-hidden"
                style={{
                  width: `${image.width}px`,
                  height: `${image.height}px`,
                  display: "inline-block",
                }}
              >
                <Image
                  src={"/placeholder.svg"}
                  alt={image.alt || "none"}
                  fill
                  sizes={`${Math.ceil(image.width)}px`}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
