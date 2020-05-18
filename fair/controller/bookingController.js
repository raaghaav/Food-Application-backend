let SK = process.env.SK || require('../configs/config').SK;
const stripe = require('stripe')(SK);
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
      ], // when deployed these are the updated urls
      success_url: `${req.protocol}://${req.get('host')}/profile`,
      cancel_url: `${req.protocol}://${req.get('host')}/profile`,
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
