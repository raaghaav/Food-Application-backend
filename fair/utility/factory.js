const QueryHelper = require('../utility/utilityfns');
const ErrorExtender = require('../utility/ErrorExtender');

module.exports.createElement = function (ElementModel) {
  return async function create(req, res,next) {
    const recievedElement = req.body;
    try {
      let createdElement = await ElementModel.create(recievedElement);
      // send success response to client
      res.status(201).json({
        status: ' success',
        data: createdElement,
      });
    } catch (err) {
      next(new Error('Element could not be found'));
      return;
    }
  };
};

module.exports.getAllElement = function (ElementModel) {
  return async function getAll(req, res,next) {
    try {
      //
      let willGetAllElementsPromise = new QueryHelper(
        ElementModel.find(),
        req.query
      );
      // pageElements = filteredElements.slice(toSkip, toSkip + limit);
      let filteredElements = willGetAllElementsPromise
        .filter()
        .sort()
        .select()
        .paginate();
      let finalans = await filteredElements.query;
      res.status(200).json({
        status: 'all Elements recieved',
        data: finalans,
      });
    } catch (err) {
      next(new Error('Element could not be found'));
      return;
    }
  };
};

module.exports.getElement = function (ElementModel) {
  return async function get(req, res, next) {
    try {
      const { id } = req.params; //// recieve id through params
      const Element = await ElementModel.findById(id);
      if (!Element) {
        return next(new ErrorExtender('Element not found', 404));
      }
      res.json({
        status: 'successfull',
        data: Element,
      });
    } catch (err) {
      next(new Error('Element could not be found'));
      return;
    }
  };
};

module.exports.updateElement = function (ElementModel) {
  return async function update(req, res, next) {
    //  identifier => Element
    // const originalElement = Elements[id - 1];
    //fields to be updated in ur Element
    try {
      const id = req.params.id;
      const toupdateData = req.body;
      // mdb=> express server
      const originalElement = await ElementModel.findById(id);
      if (!originalElement) {
        return next(new ErrorExtender('Element not found', 404));
      }

      const keys = [];
      for (let key in toupdateData) {
        keys.push(key);
      }
      // express server => modify
      for (let i = 0; i < keys.length; i++) {
        originalElement[keys[i]] = toupdateData[keys[i]];
      }
      // express server=> modified=> mdb
      const updatedElement = await originalElement.save();
      // fs.writeFileSync("./data/Elements.json", JSON.stringify(Elements));
      // db********************************************************
      // update DB update =>old Element return
      res.status(200).json({
        status: 'update request recieved',
        Element: updatedElement,
      });
    } catch (err) {
      console.log(err);
      next(new Error('Element could not be updated'));
      return;
    }
  };
};

module.exports.deleteElement = function (ElementModel) {
  return async function (req, res, next) {
    try {
      const id = req.params.id;
      const Element = await ElementModel.finByIdAndDelete(id);
      if (!Element) {
        return next(new ErrorExtender('Element not found', 404));
      }
      res.status(200).json({
        status: 'Element Deleted',
        Element: Element,
      });
    } catch (err) {
      new Error('Element could not be deleted');
      return;
    }
  };
};
