const stripe = require('stripe')('sk_test_gIQ602ORNg3CEg1Ji1fma4XS000ZzRt6IZ');
const planModel = require('../model/planModel');
const userModel = require('../model/userModel');

async function createSession(req, res) {
  // will take planId & userId and creates a session

  try {
    // retrive your plan and user
    let id = req.id; // protectRoute "req.id" bhejta hai
    let userId = id;
    let { planId } = req.body;

    const user = await userModel.findById(userId);
    const plan = await planModel.findById(planId);

    //  for creating session in stripe we've to use their variables only
    const session = await stripe.checkout.sessions.create({
      // from Stripe documentation
      payment_method_types: ['card'],
      customer_email: user.email,
      client_refernce_id: req.planId,
      line_items: [
        {
          name: plan.name,
          description: plan.description,
          amount: plan.price * 100,
          currency: 'usd',
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/profile',
      cancel_url: 'http://localhost:3000',
    });
    res.status(200).json({
      status: 'success',
      session,
    });
  } catch (err) {
    res.status(200).json({ err: err.message });
  }
}
module.exports.createSession = createSession;
