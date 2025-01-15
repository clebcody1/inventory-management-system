const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: [true, "Book name is required"],
        minLength: [5, "Book name must be at least 5 characters long"],
        maxLength: [100, "Book name cannot exceed 100 characters"]
    },
    countInStock: {
        type: Number,
        required: [true, " stock count in stock is required"],
        min: [1, "Stock count cannot be less than 1"],
        max: [255, "Stock count cannot exceed 255"]
    },
    price: {
        required: [true, "Price is required"],
        type: Number,
        min: [1, "Price cannot be negative"],
        max: [10000, "Price cannot exceed $10,000"]
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        dafault: "",
        validate: {
            validator: function(v){
                if(!v) return true;
                return /^https?:\/\/.+/.test(v)
            },
            message: "Image must be a valid URL"
        }
    }
});

bookSchema.virtual("id").get(function(){
    return this._id.toHexString()
})
bookSchema.set("toJSON", {
    virtuals: true,
}) 

module.exports = mongoose.model("Book", bookSchema)