const { Router } = require('express');
const app = Router();
const fsPromises = require('fs').promises;

const getData = async () => {
    try {

        const data = await fsPromises.readFile('./data/proudects.json');
        return JSON.parse(data);

    } catch (error) {
        console.error('Error reading data:', error.message);
    }
};
const updateData = async (data) => {
    try {
        await fsPromises.writeFile('./data/proudects.json', JSON.stringify(data));
    } catch (error) {
        console.error('Error writing data:', error.message);
    }
};

const getProudects = async () => {
    const prods = await getData();
    if (prods) {
        return prods;
    }
};

const getProudectById = async (id) => {
    const proudects = await getData();
    const prodect = proudects.filter(p => p.proudectId == id);
    if (prodect) {
        return prodect;
    }
};

const createNewProudect = async (proudect) => {
    if (proudect) {
        const getproudects = await getData() || [];
        getproudects.push(proudect);
        await updateData(getproudects);
        return proudect;
    }

};

// app.post('/proudects/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const theProudects = await getData();
//         const proudect = theProudects.map(p => p.proudectId == id);
//         if (proudect) {

//             await updateData(proudect);
//             res.send(proudect);

//         }
//         else {
//             res.status(404).send("problomes with sent data");
//         }


//     } catch (error) {
//         res.status(500).send(error.message + "," + "the server is facing issues")

//     }

// });

const updateProudect = async (id, proudect) => {
    const prods = await getData();

    if (id || proudect) {
        const p = prods.map(p => p.proudectId == id);
        Object.assign(p, proudect);
        updateData(prods);
    }

};

const deleteProudect = async (id) => {
    const getproudects = await getData();

    if (getproudects) {
        const index = getproudects.findIndex(m => m.id === id);
        getproudects.splice(index, 1);
        await updateData(getproudects);
        return index;

    }
};

module.exports = {
    getProudects, getProudectById, createNewProudect, updateProudect, deleteProudect
};