import { useState, useEffect, useCallback } from "react";

export const useReizeObserver = (callback) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  let RO;
  const handleResize = useCallback(
    (entries) => {
      if (!Array.isArray(entries)) {
        return;
      }
      const entry = entries[0];
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);
      if (callback) {
        callback(entry.contentRect);
      }
    },
    [callback]
  );

  const measuredRef = useCallback((node) => {
    if (!node) {
      return;
    }
    RO = new ResizeObserver((entries) => handleResize(entries));
    RO.observe(node);
  }, []);

  useEffect(() => {
    return () => {
      RO?.disconnect();
      RO = null;
    };
  }, []);
  return { width, height, measuredRef };
};
