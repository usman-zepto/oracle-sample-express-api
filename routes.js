
'use strict';

const controller = require('./controller')

class Routes{
	constructor(app){
		this.app = app;
	}
	appRoutes(){
		this.app.get('/',async (req,res) =>{
			try{
				let data = await controller.manageactivities()
				res.json({success: true, message: "Data fetched successfully", data: data});
			}catch(error){
				console.log("inisde error");
				console.trace(error)
				res.json({success: false, message: "Error Occure", error: error});
			}
		});
		this.app.post('/',async (req,res) =>{
			try{
				let data = await controller.manageactivities(req.body)
				res.json({success: true, message: "Data fetched successfully", data: data});
			}catch(error){
				console.log("inisde error");
				console.trace(error)
				res.json({success: false, message: "Error Occure", error: error});
			}
		});
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;
