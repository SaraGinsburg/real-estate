import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';

const Listing = () => {
  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          console.log(data.message);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && (
        <p className='text-center my-7 text-2xl text-slate-600'>loading...</p>
      )}
      {error && (
        <p className='text-center my-7 text-orange-500 text-2xl'>
          something went wrong!
        </p>
      )}
      {listing && !error && !loading && (
        <div>
          <Swiper
            navigation
            style={{
              '--swiper-pagination-color': '#809e88',
              '--swiper-navigation-color': '#809e88',
            }}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[500px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-300 cursor-pointer
          '>
            <FaShare
              className='text-customGreen'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href); //writing the current URL (window.location.href) to the clipboard.
                setLinkCopied(true);
                setTimeout(() => {
                  setLinkCopied(false);
                }, 2000);
              }}
            />
          </div>
          {linkCopied && (
            <p className='fixed top-[20%] right-[1%] z-10 border rounded-md p-1 bg-slate-300 text-customGreen'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold text-slate-600'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountedPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center gap-2 mt-4 text-slate-600 text-sm '>
              <FaMapMarkerAlt className=' text-customGreen' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-orange-400 text-slate-200 w-full max-w-[200px] text-center rounded-md p-1'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-customGreen text-slate-200 w-full max-w-[200px] text-center rounded-md p-1'>
                  ${+listing.regularPrice - +listing.discountedPrice} Discount
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-slate-900'>
                Description -{' '}
              </span>
              {listing.description}
            </p>
            <ul className='text-customDarkGreen font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex gap-1 items-center whitespace-nowrap '>
                <FaBed className='text-lg text-customGreen' />

                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className='flex gap-1 items-center whitespace-nowrap '>
                <FaBath className='text-lg text-customGreen' />
                {listing.bathrooms > 1
                  ? `${listing.bedrooms} baths`
                  : `${listing.bedrooms} bath`}
              </li>
              <li className='flex gap-1 items-center whitespace-nowrap '>
                <FaParking className='text-lg text-customGreen' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex gap-1 items-center whitespace-nowrap '>
                <FaChair className='text-lg text-customGreen' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && currentUser._id !== listing.userRef && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-400 text-slate-200 w-full max-w-[417px] text-center rounded-lg uppercase hover:opacity-80 p-2'>
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
