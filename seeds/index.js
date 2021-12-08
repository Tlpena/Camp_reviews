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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fad8bc73d599737bcb9547e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dyl1fnwkh/image/upload/v1605140773/YelpCamp/Feature_RightsofNature_inline2.jpg_abgvlh.jpg',
                    filename: 'Feature_RightsofNature_inline2.jpg_abgvlh'
                },
                {
                    url: 'https://res.cloudinary.com/dyl1fnwkh/image/upload/v1605140771/YelpCamp/Colombia01.jpg_jy4kai.jpg',
                    filename: 'Colombia01.jpg_jy4kai'
                },
                {
                    url: 'https://res.cloudinary.com/dyl1fnwkh/image/upload/v1605140771/YelpCamp/Independence-Lake-Clean-Drinking-Water_4000x2200.jpg_isvt8z.jpg',
                    filename: 'Independence-Lake-Clean-Drinking-Water_4000x2200.jpg_isvt8z'
                },
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})