const planModel = require('../model/planModel');
const factory = require("../utility/factory");
// const QueryHelper = require("../utility/utilityfns");


module.exports.getPlan = factory.getElement(planModel);
module.exports.getAllPlans = factory.getAllElement(planModel);
module.exports.updatePlan = factory.updateElement(planModel);
module.exports.deletePlan = factory.deleteElement(planModel);
module.exports.createPlan = factory.createElement(planModel);


// getplan
// async function getPlan(req, res) {
//   try {
//     const { planId } = req.params; // taking out plan of particular "planId" from req.params
//     const plan = await planModel.findById(planId); // finding plan in planModel for fetched planId
//     res.status(200).json({
//       status: `result for ${planId}`,
//       plan,
//     });
//   } catch (err) {
//     res.json({
//       err,
//     });
//   }
// }

/*  some concepts 
    console.log(req.query);
    sort ,select,limit ,page
    
     let myQuery = req.query;
    let myQuery = { ...req.query }; "..." gives value not address
    
  
    let toExcludeFields = ["sort", "select", "limit", "page"] => none of these entries are in my db 
    for (let i = 0; i < toExcludeFields.length; i++) {
      delete myQuery[toExcludeFields[i]];

       console.log(req.query.sort);


     let AllPlansPromise = planModel.find(myQuery)
      "ratingAverage -price"  => "-" desending order 

     if (req.query.sort) {
       let sortString = req.query.sort.split("%").join(" "); => spliting on basis of "%" & joining 
       console.log(sortString)
       AllPlansPromise = AllPlansPromise.sort(sortString);
     }
      select("name%duration") => "name%duration" name,duration 
     if (req.query.select) {
       let selectString = req.query.select.split("%").join(" ");
       AllPlansPromise = AllPlansPromise.select(selectString);
     }
      pagination
      limit skip 
      page number 
     let page = Number(req.query.page) || 1;  => Number b/c res comes in string form and we convert it into Number 
     let limit = Number(req.query.limit) || 4;
     const toSkip = limit * (page - 1);   => if we want to skip  
      
     AllPromise = AllPlansPromise.skip(toSkip).limit(limit);

    let willGetAllPlansPromise = new QueryHelper(planModel.find(), req.query);
    let filteredPlans =  willGetAllPlansPromise.filter().sort().select().paginate();  "req.query" ke acc filter,sort,select etc hoyega
   let finalans=await filteredPlans.query;
    res.status(200).json({
      status: "all plans recieved",
      data: finalans,
    });
  } catch (err) {
  }
// };
*/

// async function getAllPlans(req, res) {
//   try {
//     const plans = await planModel.find(); // find() gives arr of plans, gives all the plans from planModel
//     res.status(200).json({
//       status: 'successfull',
//       plans,
//     });
//   } catch (err) {
//     res.status(200).json({
//       err,
//     });
//   }
// }

// // createPlan
// async function createPlan(req, res) {
//   try {
//     const plan = await planModel.create(req.body); // created a plan in req.body
//     res.status(201).json({ status: 'New Plan Created', plan });
//   } catch (err) {
//     res.status(404).json({ err: err.message });
//     console.log(err);
//   }
// }

// // updatePlan
// async function updatePlan(req, res) {
//   try {
//     const planId = req.params.planId; // req.params se plan of this particular planId nikali , plan nikal liya jisko update karna hai
//     const tobeUpdatedData = req.body; // jo bhi data update karna hai uss plan ka wo daal diya req.body main
//     const oldPlan = await planModel.findById(planId); // finding oldPlan in planModel for fetched planId
//     const keys = Object.keys(tobeUpdatedData); //Object.keys() =>return the arr whose elements are strings corresponding to the enumerable properties found directly upon the object.
//     for (key in keys) {
//       oldPlan[key] = tobeUpdatedData[key]; // oldPlan ki "key" ko update kar diya => jo bhi "key" update karni hai tobeUpdatedData ki
//       // i.e whenever both "key"(not value) of oldPlan & tobeUpdatedData matches we update the key "value" of oldPlan with tobeUpdatedData
//     }
//     await oldPlan.save(); // oldPlan ko save kar diya with updation
//     res.status(200).json({
//       status: 'PlanUpdated',
//     });
//   } catch (err) {
//     res.status(200).json({ err });
//   }
// }

// // deletePlan
// async function removePlan(req, res) {
//   try {
//     const { planId } = req.params; // taking out plan of particular planId from req.params
//     const deletedPlan = await planModel.findByIdAndDelete(planId);
//     res.json({
//       data: deletedPlan,
//       status: 'successfull',
//     });
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// }

// module.exports.getAllPlans = getAllPlans;
// module.exports.getPlan = getPlan;
// module.exports.createPlan = createPlan;
// module.exports.updatePlan = updatePlan;
// module.exports.removePlan = removePlan;


