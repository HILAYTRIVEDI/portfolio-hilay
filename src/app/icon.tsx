import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 8,
          background: "#06060E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: "-0.02em",
          color: "#F0EDE8",
          position: "relative",
        }}
      >
        HT
        <span style={{ color: "#C8FF00", marginLeft: 1 }}>.</span>
      </div>
    ),
    { ...size }
  );
}
