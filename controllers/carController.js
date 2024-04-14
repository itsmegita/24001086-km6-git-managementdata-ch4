const { Car } = require("../models");

const createCar = async (req, res) => {
  const { name, rentPerDay, size, photo } = req.body;

  try {
    const newCar = await Car.create({
      name,
      rentPerDay,
      size,
      photo,
    });

    res.status(200).json({
      status: "success",
      data: {
        newCar,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

const allCarsData = async (req, res) => {
  try {
    const cars = await Car.findAll();

    res.status(200).json({
      status: "success",
      totalData: cars.length,
      data: {
        cars,
      },
      requestAt: req.requestTime,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const carDataById = async (req, res) => {
  try {
    const id = await req.params.id;
    const cars = await Car.findOne({
      where: {
        id,
      },
    });

    if (!cars) throw new Error(`ID ${id} is not exist. Try another one!`);

    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateCarData = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, rentPerDay, size, photo } = req.body;

    const cars = await Car.findOne({
      where: { id: id },
    });

    if (!cars) throw new Error(`Cannot find ID : ${id}. Try something else`);

    await Car.update(
      {
        name,
        rentPerDay,
        size,
        photo,
      },
      {
        where: { id: id },
      }
    );

    const updatedCar = await Car.findOne({
      where: { id: id },
    });

    res.status(200).json({
      status: "success",
      message: "Data update successfully",
      data: updatedCar,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteCarData = async (req, res) => {
  try {
    const id = req.params.id;

    await Car.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data is deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  createCar,
  allCarsData,
  carDataById,
  updateCarData,
  deleteCarData,
};
