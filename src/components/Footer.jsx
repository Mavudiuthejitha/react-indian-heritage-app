import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white text-center py-3 border-top mt-4">
      <div className="container">
        <small>
          © {new Date().getFullYear()} Indian Heritage Explorer — Built for SDP
        </small>
      </div>
    </footer>
  );
}
