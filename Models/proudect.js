class Proudect
{
    constructor(proudectId,catrgory,name,amount){
        this.proudectId=proudectId;
        this.catrgory=catrgory;
        this.name=name;
        this.amount=amount;

    }

    save(id_,category_,name_,amount_)
    {
        const proudect=new Proudect(id_,category_,name_,amount_)
        return proudect;
    }
}