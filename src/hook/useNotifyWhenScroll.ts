import { DependencyList, useEffect, useRef, useState } from "react";

const useIntersectionObserver = (callback: Function, deps: DependencyList) => {
  const target = useRef<HTMLElement>();
  useEffect(() => {
    if (!target.current) return;
    const observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) callback();
      },
      { root: null }
    );
    observer.observe(target.current);
    return () => observer.disconnect();
  }, deps);
  return target;
};
export default useIntersectionObserver;
