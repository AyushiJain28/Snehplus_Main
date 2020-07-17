var query = 'select "ProductId","ProductName","Description","Partner","Quantity","UOM","QuantityUnit","Currency","Rate","Amount" from  "DB_SNEHPLUS_1"."Snehplus.DB_Snehplus::DbTables.ProductItemData"';
    var oConnection=$.db.getConnection();
    var oStatement=oConnection.prepareStatement(query);
    oStatement.execute();
    var oResultSet=oStatement.getResultSet();
    var data={};
    var result = {
        records : [ ] 
    }; 
    while (oResultSet.next()) { 
       	data = {
       		"ProductId":oResultSet.getString(1),
			"ProductName":oResultSet.getString(2),
			"Description":oResultSet.getString(3),
			"Partner":oResultSet.getString(4),
			"Quantity":oResultSet.getString(5),
			"UOM":oResultSet.getString(6),
			"QuantityUnit":oResultSet.getString(7),
			"Currency":oResultSet.getString(8),
			"Rate":oResultSet.getString(9),
			"Amount":oResultSet.getString(10)
		};
         result.records.push(data);
     }
    oResultSet.close(); 
    oStatement.close(); 
    oConnection.close(); 
    $.response.setBody(JSON.stringify(result)); 
    $.response.status = $.net.http.OK;
    $.response.contentType = "application/json; charset=UTF-8"; 
      