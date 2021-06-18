import { getFavoriteList } from '../../utils/storage';
import { PhotoCollectionType, PhotoType } from '../../utils/type-definitions';
import Card from '../card'
import './grid.scss'

interface GridProps {
    imageList: PhotoType[]
}

const Grid: React.FC<GridProps> = ({imageList}) => {
    const favouriteList = getFavoriteList()
    var ids = new Set(favouriteList.map((item:PhotoType) => item.id));

    const renderList = [...favouriteList, ...imageList.filter((item:PhotoType) => !ids.has(item.id))]
    return (
        <div className='grid-container'>
            {renderList.map((image: PhotoType) => <Card data={image} key={image.id} />)}
        </div>
    );
}

export default Grid;