import { Skeleton } from '@/components/ui/skeleton'


const UserSkeleton = ({ isCollapsed, count = 2 }: { isCollapsed: boolean, count?: number }) => {
    const arr = (new Array(count)).fill(0)

    return (
        <div className='flex flex-col gap-2 px-2 group-[[data-collapsed-true]]:justify-center group-[[data-collapsed-true]]:px-2'>
            {
                isCollapsed ?
                    arr.map((_, i) => (
                        <Skeleton className='size-10 rounded-full' key={i} />
                    ))
                    :
                    arr.map((_, i) => (
                        <div className='my-1 flex w-full items-center justify-start gap-4' key={i}>
                            <Skeleton className='size-10 shrink-0 rounded-full' />
                            <Skeleton className='size-4 w-full rounded' />
                        </div>
                    ))
            }
        </div>
    )
}

export default UserSkeleton