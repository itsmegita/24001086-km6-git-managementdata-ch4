const router = require("express").Router();

const Car = require("../controllers/carController");

router.route("/").get(Car.allCarsData).post(Car.createCar);

router
  .route("/:id")
  .get(Car.carDataById)
  .patch(Car.updateCarData)
  .delete(Car.deleteCarData);

module.exports = router;
