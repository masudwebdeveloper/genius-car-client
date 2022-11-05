import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
   const { _id, title, price } = useLoaderData();
   const { user } = useContext(AuthContext);

   const handlePlaceOrder = event => {
      event.preventDefault();
      const form = event.target;
      const name = `${form.firstname.value} ${form.lastname.value}`;
      const email = user?.email || 'unregistered';
      const phone = form.phone.value;
      const message = form.message.value;

      const order = {
         service: _id,
         serviceName: title,
         price,
         customer: name,
         email,
         phone,
         message
      }

      fetch('https://genius-car-server-sigma.vercel.app/orders', {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('genius-token')}`
         },
         body: JSON.stringify(order)
      })
         .then(res => res.json())
         .then(data => {
            console.log(data);
            if (data.acknowledged) {
               alert('Order Placed Successfully')
               form.reset();
            }
         })
         .catch(err => console.error(err))

   }
   return (
      <div className='p-20 bg-[#F3F3F3]'>
         <h1 className="text-4xl font-bold mb-5">{title}</h1>
         <form onSubmit={handlePlaceOrder}>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
               <input name='firstname' type="text" placeholder="firstName" className="input input-bordered input-warning w-full" />
               <input name='lastname' type="text" placeholder="lastName" className="input input-bordered input-warning  w-full" />
               <input name='phone' type="number" placeholder="phoneNumber" className="input input-bordered input-warning  w-full" />
               <input name='email' type="email" defaultValue={user?.email} placeholder="Type here" className="input input-bordered input-warning  w-full" />
            </div>
            <textarea name='message' className="textarea textarea-warning mt-5 w-full" placeholder="message"></textarea>
            <button className="btn btn-warning w-full mt-5">Order Confirm</button>
         </form>
      </div>
   );
};

export default Checkout;