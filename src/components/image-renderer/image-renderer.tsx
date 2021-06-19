import { useRef, useState } from 'react'
import useIntersection from './intersection-hook'

interface ImageProps {
  url: string,
  placeholder: string,
  title: string
}

/**
 * Image component, initially shows a placholder image and later replaces with 
 * actual image based on IntersectionObserver. This saves bandwidth by only downloading images
 * which are above the fold.
 */
const ImageRenderer: React.FC<ImageProps> = ({ url, placeholder, title }) => {
    const [isInView, setIsInView] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)

    //use custom intersection hook to lazily download image.
    useIntersection(imgRef, () => {
      setIsInView(true)
    })
  
    return (         
            <img
              ref={imgRef}
              className='image'
              src={isInView ? url: placeholder}
              alt={title}
            />
    )
  }
  
  export default ImageRenderer