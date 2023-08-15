interface RatingsProps {
    rated: number;
}

type Rating = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

const Ratings = ({ rated }: RatingsProps) => {
    let rating: Rating;

    switch (true) {
        case rated >= 4.75:
            rating = 5;
            break;
        case rated >= 4.25:
            rating = 4.5;
            break;
        case rated >= 3.75:
            rating = 4;
            break;
        case rated >= 3.25:
            rating = 3.5;
            break;
        case rated >= 2.75:
            rating = 3;
            break;
        case rated >= 2.25:
            rating = 2.5;
            break;
        case rated >= 1.75:
            rating = 2.0;
            break;
        case rated >= 1.25:
            rating = 1.5;
            break;
        case rated >= 0.75:
            rating = 1.0;
            break;
        case rated >= 0.25:
            rating = 0.5;
            break;
        default:
            rating = 0;
    }

    return (
        <div className='rating rating-half rating-sm'>
            <input type='radio' name='rating-10' className='rating-hidden' />
            <input
                type='radio'
                className='mask mask-half-1 mask-star-2 bg-orange-400'
                readOnly
                {...(rating === 0 ? { checked: true } : {})}
                hidden
            />
            <input
                type='radio'
                className='mask mask-half-1 mask-star-2 bg-orange-400'
                readOnly
                {...(rating === 0.5 ? { checked: true } : {})}
            />
            <input
                type='radio'
                className='mask mask-half-2 mask-star-2 bg-orange-400'
                readOnly
                {...(rating === 1 ? { checked: true } : {})}
            />
            <input
                type='radio'
                className='mask mask-half-1 mask-star-2 bg-orange-400'
                readOnly
                {...(rating === 1.5 ? { checked: true } : {})}
            />
            <input
                type='radio'
                className='mask mask-half-2 mask-star-2 bg-orange-400'
                readOnly
                {...(rating === 2 ? { checked: true } : {})}
            />
            <input
                type='radio'
                className='mask mask-half-1 mask-star-2 bg-orange-400'
                readOnly
                {...(rating === 2.5 ? { checked: true } : {})}
            />
            <input
                type='radio'
                className='mask mask-half-2 mask-star-2 bg-orange-400'
                readOnly
                {...(rating === 3 ? { checked: true } : {})}
            />
            <input
                type='radio'
                className='mask mask-half-1 mask-star-2 bg-orange-400'
                readOnly
                {...(rating === 3.5 ? { checked: true } : {})}
            />
            <input
                type='radio'
                className='mask mask-half-2 mask-star-2 bg-orange-400'
                readOnly
                {...(rating === 4 ? { checked: true } : {})}
            />
            <input
                type='radio'
                className='mask mask-half-1 mask-star-2 bg-orange-400'
                readOnly
                {...(rating === 4.5 ? { checked: true } : {})}
            />
            <input
                type='radio'
                className='mask mask-half-2 mask-star-2 bg-orange-400'
                readOnly
                {...(rating === 5 ? { checked: true } : {})}
            />
        </div>
    );
};

export default Ratings;
