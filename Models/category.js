class Catrgory 
{
    constructor(catrgoryId, catrgoryName) {
        this.catrgoryId = catrgoryId;
        this.catrgoryName = catrgoryName;
    }
    save(id,name){
        const category=new Catrgory(id,name);
        return category;
    }
}