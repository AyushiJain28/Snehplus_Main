sap.ui.define(["sap/m/Dialog","sap/m/Button","sap/m/library","sap/m/Text",'sap/ui/model/json/JSONModel','sap/m/MessageToast',
	"sap/ui/core/mvc/Controller"
], function (Dialog,Button,mobileLibrary,Text,JSONModel,MessageToast,Controller) {
	"use strict";
	var that;
	var oProductModel;
	var rate;
	var ButtonType = mobileLibrary.ButtonType;
	return Controller.extend("Snehplus_UI.Snehplus_UI.controller.User", {
		onInit: function () {
			that = this;
			oProductModel = new sap.ui.model.json.JSONModel();
			var url = "/xsjs/GetProductItemInfo.xsjs";
			oProductModel.loadData(url, null, false);
			//var length=oProductModel.getData().records.length;
			//console.log(length);
			this.getView().byId("UserTableId").setModel(oProductModel);
			//console.log(oProductModel.getData().records);
			var oModel,
			
			aData = [{value:1}];
			oModel = new JSONModel({
				modelData: aData
			});
			this.getView().byId("QuantityunitID").setModel(oModel);	
		
		},
		
	/*	onChange: function(oEvent){
			MessageToast.show("Value changed to '" + oEvent.getParameter("value") + "'");
		},*/
		fnRowSelectionChangeSO: function() {
			var ProductTable = this.getView().byId("UserTableId");
			var	oSelectedIndexSO = ProductTable.getSelectedIndex();
			var oTableSOModel = ProductTable.getModel();
			rate = oTableSOModel.getProperty("Rate", ProductTable.getContextByIndex(oSelectedIndexSO));
			
		},
		onNavBack: function(){
			var oDialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({ text: 'Are you sure you want to Logout?' }),
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Logout',
					press: function () {
						that.getOwnerComponent().getRouter().navTo("SignIn");
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						oDialog.close();
					}
				}),
				afterClose: function () {
					oDialog.destroy();
				}
			});

			oDialog.open();
			
		}
	});
});
