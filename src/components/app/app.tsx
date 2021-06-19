import { useEffect, useRef, useState } from 'react'
import fetchPhotos from '../../services/fetch-photos'
import { PhotoType } from '../../utils/type-definitions'
import Grid from '../grid'
import Spinner from '../spinner'
import useLoader from './use-loader-hook'

const App = () => {

    const [imageList, setImageList] = useState<PhotoType[]>([])
    const [page, setPage] = useState(1)
    const [isFetching, setIsFetching] = useState(false)

    const loader = useRef<HTMLDivElement>(null);

    /**
     * Fetches next page images
     */
    const fetchNextPhotos = async() => {
        setIsFetching(true)
        const photos = await fetchPhotos(page)
        setImageList([...imageList, ...photos])
        setIsFetching(false)
    }

    /**
     * Fetch next page of images when page number gets updated.
     */
    useEffect(() => {
        fetchNextPhotos()
    }, [page])

    /**
     * Use IntersectionObserver to watch the position of loader for updating page number.
     */
    useLoader(loader, () => {
        if(!isFetching) {
            setPage(curr => curr + 1)  
        }        
    })

    return (
        <div>
            <Grid imageList={imageList} />
            <div ref={loader}><Spinner/></div>
        </div>
    );
}

export default App;