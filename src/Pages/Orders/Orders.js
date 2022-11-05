import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
   const { user, logOut } = useContext(AuthContext);
   const [serviceOrders, setServiceOrders] = useState([]);

   useEffect(() => {
      fetch(`https://genius-car-server-sigma.vercel.app/orders?email=${user?.email}`, {
         headers: {
            authorization: `Bearer ${localStorage.getItem('genius-token')}`
         }
      })
         .then(res => {
            if (res.status === 401 || res.status === 403) {
               return logOut();
            }
            return res.json()
         })
         .then(data => setServiceOrders(data))
   }, [user?.email, logOut])

   const handleDelete = id => {
      const proceed = window.confirm('are you sure? you want to cancel you order!');
      if (proceed) {
         fetch(`https://genius-car-server-sigma.vercel.app/orders/${id}`, {
            method: 'DELETE',
            headers: {
               authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
         })
            .then(res => res.json())
            .then(data => {
               console.log(data);
               if (data.deletedCount > 0) {
                  alert('Your order cancel successful')
                  const remaining = serviceOrders.filter(ord => ord._id !== id)
                  setServiceOrders(remaining);
               }
            })
            .catch(error => console.error(error))
      }

   }

   const handleStatusUpdate = id => {
      fetch(`https://genius-car-server-sigma.vercel.app/orders/${id}`, {
         method: 'PATCH',
         headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('genius-token')}`
         },
         body: JSON.stringify({ status: 'Approved' })
      })
         .then(res => res.json())
         .then(data => {
            console.log(data);
            if (data.modifiedCount > 0) {
               const remaining = serviceOrders.filter(rema => rema._id !== id);
               const approving = serviceOrders.find(apr => apr._id === id);
               approving.status = 'Approved';
               const newService = [approving, ...remaining];
               setServiceOrders(newService);
            }
         })
         .catch(err => console.error(err))
   }

   return (
      <div className=''>
         <h1 className='text-4xl font-bold'>You have {serviceOrders.length} Orders</h1>
         <div className="overflow-x-auto w-full">
            <table className="table w-full">
               <thead>
                  <tr>
                     <th>
                        <label>
                           <input type="checkbox" className="checkbox" />
                        </label>
                     </th>
                     <th>Name</th>
                     <th>Job</th>
                     <th>Eamil</th>
                     <th>Message</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     serviceOrders.map(order => <OrderRow
                        key={order._id}
                        order={order}
                        handleDelete={handleDelete}
                        handleStatusUpdate={handleStatusUpdate}
                     ></OrderRow>)
                  }
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Orders;