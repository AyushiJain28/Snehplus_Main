sap.ui.define(['sap/m/MessageToast',
	"sap/ui/core/mvc/Controller"
], function (MessageToast,Controller) {
	"use strict";
	var category, that;

	return Controller.extend("Snehplus_UI.Snehplus_UI.controller.SignUp", {
		onInit: function () {
			console.log("Inside onInit");
			that = this;
		},
		onNavBack: function(){
			that.getOwnerComponent().getRouter().navTo("MainPage");
		},
		onPress: function (oEvent) {
			if (oEvent.getSource().getPressed()) {
				category=oEvent.getSource().getText();
				console.log("on clicking"+category);
				if(category=="Supervisor"){
					this.getView().byId("button3").setEnabled(true);//button3=Supervisor SignUp
					this.getView().byId("button12").setEnabled(false);//button12=User
				}else{
					this.getView().byId("button7").setEnabled(true);//button7=User SignUp
					this.getView().byId("button11").setEnabled(false);//button11=Supervisor
					this.getView().byId("button3").setEnabled(false);//button3=Supervisor SignUp
				}
			} else{
				category=oEvent.getSource().getText();
				console.log("on disabling"+category);
				if(category=="Supervisor"){
					this.getView().byId("button3").setEnabled(false);//button3=Supervisor SignUp
					this.getView().byId("button7").setEnabled(false);//button7=User SignUp
					this.getView().byId("button12").setEnabled(true);//button12=User
				}else{
					this.getView().byId("button3").setEnabled(false);//button3=Supervisor SignUp
					this.getView().byId("button7").setEnabled(false);//button7=User SignUp
					this.getView().byId("button11").setEnabled(true);//button11=Supervisor
				}
				
			}
		},
		onSignUpPressed: function(oEvent){
			var FirstName =this.getView().byId("Nameid").getValue();
			var LastName =this.getView().byId("Nameid1").getValue();
			var UserId = this.getView().byId("userid").getValue();
			var Password =this.getView().byId("pasid").getValue();
			var Gmail=this.getView().byId("gmailid").getValue();
		
			if(FirstName!=="" && LastName!=="" && UserId!=="" && Password!=="" && Gmail!=="" && category!==""){
				console.log(UserId+"---"+Gmail+"---"+category);
				var SignUpCount= new sap.ui.model.json.JSONModel();
				var url = "/xsjs/GetSignUpCount.xsjs?UserId="+UserId + "&Category=" + category;
				SignUpCount.loadData(url, null, false);
				var count=SignUpCount.getData().records[0].UserIDCount;
				console.log(count);
				if(count==0){
					url = "/xsjs/InsertSignUpInfo.xsjs?FirstName=" + FirstName + "&LastName=" + LastName + "&UserId=" + UserId + "&Password=" + Password + "&Category=" + category + "&Gmail=" + Gmail;
					var signupdata= {
					 		"FirstName":FirstName,
					 		"LastName":LastName,
					 		"UserId":UserId,
					 		"Password":Password,
					 		"Gmail":Gmail,
					 		"Category":category
					
					 	};
					that.saveSignup(signupdata,url);
					
					
				}else{
					MessageToast.show("UserId Already Used");
					var mylocation=location;
					mylocation.reload();
				}
				
			}else{
				MessageToast.show("Mandatory Fields Empty");
				var mylocation=location;
				mylocation.reload();
			}
			
		},
	 saveSignup: function(signupdata, url){
		 	console.log(signupdata);
		 	console.log("in save signupdata");
		 	$.ajax({
					type: "POST",
					contentType: "application/json",
					async: true,
					url: url,
					data: JSON.stringify(signupdata),
					success: function (odata) {
						that.getOwnerComponent().getRouter().navTo(category);
					},
					error: function (errorThrown) {
						busyDialog.close();
						return errorThrown;
					}
			}); 
		 }
	});
});
