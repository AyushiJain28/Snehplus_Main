/*global QUnit*/

sap.ui.define([
	"Snehplus_UI/Snehplus_UI/controller/Application.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Application Controller");

	QUnit.test("I should test the Application controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});