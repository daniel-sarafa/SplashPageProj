$(document).ready(function(){
	function checkAccess(resource, authorizedCallback, unauthorizedCallback){
		if(typeof resource != "object"){
			resource = [resource];
		}
		return $.ajax({type : 'POST', url: '/pdo-web/api/auth', contentType: "application/json;charset=UTF-8", dataType: "json", data: JSON.stringify({resources: resource, authorizeAll: true})}).success(function(data){
			if(data.authorized === true){
				authorizedCallback(data);
			} else{
				unauthorizedCallback(data);
			}
		})
	}
	
	function getLink(url, callback, errorCallback){
		return $.ajax({
			url: "/pdo-web/api/links/" +url,
			type: 'GET'
		}).success(callback)
		.error(function(error){
			if(error.status === 200){
				callback(error);
			} else {
				errorCallback(error);
			}
		})
	}
	
	getLink('CSPS', function(data){
		$('#request-link').attr("href", data.responseText);
		});
	
	checkAccess("HomePage:read", function(data){
		getLink('PdoR2', function (data) {
			$('#mixratesmenu').attr("href", data.responseText).removeClass("disabled");
			$('#mixratesbutton').attr("href", data.responseText);
		});
	}, function(error){
		$('#mixratesmenu').removeAttr("href").addClass("disabled");	
		$('#mixratesbutton').attr("href", 'https://comm.sp.ford.com/sites/PDOR2ResourceCenter/Documents/How%20to%20Request%20Access%20to%20PDO.pdf');
		$("#mixratelink").html("Learn How to Request Access <i class='fa fa-arrow-circle-right'></i>");
	});
	
	checkAccess("ManageAdminFeatures:read", function(){
		getLink("JobAdmin", function (data) {
				$('#adminlink').removeAttr("href").addClass("disabled");
			});
	}, function(error) {
		$('#adminlink').removeAttr("href").addClass("disabled");		
	});
		
	checkAccess('ChangeManagement:read', function(){
		getLink('ChangeManagement', function (data) {
			$('#changemanagementmenu').attr("href", data.responseText).removeClass("disabled");
			$('#changemanagementbutton').attr("href", data.responseText);
		});
	}, function(){
		$('#changemanagementmenu').removeAttr("href").addClass("disabled");	
		$("#changemanagementbuttonlink").html("Learn How to Request Access <i class='fa fa-arrow-circle-right'></i>");
		$('#changemanagementbutton').attr("href", "https://comm.sp.ford.com/sites/PDOR2ResourceCenter/Documents/How%20to%20Request%20Access%20to%20PDO.pdf");
	});
		
	getLink('PdoR1', function (data) {
		$('#proddefmenu').attr("href", data.responseText).removeClass("disabled");
		$('#proddefinitionlink').attr("href", data.responseText);
	});
	
	
	
  $('.roll-up').hover(function(){
    $(this).find('.rolledUpMessage').children().last().slideToggle('slow');
  })
});

function pauseVid() {
document.getElementById("vid").pause();
}



/*
 * function notAuthorized(error){ $('.proddef').attr("href",
 * 'https://comm.sp.ford.com/sites/PDOR2ResourceCenter/Documents/Instructions%20Infographic%20for%20How%20to%20Access%20PDO.pdf');
 * $('#proddefinitionlink').attr("href",
 * 'https://comm.sp.ford.com/sites/PDOR2ResourceCenter/Documents/Instructions%20Infographic%20for%20How%20to%20Access%20PDO.pdf');
 * $('#changemanagementmenu').attr("href",
 * 'https://comm.sp.ford.com/sites/PDOR2ResourceCenter/Documents/Instructions%20Infographic%20for%20How%20to%20Access%20PDO.pdf');
 * $('#changemanagementbutton').attr("href",
 * 'https://comm.sp.ford.com/sites/PDOR2ResourceCenter/Documents/Instructions%20Infographic%20for%20How%20to%20Access%20PDO.pdf');
 * 
 * 
 * document.getElementById("proddefinitionbutton").innerHTML = "Learn How to
 * Request Access" + "<i class='fa fa-arrow-circle-right'></i>";
 * document.getElementById("changemanagementbuttonlink").innerHTML = "Learn How
 * to Request Access" + "<i class='fa fa-arrow-circle-right'></i>"; }
 * 
 * console.log($(this).data('authurl')); $.ajax({method :
 * $(this).data('method'), url: $(this).data('authurl'), data:
 * {}}).success(function(response, status){ console.log(status);
 * }).error(function(response, status){ console.error(status); });
 * 
 */
// $.ajax({method : 'get', url:
// '/pdo-web/api/user/loggedInUser'}).success(function(data){
// console.log(data);
// var user = data.userId;
// }).error(function(data){
// console.error(data);
// });
