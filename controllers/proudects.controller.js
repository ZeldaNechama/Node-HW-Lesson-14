const { Router } = require('express');
const proudectService=require('../services/proudects.services');
const app = Router();

app.get('/proudects', async (req, res) => {

  try {
    const prods = await proudectService.getProudects;
    if (prods) {
      res.send(prods);
    }

    else {
      res.status(404).send("input issues");
    }


  }
  catch (error) {
    res.status(500).send('server is facing issues' + error);
  }

});

app.get('/proudects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const proudect = await proudectService.getProudectById(id);
    if (proudect) {
      console.log(JSON.stringify(prodect));
      res.send(proudect);
    }
    else {
      res.status(404).send("input issues");
    }
  }
  catch (error) {
    res.status(500).send("The server is facing issues..........");
  }

});

app.post('/proudects', async (req, res) => {


  try {;
    const proudect = req.body;
    if (!proudect) {
      console.error('error in post proudect, no proudect provided');
      return res.status(400).send('error in post proudect, no proudect provided');
    }

    const getproudect = await proudectService.createNewProudect(proudect)
    res.send(getproudect);

  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }


});

app.post('/proudects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const theProudects = await getData();
    const proudect = theProudects.map(p => p.proudectId == id);
    if (proudect) {

      await updateData(proudect);
      res.send(proudect);

    }
    else {
      res.status(404).send("problomes with sent data");
    }


  } catch (error) {
    res.status(500).send(error.message + "," + "the server is facing issues")

  }

});

app.put('/proudects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { proudect } = req.body;
  

    if (!id || !proudect) {
      res.status(404).send("invailed data");
    }
    else {
      await proudectService.updateProudect(id,proudect);
    }
  }
  catch (error) {
    res.status(500).send(error.message);

  }

});
app.delete('/proudects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    if (getproudects) {
      const index = await proudectService.deleteProudect(id);
      res.send(index);
    }
    else {
      res.status(404).send("problomes with input data.");

    }

  }
  catch (error) {

    res.status(500).send(error.message);
  }

});

module.exports = app;