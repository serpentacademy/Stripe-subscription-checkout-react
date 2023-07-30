var express = require('express');
var app = express();

const stripe = require('stripe')('sk_test_51NZNIsG92AHfGFaWrLLBCmkBSnQJwNJ6ML818FlBLOK7uSF7xhAMoHZTxXyXqXDaDw7pRgAv9YGwALt7T757523G00VB7VRWts');
//                                sk_test_51NZNIsG92AHfGFaWrLLBCmkBSnQJwNJ6ML818FlBLOK7uSF7xhAMoHZTxXyXqXDaDw7pRgAv9YGwALt7T757523G00VB7VRWts


// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.get('/checkout-session', async (req, res) =>{

    str = req.query.id
     // (Optional) beautiful indented output.
console.log(str); // Logs output to dev tools console.

    let session = await stripe.checkout.sessions.retrieve(str, {
expand:['line_items']
    });
    console.log(session)
    console.log("subscription: "+ session.subscription)
    //  customer: 'cus_OMPYifEgutTn3T',

    //sub_1NZgjYG92AHfGFaWNdUUsHM5
    console.log("customer: "+session.customer)
    console.log("id:"+ session.id)
    var customer_email = session.customer_details.email
    console.log("email: "+ customer_email)
    var created =  session.created

    var expires = session.expires
    console.log(session.line_items.data)
    var price_id = session.line_items.data[0].price.id
    var payment_status = session.payment_status
    var status = session.status
    console.log("status: "+ status)
    console.log("price_id: "+ price_id)

    res.json(session)
})

app.post('/create-checkout-session', async (req, res)=> {
    
    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/success/?id={CHECKOUT_SESSION_ID}',
        cancel_url: "http://localhost:3000/cancel",
        line_items: [
          {price: 'price_1NZNlUG92AHfGFaWTk1l3uzt', quantity: 1}
        ],
        mode: 'subscription',
      });
      res.json({
        id:session.id,
      })
      

})

var server = app.listen(4242, function() {
    console.log('Listening on port %d', server.address().port);
  });