import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img
          src={currentUser.avatar}
          alt='profile'
          className='self-center  mt-2 rounded-full h-24 w-24 object-cover cursor-pointer'
        />
        <input
          type='text'
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
        />
        <input
          type='text'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
        />
        <button className='rounded-lg p-3 bg-slate-500 text-white uppercase hover:opacity-80 disabled:opacity-50'>
          update
        </button>
        <button></button>
      </form>
      <div className='flex justify-between mt-3'>
        <span className='text-orange-400'>Delete Account</span>

        <span className='text-orange-400'>Sign Out</span>
      </div>
    </div>
  );
}
