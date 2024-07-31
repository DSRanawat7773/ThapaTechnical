const Service = require("../models/service_models");

const services = async (req, res) => {
  try {
    const response = await Service.find();

    if (response.length === 0) {
      return res.status(404).json({ msg: "No services found" });
    }

    res.status(200).json({ services: response });
  } catch (error) {
    console.error(`services: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { services };
