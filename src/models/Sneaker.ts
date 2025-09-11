import { Schema, model, models } from "mongoose";

const SneakerSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
        brand: { type: String, required: true },
        gender: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        is_in_inventory: { type: Boolean, required: true },
        items_left: { type: Number, required: true },
        sizes: { type: [String], default: [] },
        colors: { type: [String], default: [] },
        rating: { type: Number },
        reviews_count: { type: Number },
        description: { type: String },
        imageURL: { type: String, required: true },
        slug: { type: String, required: true, index: true },
    },
    { timestamps: true }
);

const Sneaker = models.Sneaker || model("Sneaker", SneakerSchema);
export default Sneaker;


