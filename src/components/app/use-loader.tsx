import { RefObject, useEffect } from "react"

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

        if (loader && loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader && loader.current) { 
                observer.unobserve(loader.current);
            }            
        }
    }, [loader, callback]);

}

export default useLoader