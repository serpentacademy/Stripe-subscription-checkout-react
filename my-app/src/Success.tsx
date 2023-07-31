import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { loadStripe } from "@stripe/stripe-js";

function Success() {


    useEffect(() => {
        let params = new URLSearchParams(window.location.search)

        let id = params.get('id')
        if (id !="" && id != null){
            console.log(id)
            getSession(id+"")    

        }
//get domain
    }, [])
    function getSession(id:string){
        console.log("id: "+id)
        const stripePromise = loadStripe(
           "YOUR PK TEST KEY")
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      };
      fetch('http://localhost:4242/checkout-session?id='+id, requestOptions)
          .then(async response => {
              const isJson = response.headers.get('content-type')?.includes('application/json');
              const data = isJson && await response.json();
      
              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
      
      console.log(JSON.stringify(data))
    
      
          })
          .catch(error => {
              //this.setState({ errorMessage: error.toString() });
              console.error('There was an error!', error);
          });
      }

    

  

    return (
      <>
       <div>
<h1>Successful Payment - Thank you!</h1>
<pre id='session_data'></pre>


       </div>
       
      </>
    );
  }
  export default Success;