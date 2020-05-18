const express = require('express');
const planRouter = express.Router();

const {
  getAllPlans,
  getPlan,
  deletePlan,
  createPlan,
  updatePlan,
} = require('../controller/planController');
const { protectRoute, isAuthorized } = require('../controller/authController');
planRouter
  .route('')
  .get(getAllPlans)
  .post(protectRoute, isAuthorized(['admin', 'resturant owner']), createPlan); // isAuthorized main fn call pass kari hai, not fn b/c => generic fn => used as a common fn

planRouter
  .route('/:planId')
  .get(getPlan)
  .patch(updatePlan)
  .delete(protectRoute, isAuthorized(['admin']), deletePlan);

module.exports = planRouter;

// server => request => getplan, removplan etc   jo actual fns hai in controllers they execute when req comes
// As server start => route fns like get,post  pehle hi chal jayenge but
