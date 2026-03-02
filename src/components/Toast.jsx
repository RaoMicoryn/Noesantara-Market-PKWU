import React from "react";
import Icon from "./Icon";

/**
 * Toast — temporary notification popup
 */
export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast">
      <div className="toast-check"><Icon name="check" size={14} /></div>
      {message}
    </div>
  );
}
