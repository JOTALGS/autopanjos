"use client";

import { Box } from "@mui/material";

export default function MapComponent() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "400px",
        border: "2px solid #0033e5",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Iframe Map */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26291.068731160136!2d-56.2200008!3d-34.9033241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f81476d7d36cb%3A0x9be24a6cc6767e2!2sIsla%20de%20Flores%201691%2C%2011200%20Montevideo%2C%20Departamento%20de%20Montevideo%2C%20Uruguay!5e0!3m2!1sen!2suy!4v1718642579590!5m2!1sen!2suy"
        width="100%"
        height="50%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Color Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          backgroundColor: "#0033e5",
          opacity: 0.5,
          pointerEvents: "none",
          mixBlendMode: "multiply",
        }}
      />
    </Box>
  );
}
