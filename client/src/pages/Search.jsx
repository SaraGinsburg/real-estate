const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-8'>
          <div className='flex gap-2 items-center text-slate-500'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
            />
          </div>
          <div className='flex gap-4 flex-wrap text-slate-500'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='accent-customGreen w-4'
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='accent-customGreen w-4'
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='accent-customGreen w-4'
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='accent-customGreen w-4'
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-4 flex-wrap text-slate-500'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='accent-customGreen w-4'
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='accent-customGreen w-4'
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-4 text-slate-500'>
            <label className='font-semibold'>Sort:</label>
            <select
              id='sort_order'
              className='border rounded-lg p-3 focus:customGreen focus:outline-customGreen'>
              <option className='accent-customGreen w-4' value=''>
                Price high to low
              </option>
              <option className='accent-customGreen w-4' value=''>
                Price low to high
              </option>
              <option className='accent-customGreen w-4' value=''>
                Latest
              </option>
              <option className='accent-customGreen w-4' value=''>
                Oldest
              </option>
            </select>
          </div>
          <button className='bg-slate-500 text-slate-200 p-3 rounded-lg uppercase hover:opacity-80'>
            {' '}
            Search
          </button>
        </form>
      </div>
      <div className=''>
        <h1 className='text-3xl font-semibold text-slate-500 border-b p-3 mt-5'>
          Listing results
        </h1>
      </div>
    </div>
  );
};

export default Search;
