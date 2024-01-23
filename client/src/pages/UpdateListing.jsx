import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    regularPrice: 50,
    discountedPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: 'rent',
    offer: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const listingId = params.listingId;

  useEffect(() => {
    const fetchListing = async () => {
      console.log('listingId', listingId);
      const res = await fetch(`/api/listing/get/${listingId}`);

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.id === 'furnished' ||
      e.target.id === 'offer' ||
      e.target.id === 'parking'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    // if (
    //   e.target.id === 'bathrooms' ||
    //   e.target.id === 'bedrooms' ||
    //   e.target.id === 'discountedPrice' ||
    //   e.target.id === 'regularPrice'
    if (
      e.target.type === 'text' ||
      e.target.type === 'number' ||
      e.target.type === 'textarea'
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError('You must upload at least one image!');
      }
      if (formData.regularPrice < formData.discountedPrice) {
        return setError('Discounted Price should be lower than Regular Price');
      }
      setLoading(true);
      setError(false);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-center my-7 text-3xl font-semibold text-slate-500'>
        Update a Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col sm:flex-row gap-8 md:justify-between'>
        <div className='flex flex-col  gap-3 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-8 flex-wrap p-8 items-center justify-center'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='accent-customGreen w-4'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span className='text-slate-500'>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='accent-customGreen w-4'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span className='text-slate-500'>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='accent-customGreen w-4'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span className='text-slate-500'>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='accent-customGreen w-4'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span className='text-slate-500'>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='accent-customGreen w-4'
                onChange={handleChange}
                checked={formData.offer}
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
                required
                className='border p-3 border-slate-300 rounded-lg hover:border-slate-500 focus:border-slate-900 focus:outline-none focus:ring-0'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <span className='text-slate-500'>Beds</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='border p-3 border-slate-300 rounded-lg hover:border-slate-500 focus:border-slate-900 focus:outline-none focus:ring-0'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <span className='text-slate-500'>Baths</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='15000'
                step='50'
                required
                className='border p-3 border-slate-300 rounded-lg hover:border-slate-500 focus:border-slate-900 focus:outline-none focus:ring-0'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col'>
                <span className='text-slate-500'>Regular price </span>
                <span className='text-slate-500 text-center text-xs'>
                  ($/Month)
                </span>
              </div>
            </div>
            {formData.offer && (
              <div className='flex gap-2 items-center'>
                <input
                  type='number'
                  id='discountedPrice'
                  min='0'
                  max='15000'
                  step='5'
                  required
                  className='border p-3 border-slate-300 rounded-lg hover:border-slate-500 focus:border-slate-900 focus:outline-none focus:ring-0'
                  onChange={handleChange}
                  value={formData.discountedPrice}
                />
                <div className='flex flex-col'>
                  <span className='text-slate-500'>Discounted price </span>
                  <span className='text-slate-500 text-center text-xs'>
                    ($/Month)
                  </span>
                </div>
              </div>
            )}
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
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-slate-300  rounded w-full text-slate-500'
              type='file'
              id='images'
              accept='/image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-customGreen border border-customGreen rounded-lg uppercase hover:shadow-lg disabled:opacity-70'>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-orange-500 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, idx) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'>
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(idx)}
                  className='p-3 text-orange-500 rounded-lg uppercase hover:opacity-60'>
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='rounded-lg p-3 bg-slate-500 text-white uppercase hover:opacity-80 disabled:opacity-50'>
            {loading ? 'Updating...' : 'Update listing'}
          </button>
          {error && <p className='text-orange-500 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
