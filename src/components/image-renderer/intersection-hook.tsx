import { RefObject, useEffect } from 'react'

//holds a map of callbacks for each image.
let listenerCallbacks = new WeakMap()

//common observer for all the images
let observer: IntersectionObserver

/**
 * Triggers callback for each image on intersection. 
 * Runs only once for each image, clears the entry 
 * from map and unobserve the image element.
 * @param entries IntersectionObserverEntry
 */
function handleIntersections(entries: IntersectionObserverEntry[]) {
  entries.forEach(entry => {
    if (listenerCallbacks.has(entry.target)) {
      let cb = listenerCallbacks.get(entry.target)

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target)
        listenerCallbacks.delete(entry.target)
        cb()
      }
    }
  })
}

/**
 * Creates singleton instance of IntersectionObserver.
 * @returns instance of IntersectionObserver
 */
function getIntersectionObserver() {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '0px',
      threshold: 0.25,
    })
  }
  return observer
}

/**
 * Custom hook for lazy loading images based on IntersectionObserver.
 * @param elem RefObject represnting the image.
 * @param callback function to call on intersection.
 */
export default function useIntersection(elem: RefObject<HTMLImageElement>, callback: () => void) {
  useEffect(() => {
    let target = elem.current
    let observer = getIntersectionObserver()
    if(target) {
        listenerCallbacks.set(target, callback)
        observer.observe(target)    
    }
    return () => {
        if(target) {
            listenerCallbacks.delete(target)
            observer.unobserve(target)      
        }
    }
  }, [])
}