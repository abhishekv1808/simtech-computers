const Laptop = require('../models/laptop');

exports.getHome = async (req,res,next)=>{
    try {
        const laptops = await Laptop.find(); // Fetch all (or we could limit/filter here)
        res.render('../views/user/home',{
            pageTitle:'Home',
            laptops: laptops
        });
    } catch (err) {
        console.log(err);
        res.render('../views/user/home',{
            pageTitle:'Home',
            laptops: []
        });
    }
}

exports.getLaptops = async (req,res,next)=>{
    try {
        const laptops = await Laptop.find();
        res.render('../views/user/laptops',{
            pageTitle:'Laptops',
            laptops: laptops
        });
    } catch (err) {
        console.log(err);
        // Handle error (maybe redirect to 500 page or just home)
        res.redirect('/');
    }
}

exports.getStoreLocator = (req,res,next)=>{
    res.render('../views/user/store-locator',{pageTitle:'Stores'});
}

exports.getAboutUs = (req,res,next)=>{
    res.render('../views/user/aboutUs',{pageTitle:'About Us'});
}

exports.getContactUs = (req,res,next)=>{
    res.render('../views/user/contact-us',{pageTitle:'Contact Us'});
}

exports.getLaptopsByBrand = async (req, res, next) => {
    const brandName = req.params.brandName;
    try {
        // Case insensitive search for brand
        const laptops = await Laptop.find({ 
            brand: { $regex: new RegExp("^" + brandName + "$", "i") } 
        });
        
        res.render('../views/user/brand-laptops', {
            pageTitle: `${brandName} Laptops`,
            laptops: laptops,
            brandName: brandName
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

exports.getProductDetail = async (req, res, next) => {
    try {
        const laptopId = req.params.id;
        const laptop = await Laptop.findById(laptopId);
        
        if (!laptop) {
            return res.redirect('/');
        }
        
        // Find similar laptops (same brand or category, excluding current)
        const similarLaptops = await Laptop.find({
            _id: { $ne: laptopId },
            $or: [
                { brand: laptop.brand },
                { category: laptop.category }
            ]
        }).limit(4);

        const discount = laptop.mrp - laptop.price;
        const discountPercent = Math.round((discount / laptop.mrp) * 100);

        res.render('../views/user/product-detail', {
            pageTitle: `${laptop.brand} ${laptop.model}`,
            laptop: laptop,
            similarLaptops: similarLaptops,
            discount: discount,
            discountPercent: discountPercent
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

exports.getSmartphones = async (req,res,next)=>{
    try {
        const smartphones = await Laptop.find({ category: 'smartphone' });
        res.render('../views/user/smartphones',{
            pageTitle:'Smartphones',
            smartphones: smartphones
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
}