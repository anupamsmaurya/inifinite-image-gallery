import { RefObject, useEffect } from "react"

/**
 * Custom hook which implements IntersectionObserver for inifinite scrolling.
 * @param loader RefObject which is the target for oberver
 * @param callback function to call on intersection
 */
const useLoader = (loader: RefObject<HTMLDivElement>, callback: () => void) => {

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting) {
            callback()
        }
      }

    useEffect(() => {
        const options = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        const currentRef = loader.current

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) { 
                observer.unobserve(currentRef);
            }            
        }
    }, [loader, callback]);

}

export default useLoader