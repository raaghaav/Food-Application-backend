const planModel = require('../model/planModel');

// getplan
async function getPlan(req, res) {
  try {
    const { planId } = req.params; // taking out plan of particular "planId" from req.params
    const plan = await planModel.findById(planId); // finding plan in planModel for fetched planId
    res.status(200).json({
      status: `result for ${planId}`,
      plan,
    });
  } catch (err) {
    res.json({
      err,
    });
  }
}

// getAllPlans
async function getAllPlans(req, res) {
  try {
    const plans = await planModel.find(); // find() gives arr of plans, gives all the plans from planModel
    res.status(200).json({
      status: 'successfull',
      plans,
    });
  } catch (err) {
    res.status(200).json({
      err,
    });
  }
}

// createPlan
async function createPlan(req, res) {
  try {
    const plan = await planModel.create(req.body); // created a plan in req.body
    res.status(201).json({ status: 'New Plan Created', plan });
  } catch (err) {
    res.status(404).json({ err: err.message });
    console.log(err);
  }
}

// updatePlan
async function updatePlan(req, res) {
  try {
    const planId = req.params.planId; // req.params se plan of this particular planId nikali , plan nikal liya jisko update karna hai
    const tobeUpdatedData = req.body; // jo bhi data update karna hai uss plan ka wo daal diya req.body main
    const oldPlan = await planModel.findById(planId); // finding oldPlan in planModel for fetched planId
    const keys = Object.keys(tobeUpdatedData); //Object.keys() =>return the arr whose elements are strings corresponding to the enumerable properties found directly upon the object.
    for (key in keys) {
      oldPlan[key] = tobeUpdatedData[key]; // oldPlan ki "key" ko update kar diya => jo bhi "key" update karni hai tobeUpdatedData ki
      // i.e whenever both "key"(not value) of oldPlan & tobeUpdatedData matches we update the key "value" of oldPlan with tobeUpdatedData
    }
    await oldPlan.save(); // oldPlan ko save kar diya with updation
    res.status(200).json({
      status: 'PlanUpdated',
    });
  } catch (err) {
    res.status(200).json({ err });
  }
}

// deletePlan
async function removePlan(req, res) {
  try {
    const { planId } = req.params; // taking out plan of particular planId from req.params
    const deletedPlan = await planModel.findByIdAndDelete(planId);
    res.json({
      data: deletedPlan,
      status: 'successfull',
    });
  } catch (err) {
    res.status(400).json({ err });
  }
}

module.exports.getAllPlans = getAllPlans;
module.exports.getPlan = getPlan;
module.exports.createPlan = createPlan;
module.exports.updatePlan = updatePlan;
module.exports.removePlan = removePlan;
