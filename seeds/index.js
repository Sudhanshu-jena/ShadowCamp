const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '602bb800cbb6802ce473eee7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dt3smgdxl/image/upload/v1613709338/YelpCamp/apat0yjo6zwkaj6hhhh9.jpg',
                    filename: 'YelpCamp/apat0yjo6zwkaj6hhhh9'
                },
                {
                    url: 'https://res.cloudinary.com/dt3smgdxl/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1613709345/YelpCamp/o5gkwbehqrifsxrqsgmh.jpg',
                    filename: 'YelpCamp/o5gkwbehqrifsxrqsgmh'
                },
                
                {
                    url: 'https://res.cloudinary.com/dt3smgdxl/image/upload/v1613709349/YelpCamp/xxwqze64vsqtaug4zfyr.jpg',
                    filename: 'YelpCamp/xxwqze64vsqtaug4zfyr'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})