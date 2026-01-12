exports.getHome = (req,res,next)=>{
    res.render('../views/user/home',{pageTitle:'Home'});

}

exports.getLaptops = (req,res,next)=>{
    res.render('../views/user/laptops',{pageTitle:'Laptops'});
}

exports.getStoreLocator = (req,res,next)=>{
    res.render('../views/user/store-locator',{pageTitle:'Stores'});
}

exports.getAboutUs = (req,res,next)=>{
    res.render('../views/user/aboutUs',{pageTitle:'About Us'});
}