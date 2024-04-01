// const mongoose = require("mongoose");
// const mongoDB = "mongodb://127.0.0.1/my_database";
// const Schema=mongoose.Schema;
// mongoose.set("strictQuery", false);
// const connectToDB = async () => {
//     try {
//         await mongoose.connect(mongoDB);
//     } catch (error) {
//         console.log(error);
//     }
// };
// await connectToDB();
// const tryModelSchema=new Schema(
//     {
//         name:String,
//         id:Number
//     }
// );

// const TryModel = mongoose.model("tryModelSchema", tryModelSchema);
// const instenceTryModel=new TryModel({name:"try",id:1});
// await instenceTryModel.save();
// await TryModel.create({id:2,name:"Try2"});
// console.log(instenceTryModel.name);
// const usernamamomgodb="6xDt2ZKX9MD0pNvx";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("zeldanechama").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("mongodb+srv://zeldanechama:6xDt2ZKX9MD0pNvx@cluster0.w02o9aw.mongodb.net/local_libarty?retryWrites=true&w=majority&appName=Cluster0").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);


