var UserId = $.request.parameters.get('UserId');
var Category = $.request.parameters.get('Category');
//var UserId = "jain.ay5";
//var Category="User";
var query = 'SELECT COUNT(*) FROM "DB_SNEHPLUS_1"."Snehplus.DB_Snehplus::DbTables.SignUpInfo" WHERE "UserId"=? AND "Category"=?';
var oConnection = $.db.getConnection();
var oStatement = oConnection.prepareStatement(query);
oStatement.setString(1,UserId);
oStatement.setString(2,Category);
oStatement.execute();
var oResultSet = oStatement.getResultSet();
var data = {};
var result = {
	records: []
};
while (oResultSet.next()) {
	data = {
		"UserIDCount": oResultSet.getString(1)
	};
	result.records.push(data);
}

oResultSet.close();
oStatement.close();
oConnection.close();
$.response.setBody(JSON.stringify(result)); 
$.response.status = $.net.http.OK;
$.response.contentType = "application/json; charset=UTF-8"; 