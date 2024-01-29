import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const ListingItem = ({ listing }) => {
  return (
    <div
      className='bg-white  shadow-md hover:shadow-lg
    transition-shadow overflow-hidden rounded-lg
    w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt='listing cover photo'
          className='h-[320pc sm:h-[220px] w-full object-cover
          hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-500'>
            {listing.name}
          </p>
          <div className='flex items-center gap-2 text-slate-500'>
            <MdLocationOn className='text-customGreen h-4 w-4' />
            <p className='text-sm text-slate-500 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-slate-400 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold flex items-center'>
            $
            {listing.offer
              ? listing.discountedPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='flex items-center gap-4 text-slate-600 font-bold text-xs'>
            <span>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </span>
            <span>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
