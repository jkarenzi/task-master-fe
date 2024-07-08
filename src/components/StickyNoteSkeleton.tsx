import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const StickyNoteSkeleton = ({cards}:{cards:number}) => {
    return Array(cards).fill(0).map(() => (
        <div className='flex flex-col items-center justify-center bg-[#26292C] gap-4 w-60 h-60 p-4'>
            <Skeleton width={200} height={7} baseColor='#666666'/>
            <Skeleton width={200} height={7} baseColor='#666666'/>
            <Skeleton width={200} height={7} baseColor='#666666'/>
        </div>   
    ))
}
 
export default StickyNoteSkeleton;