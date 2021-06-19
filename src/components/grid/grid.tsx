import { getFavoriteList } from '../../utils/storage';
import { PhotoType } from '../../utils/type-definitions';
import Card from '../card'
import './grid.scss'

interface GridProps {
    imageList: Array<PhotoType>
}

/**
 * Container component which holds image list. 
 * Merges fetched list and favourite image list(removes duplicates, if any).
 */
const Grid: React.FC<GridProps> = ({imageList}) => {
    //get favourite image list from localStorage.
    const favouriteList: Array<PhotoType> = getFavoriteList()
    //collect unique image IDs
    var ids = new Set(favouriteList.map((item:PhotoType) => item.id));
    
    //create list to render after removing entries from fetched list which are duplicate in favoruite list.
    //favoruite images will be placed at the start.
    const renderList = [...favouriteList, ...imageList.filter((item:PhotoType) => !ids.has(item.id))]
    return (
        <div className='grid-container' data-testid='grid-container'>
            {renderList.map((image: PhotoType) => <Card data={image} key={image.id} />)}
        </div>
    );
}

export default Grid;