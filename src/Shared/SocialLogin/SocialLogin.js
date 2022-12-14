import React, { useContext } from 'react';
import { FaBeer, FaGoogle } from 'react-icons/fa';
import { authJwt } from '../../api/ProviderJWT';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const SocialLogin = () => {
   const { googleSignIn } = useContext(AuthContext);

   const handleGoogleSignIn = () => {
      googleSignIn()
         .then(result => {
            const user = result.user;
            console.log(user);
            authJwt(user)
         })
      .then(err => console.error(err))
   }
   return (
      <div className='text-center mt-5'>
         <p><small>Social Login</small></p>
         <hr />
         <div className='mt-5'>
            <button onClick={handleGoogleSignIn} className="btn btn-ghost text-xl">
               <span className='text-[#4285F4]'>G</span>
               <span className='text-[#34A853]'>o</span>
               <span className='text-[#FBBC05]'>o</span>
               <span className='text-[#EA4335]'>g</span>
               <span className='text-[#4285F4]'>l</span>
               <span className='text-[#34A853]'>e</span>
            </button>
            <button className="btn btn-ghost text-[#3b5998] text-xl">Facebook</button>
            <button className="btn btn-ghost text-[#171515] text-xl">Github</button>
         </div>
      </div>
   );
};

export default SocialLogin;