import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard/ServiceCard';

const Services = () => {
   const [services, setServices] = useState([]);
   useEffect(() => {
      fetch('https://genius-car-server-sigma.vercel.app/services')
         .then(res => res.json())
         .then(data => setServices(data))
   }, [])
   return (
      <div className='my-10'>
         <div className='text-center mb-5'>
            <p className="text-xl text-orange-600 font-semibold">Service</p>
            <h1 className='text-5xl font-bold'>Our Service Area</h1>
            <p className='text-xl'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
         </div>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
               services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
            }
         </div>
      </div>
   );
};

export default Services;