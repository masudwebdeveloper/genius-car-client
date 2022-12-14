import React, { useContext } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import image from '../../assets/images/login/login.svg'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';

const Login = () => {
   const { login } = useContext(AuthContext);
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';
   const handleSignIn = (event) => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      login(email, password)
         .then(result => {
            const user = result.user;
            form.reset();

            const userEmail = {
               email: user.email,
            }

            fetch('https://genius-car-server-sigma.vercel.app/jwt', {
               method: 'POST',
               headers: {
                  'content-type': 'application/json'
               },
               body: JSON.stringify(userEmail)
            })
               .then(res => res.json())
               .then(data => {
                  localStorage.setItem('genius-token', data.token)
                  navigate(from, { replace: true });

               })
         })
         .catch(error => {
            console.error(error.message);
         })
   }
   return (
      <div className="hero my-10">
         <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-20 justify-between">
            <div className="text-center">
               <img src={image} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100  py-10">
               <form onSubmit={handleSignIn} className="card-body">
                  <h1 className="text-5xl font-bold text-center">Login now!</h1>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                     <label className="label">
                        <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
                     </label>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn btn-primary">Login</button>
                  </div>
               </form>
               <p className='text-center'>New Genius Car?<Link className='text-orange-600 font-semibold' to="/signup">Sign Up</Link></p>
               <SocialLogin></SocialLogin>
            </div>
         </div>
      </div>
   );
};

export default Login;