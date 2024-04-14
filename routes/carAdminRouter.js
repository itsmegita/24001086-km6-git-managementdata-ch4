const router = require("express").Router();
const CarAdmin = require("../controllers/carAdminController");

const upload = require("../middlewares/upload");

router.route("/").get(CarAdmin.carPage);

router
  .route("/create")
  .get(CarAdmin.createCarPage)
  .post(upload.single("photo"), CarAdmin.createCar);

router
  .route("/admin/edit/:id")
  .get(CarAdmin.editCarPage)
  .post(upload.single("photo"), CarAdmin.editCar);

router.route("/admin/delete/:id").post(CarAdmin.deleteCar);

module.exports = router;
