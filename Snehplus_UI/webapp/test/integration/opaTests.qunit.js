/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Snehplus_UI/Snehplus_UI/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});