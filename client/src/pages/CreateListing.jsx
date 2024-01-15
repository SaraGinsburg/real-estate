const CreateListing = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-center my-7 text-3xl font-semibold text-slate-500'>
        Create a Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-8 md:justify-between'>
        <div className='flex flex-col  gap-3 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
          />
          <div className='flex gap-8 flex-wrap p-8 items-center justify-center'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='accent-customGreen w-4'
              />
              <span className='text-slate-500'>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='accent-customGreen w-4'
              />
              <span className='text-slate-500'>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='accent-customGreen w-4'
              />
              <span className='text-slate-500'>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='accent-customGreen w-4'
              />
              <span className='text-slate-500'>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='accent-customGreen w-4'
              />
              <span className='text-slate-500'>Offer</span>
            </div>
          </div>
          <div className='flex  flex-wrap justify-between-between gap-6 p-3 items-center justify-center'>
            <div className='flex items-center gap-2 '>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                value='1'
                required
                className='border p-3 border-slate-300 rounded-lg hover:border-slate-500 focus:border-slate-900 focus:outline-none focus:ring-0'
              />
              <span className='text-slate-500'>Beds</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='number'
                id='bathrooms'
                value='1'
                min='1'
                max='10'
                required
                className='border p-3 border-slate-300 rounded-lg hover:border-slate-500 focus:border-slate-900 focus:outline-none focus:ring-0'
              />
              <span className='text-slate-500'>Baths</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='number'
                id='regularPrice'
                min='0'
                max='15000'
                // value='0'
                step='50'
                required
                className='border p-3 border-slate-300 rounded-lg hover:border-slate-500 focus:border-slate-900 focus:outline-none focus:ring-0'
              />
              <div className='flex flex-col'>
                <span className='text-slate-500'>Regular price </span>
                <span className='text-slate-500 text-center text-xs'>
                  ($/Month)
                </span>
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='number'
                id='discountedPrice'
                min='0'
                max='15000'
                // value='0'
                step='50'
                required
                className='border p-3 border-slate-300 rounded-lg hover:border-slate-500 focus:border-slate-900 focus:outline-none focus:ring-0'
              />
              <div className='flex flex-col'>
                <span className='text-slate-500'>Discounted price </span>
                <span className='text-slate-500 text-center text-xs'>
                  ($/Month)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p
            className=' mx-10
            font-semibold text-slate-600'>
            Images:
            <span className='font-normal text-slate-500 ml-2'>
              The first image will be a cover photo (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              className='p-3 border border-slate-300  rounded w-full text-slate-500'
              type='file'
              id='images'
              accept='/image/*'
              multiple
            />
            <button className='p-3 text-customGreen border border-customGreen rounded-lg uppercase hover:shadow-lg disabled:opacity-70'>
              Upload
            </button>
          </div>
          <button className='rounded-lg p-3 bg-slate-500 text-white uppercase hover:opacity-80 disabled:opacity-50'>
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
