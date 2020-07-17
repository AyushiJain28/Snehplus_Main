var FirstName = $.request.parameters.get('FirstName');
var LastName = $.request.parameters.get('LastName');
var Category = $.request.parameters.get('Category');
var UserId = $.request.parameters.get('UserId');
var Password = $.request.parameters.get('Password');
var Gmail = $.request.parameters.get('Gmail');
console.log(FirstName+LastName+Category+UserId+Password+Gmail)
//var FirstName ="Ayushi";
//var LastName ="Jain";
//var Category = "Supervisor";
//var UserId = "ayushi2812";
//var Password ="ayushijain2812";
//var Gmail="jain.ayu995@gmail.com";
var query = 'Insert into "DB_SNEHPLUS_1"."Snehplus.DB_Snehplus::DbTables.SignUpInfo" ("FirstName","LastName","Category","UserId","Password","Gmail") values(?,?,?,?,?,?)';
var oConnection = $.db.getConnection();
var oInsrtStatement = oConnection.prepareStatement(query);
oInsrtStatement.setString(1, FirstName);
oInsrtStatement.setString(2, LastName);
oInsrtStatement.setString(3, Category);
oInsrtStatement.setString(4, UserId);
oInsrtStatement.setString(5, Password);
oInsrtStatement.setString(6, Gmail);
oInsrtStatement.execute();
oConnection.commit();
oInsrtStatement.close();
$.response.contentType = "text/plain; charset=UTF-8";
$.response.setBody("Successfully Inserted");

oConnection.close();
