const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Lütfen ürün adını giriniz."],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Lütfen ürün açıklamasını giriniz."]
    },
    price: {
        type: Number,
        required: [true, "Lütfen ürün fiyatını giriniz."],
        maxLenght: [8, "Fiyat 8 karakterden fazla olamaz"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Lütfen ürün kategorisini giriniz."],
    },
    Stock: {
        type: Number,
        required: [true, "Lütfen ürünün stok miktarını giriniz."],
        maxLenght: [4, "Stok 4 karakterden fazla girilemez."],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Product", productSchema);