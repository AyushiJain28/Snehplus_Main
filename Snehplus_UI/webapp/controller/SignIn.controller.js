sap.ui.define(['sap/m/MessageToast',
	"sap/ui/core/mvc/Controller"
], function (MessageToast,Controller) {
	"use strict";
	var that;
	var category;
	return Controller.extend("Snehplus_UI.Snehplus_UI.controller.SignIn", {
		onInit: function () {
		that=this;
		},
		onNavBack: function(){
			that.getOwnerComponent().getRouter().navTo("MainPage");
		},
		onPress: function (oEvent) {
			if (oEvent.getSource().getPressed()) {
				category=oEvent.getSource().getText();
				if(category=="Supervisor"){
					this.getView().byId("button8").setEnabled(true);//button8=Supervisor Login
					this.getView().byId("button10").setEnabled(false);//button10=User
				}else{
					this.getView().byId("button6").setEnabled(true);//button6=User Login
					this.getView().byId("button9").setEnabled(false);//button9=Supervisor 
					this.getView().byId("button8").setEnabled(false);//button8=Supervisor Login
				}
			} else{
				category=oEvent.getSource().getText();
				if(category=="Supervisor"){
					this.getView().byId("button8").setEnabled(false);//button8=Supervisor Login
					this.getView().byId("button6").setEnabled(false);//button6=User Login
					this.getView().byId("button10").setEnabled(true);//button10=User
				}else{
					this.getView().byId("button8").setEnabled(false);//button8=Supervisor Login
					this.getView().byId("button6").setEnabled(false);//button6=User Login
					this.getView().byId("button9").setEnabled(true);//button9=Supervisor
				}
				
			}
		},
		onLogin: function (oEvent) {
			var UserId = this.getView().byId("userid").getValue();
			var Password =this.getView().byId("pasid").getValue();
			if(UserId!=="" && Password!=="" && category!==""){
				console.log(UserId+"---"+Password+"---"+category);
				var SignInCount= new sap.ui.model.json.JSONModel();
				var url = "/xsjs/GetSignInInfo.xsjs?UserId="+UserId + "&Password=" + Password + "&Category=" + category;
				SignInCount.loadData(url, null, false);
				var count=SignInCount.getData().records[0].VerifyCount;
				console.log(count);
				if(count==1){
						that.getOwnerComponent().getRouter().navTo(category);
				}else{
					MessageToast.show("Incorrect UserId or Password or category");
					var mylocation=location;
					mylocation.reload();
				}
				
			}else{
				MessageToast.show("Mandatory Fields Empty");
				var mylocation=location;
				mylocation.reload();
			}
			
		},
		action: function(oEvent) {
			//var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});
