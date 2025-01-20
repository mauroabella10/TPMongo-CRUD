import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20,
        minLength: 2,
        trim: true,
        lowerCase: true,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 20,
        minLength: 2,
        trim: true,
        lowerCase: true,
    },
    email: {
        type: String,
        required: true,
        maxLength: 40,
        minLength: 7,
        trim: true,
        lowerCase: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        max: 116,
        min: 17,
    },
    registrationDate: {
        type: Date,
        default: Date.now(),
    },
    password: {
        type: String,
        validate: {
            validator: function (value) {
                return value;
            },
            message: "La contraseña debe tener entre 6 y 12 caracteres, por lo menos un digito numerico, una letra minuscula y una letra mayuscula",
        },
    },
});

userSchema.pre("save", async function (next) {
    try {
        //encritamos la password antes de guardar
        this.password = await bcrypt.hashSync(this.password, 10);
        next()
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

export default mongoose.model("user", userSchema);

