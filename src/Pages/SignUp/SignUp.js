import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import image from '../../assets/images/login/login.svg'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';


const SignUp = () => {
   const { createUser, setUser } = useContext(AuthContext);

   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';

   const handleSignUp = (event) => {
      event.preventDefault();
      const form = event.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);
      createUser(email, password)
         .then(result => {
            const user = result.user;
            setUser(user);
            if (user) {
               navigate(from, {replace: true})
            }
            form.reset();
         })
         .catch(error => {
         console.error(error.message);
      })
   }
   return (
      <div className="hero">
         <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-20 justify-between">
            <div className="text-center">
               <img src={image} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 py-10">
               <form onSubmit={handleSignUp} className="card-body">
               <h1 className="text-5xl font-bold text-center">Sign Up!</h1>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Name</span>
                     </label>
                     <input type="text" name='name' placeholder="name" className="input input-bordered" />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input type="email" name='email' placeholder="email" className="input input-bordered" required/>
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input type="password" name='password' placeholder="password" className="input input-bordered" />
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn btn-primary">SignUp</button>
                  </div>
               </form>
               <p className='text-center'>Already you have an Account <Link className='text-orange-600' to='/login'>Login</Link></p>
               <SocialLogin></SocialLogin>
            </div>
         </div>
      </div>
   );
};

export default SignUp;