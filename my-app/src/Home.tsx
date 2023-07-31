import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { loadStripe } from "@stripe/stripe-js";

function Home() {



    useEffect(() => {

//get domain
    

    }, [])

      
    function createCheckoutSession(){
      const stripePromise = loadStripe(
         "YOUR PK TEST KEY")
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('http://localhost:4242/create-checkout-session', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
    
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
    
    console.log(data)
    const stripe = await stripePromise;
    if (stripe!= null){
      stripe.redirectToCheckout({sessionId: data.id})
    
    }
    
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }
  

    return (
      <>
       <div>
<h1>Home:</h1>

<h1>Stripe checkout</h1>
     <button onClick={createCheckoutSession}>Become a member</button>
       </div>
       
      </>
    );
  }
  export default Home;