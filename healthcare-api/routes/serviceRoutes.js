// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// Add a new service
router.post('/services', async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const service = new Service({ name, description, price });
    await service.save();
    res.status(201).send(service);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).send(services);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Update a service
router.put('/services/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const service = await Service.findByIdAndUpdate(id, { name, description, price }, { new: true });
    if (!service) {
      return res.status(404).send('Service not found');
    }
    res.status(200).send(service);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Delete a service
router.delete('/services/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).send('Service not found');
    }
    res.status(200).send('Service deleted');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
