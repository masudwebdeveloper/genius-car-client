import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
   const { _id, serviceName, price, customer, email, phone, message, service, status } = order;
   const [services, setServices] = useState({});

   useEffect(() => {
      fetch(`http://localhost:5000/services/${service}`)
         .then(res => res.json())
         .then(data => setServices(data))
         .catch(err => console.error(err))
   }, [service])

   
   return (
      <tr>
         <th>
            <label>
               <button onClick={() => handleDelete(_id)} className='btn btn-ghost'>x</button>
            </label>
         </th>
         <td>
            <div className="flex items-center space-x-3">
               <div className="avatar">
                  <div className="rounded w-24">
                     <img src={services.picture} alt="Avatar Tailwind CSS Component" />
                  </div>
               </div>
               <div>
                  <div className="font-bold">{customer }</div>
                  <div className="text-sm opacity-50">Phone: {phone}</div>
               </div>
            </div>
         </td>
         <td>
            {serviceName}
            <br />
            <span className="badge badge-ghost badge-sm">Pirce: {price} $</span>
         </td>
         <td>{email}</td>
         <th>
            <button onClick={()=> handleStatusUpdate(_id)} className="btn btn-ghost btn-xs">{status ? status : 'pending'}</button>
         </th>
      </tr>
   );
};

export default OrderRow;