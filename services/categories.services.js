// const categoriesController=require('../controllers/catrgories.controllers');

const { Router } = require('express');
const app = Router();

const fsPromises = require('fs').promises;



const getData = async () => {
    try {
        const data = await fsPromises.readFile('./data/categories.json');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error.message);
    }
};
const updateData = async (data) => {
    try {
        await fsPromises.writeFile('./data/categories.json', JSON.stringify(data));
    }
    catch (error) {
        console.error('Error writing data:', error.message);
    }
}


const getCategories = async () => {
    const data = await getData();

    if (data) {
        return data;
    }
}

const getCategoryById = async (id) => {
    const categories = await getData();
    const catgory = categories.filter(c => c.categoryId == id);
    console.log('category', catgory);
    if (catgory)
        return catgory;

}

const createNewCategory = async (category) => {
    if (category) {
        const getcatgories = await getData() || [];
        getcatgories.push(category);
        updateData(getcatgories);
        return category;

    }

}
const deleteCategoryById = async (id) => {
    const getCategories = await getData();
    const categories = getCategories.filter(c => c.categoryId != id);
    if (categories) {
        console.log('categories', categories);
        await updateData(categories);

        return categories;
    }
}

const updateCategory = async(id, category) => {

    const categoriess = await getData();
    if (id && category) {
        const c = categoriess.filter(c => c.categoryId == id);
        Object.assign(c, category);
        await updateData(categoriess);
    }
}


module.exports = {
    getCategories,
    getCategoryById,
    createNewCategory,
    deleteCategoryById,
    updateCategory
}