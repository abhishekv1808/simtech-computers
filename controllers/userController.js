exports.getHome = (req,res,next)=>{
    res.render('../views/user/home',{pageTitle:'Home'});

}

exports.getLaptops = (req,res,next)=>{
    res.render('../views/user/laptops',{pageTitle:'Laptops'});
}