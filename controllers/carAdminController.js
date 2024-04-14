const imageKit = require("../lib/imagekit");
const { Car } = require("../models");

const carPage = async (req, res) => {
  try {
    let cars;
    const { size } = req.query;

    if (size) {
      cars = await Car.findAll({ where: { size } });
    } else {
      cars = await Car.findAll();
    }

    res.render("cars/index.ejs", {
      cars,
      message: req.flash("message", ""),
      alertType: req.flash("alertType"),
    });
  } catch (err) {
    res.render("error.ejs", {
      message: err.message,
    });
  }
};

const createCarPage = async (req, res) => {
  try {
    res.render("cars/create.ejs");
  } catch (err) {
    res.render("error.ejs", {
      message: err.message,
    });
  }
};

const createCar = async (req, res) => {
  const { name, rentPerDay, size } = req.body;
  const file = req.file;

  const split = file.originalname.split(".");
  const extension = split[split.length - 1];

  try {
    const img = await imageKit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });

    await Car.create({
      name,
      rentPerDay,
      size,
      photo: img.url,
    });

    req.flash("message", "Ditambah");
    req.flash("alertType", "success");
    res.redirect("/cars");
  } catch (err) {
    res.render("error.ejs", {
      message: err.message,
    });
  }
};

const editCarPage = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);

    res.render("cars/edit.ejs", {
      car,
    });
  } catch (err) {
    res.render("error.ejs", {
      message: err.message,
    });
  }
};

const editCar = async (req, res) => {
  const { name, rentPerDay, size } = req.body;
  const file = req.file;

  try {
    let updatedCarData = {};

    if (name) {
      updatedCarData.name = name;
    }
    if (rentPerDay !== "") {
      updatedCarData.rentPerDay = rentPerDay;
    }
    if (size) {
      updatedCarData.size = size;
    }
    if (file) {
      const split = file.originalname.split(".");
      const extension = split[split.length - 1];
      const img = await imageKit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      updatedCarData.photo = img.url;
    }

    await Car.update(updatedCarData, {
      where: {
        id: req.params.id,
      },
    });

    req.flash("message", "Disimpan");
    req.flash("alertType", "success");
    res.redirect("/cars");
  } catch (err) {
    res.render("error.ejs", {
      message: err.message,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    req.flash("message", "dihapus");
    req.flash("alertType", "dark");
    res.redirect("/cars");
  } catch (err) {
    res.render("error.ejs", {
      message: err.message,
    });
  }
};

module.exports = {
  carPage,
  createCarPage,
  createCar,
  editCarPage,
  editCar,
  deleteCar,
};
