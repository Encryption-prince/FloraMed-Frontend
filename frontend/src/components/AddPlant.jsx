import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Footer from './Footer';


const AddPlant = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get('https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/api/user/profile', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        console.log('token :', sessionStorage.getItem('token'));
        
        setUserRole(res.data.role);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch user profile.');
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  

  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      await axios.post('https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/plants/add', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      toast.success('Plant added successfully!');
      reset();
    } catch (error) {
      toast.error('Error adding plant.');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (userRole !== 'HERBALIST') return <div className="text-center mt-10 text-red-500">Access Denied: Only herbalists can add plants.</div>;

  return (
    <>
    <Navbar className='w-[96vw] ]'/>
    <div className="w-[96vw] mx-auto mt-[12vh] p-6 bg-[#f6f8ed] rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-4xl font-bold mb-6 text-center text-[#3b5d3b]">Add a New Plant 🌱</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 w-[100%]">
        {[
          { label: 'Name', name: 'plantName', required: true },
          { label: 'Region', name: 'region', required: true },
          { label: '3D Model URL', name: 'image3DUrl', },
          { label: 'Buy Link', name: 'buyingLink' },
          { label: 'Scientific Name', name: 'scientificName' },
          { label: 'Image URL', name: 'imageUrl' },
          { label: 'Plant Type', name: 'plantType', required: true }
        ].map(({ label, name, required }) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type="text"
              {...register(name, { required })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors[name] && required && <p className="text-sm text-red-500">{label} is required</p>}
          </div>
        ))}

        {[
          { label: 'Description', name: 'description', required: true },
          { label: 'Voice Description', name: 'voiceDescriptionUrl' },
          { label: 'Uses', name: 'uses' }
        ].map(({ label, name, required }) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <textarea
              {...register(name, { required })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
            />
            {errors[name] && required && <p className="text-sm text-red-500">{label} is required</p>}
          </div>
        ))}

        <button type="submit" className="w-full bg-[#b7d7b0] hover:bg-[#a3cfa0] text-[#3b5d3b] font-bold py-2 rounded transition">
          Add Plant
        </button>
      </form>
    </div>
    <Footer className="w-[96vw] mx-auto rounded-t-xl mt-[5vh]"  />
    </>
  );
};

export default AddPlant;
