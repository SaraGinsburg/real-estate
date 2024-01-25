import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p className='text-slate-600'>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for <span className='font-semibold'>{listing.name}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            onChange={handleChange}
            value={message}
            placeholder='Enter your message here...'
            className=' w-full p-2 border border-slate-300  focus:border-slate-500 focus:outline-none rounded-lg'></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regardig ${listing.name}&body=${message}`}
            className='bg-slate-400 text-slate-200 text-center p-3 uppercase rounded-lg hover:opacity-80 hover:bg-customGreen'>
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
