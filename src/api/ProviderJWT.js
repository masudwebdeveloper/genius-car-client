export const authJwt = (user) => {
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
         // navigate(from, { replace: true });

      })
}