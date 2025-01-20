import mongoose from 'mongoose';

const statusEnum = ["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"];

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name field is required"],
        minlength: 3,
        maxlength: 30,
        unique: true, 
        lowercase: true,
        trim: true,
    },
    price:{
        type: Number,
        required: [true, "Price field is required"],
        min: [0, "Price field has to be a number"],
    },
    profitRate: {
        type: Number,
        default: 1.21,
        min: [1, "Profit rate must be a grater than or equal to 1"],
    },

    description: {
        type: String,
        minlength: 5,
        maxlength: 100,
    },

    status: {
        type: String,
        quantity: Number,
        status: {
            type: String,
            validate: {
                validator: function (status){
                    return statusEnum.includes(status);
                },
                message: props => `${props.value} its not a valid status`,
            },
        },
    },

    category : { type: mongoose.Schema.Types.ObjectId, ref: "category"},
    
    Highlighted: {
        type: Boolean,
        default: false,
    },

    creationDate:{
        type: Date,
        default: Date.now(),
    },

    stock:{
        type: Number,
        default: 0,
    },
});

//La ejecuta automaticamente, entonces la incluimos donde necesitamos restar stock
productSchema.methods.decreaseStock = function (amount) {
    if (this.stock < amount){
        throw new Error("Not enough stock available");
    }
    this.stock -= amount;
    return this.save();
};


export default mongoose.model("product", productSchema);