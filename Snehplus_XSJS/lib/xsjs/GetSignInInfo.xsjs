var UserId = $.request.parameters.get('UserId');
var Password = $.request.parameters.get('Password');
var Category = $.request.parameters.get('Category');
//var UserId = "ayushi2812";
//var Password="ayushijain";
//var Category="User";
var query = 'SELECT COUNT(*) FROM "DB_SNEHPLUS_1"."Snehplus.DB_Snehplus::DbTables.SignUpInfo" WHERE "UserId"=? AND "Password"=? AND "Category"=?';
var oConnection = $.db.getConnection();
var oStatement = oConnection.prepareStatement(query);
oStatement.setString(1,UserId);
oStatement.setString(2,Password);
oStatement.setString(3,Category);
oStatement.execute();
var oResultSet = oStatement.getResultSet();
var data = {};
var result = {
	records: []
};
while (oResultSet.next()) {
	data = {
		"VerifyCount": oResultSet.getString(1)
	};
	result.records.push(data);
}

oResultSet.close();
oStatement.close();
oConnection.close();
$.response.setBody(JSON.stringify(result)); 
$.response.status = $.net.http.OK;
$.response.contentType = "application/json; charset=UTF-8"; 