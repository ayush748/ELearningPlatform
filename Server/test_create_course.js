require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/Category");

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB");
    
    let category = "Web Development";
    let categoryDetails = await Category.findOne({ name: { $regex: new RegExp(`^${category}$`, 'i') } });
    if (!categoryDetails) {
      console.log("Creating new category");
      categoryDetails = await Category.create({ name: category, description: category });
    }
    console.log("Category Details:", categoryDetails._id);

    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
          courses: new mongoose.Types.ObjectId(),
        },
      },
      { new: true }
    );
    console.log("Updated Category:", categoryDetails2);

    mongoose.disconnect();
  } catch (err) {
    console.error("ERROR OCCURRED:", err);
    mongoose.disconnect();
  }
}

test();
