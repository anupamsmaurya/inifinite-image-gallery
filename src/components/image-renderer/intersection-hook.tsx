import { RefObject, useEffect } from 'react'

let listenerCallbacks = new WeakMap()

let observer: IntersectionObserver

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

function getIntersectionObserver() {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '0px',
      threshold: 0.25,
    })
  }
  return observer
}

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