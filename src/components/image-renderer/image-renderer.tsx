import { useRef, useState } from 'react'
import useIntersection from './intersection-hook'

interface ImageProps {
  url: string,
  thumb: string
}

const ImageRenderer: React.FC<ImageProps> = ({ url, thumb }) => {
    const [isInView, setIsInView] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)
    useIntersection(imgRef, () => {
      setIsInView(true)
    })
  
    return (         
            <img
              ref={imgRef}
              className='image'
              src={isInView ? url: thumb}
            />
    )
  }
  
  export default ImageRenderer