sap.ui.define(["sap/m/Dialog","sap/m/Button","sap/m/library","sap/m/Text",
	"sap/ui/core/mvc/Controller"
], function (Dialog,Button,mobileLibrary,Text,Controller) {
	"use strict";
	var that;
	var ButtonType = mobileLibrary.ButtonType;
	return Controller.extend("Snehplus_UI.Snehplus_UI.controller.Supervisor", {
		onInit: function () {
			that=this;
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
