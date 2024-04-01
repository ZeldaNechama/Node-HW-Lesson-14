const categoriesService = require('../services/categories.services');
const { Router } = require('express');
const app = Router();

app.get('/catrgories', async (req, res) => {

  try {
    const c = await categoriesService.getCategories();
    console.log(c);
    if (c) {
      res.send(c);
    }
    else {
      res.status(404).send("input issues");
    }


  }
  catch (error) {
    res.send('server is facing issues').status(500);
  }

});

app.get('/catrgories/:id', async (req, res) => {
  try {
    const id = req.params.id;
    //const categories=await getData();
    const catgory = await categoriesService.getCategoryById(id);
    console.log('category', catgory);
    if (catgory) {
      res.send(catgory);
    }
    else {
      res.status(404).send("input issues");
    }
  }
  catch (error) {
    res.status(500).send("The server is facing issues.........." + error);
  }

});

app.post('/catrgories', async (req, res) => {
  try {
    const catgory = req.body;
    if (!catgory) {
      console.error('error in post proudect, no catgory provided');
      return res.status(400).send('error in post catgory, no catgory provided');
    }

    const getcatgories = await categoriesService.createNewCategory(catgory);
    res.send(getcatgories);

  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }


});


app.delete('/catrgories/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const categories = await categoriesService.deleteCategoryById(id);
    if (categories) {
      res.send(categories);
    }
    else {
      res.status(404).send("problomes with sent data");
    }


  } catch (error) {
    res.status(500).send(error.message + "," + "the server is facing issues");

  }

});

app.put('/catrgories/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const category = req.body;
    if (!category || !id) {
      res.status(404).send("problomes with sent data");
    }
    else {
      const c = await categoriesService.updateCategory(id, category);
      res.status(200).send(c);

    }
  }
  catch (error) {
    res.status(500).send(error.message + "," + "the server is facing issues");
  }

});

module.exports = app;