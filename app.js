angular.module('Uniway', ['ngRoute'])

.config(['$routeProvider','$locationProvider',function ($routeProvider, $locationProvider) {
	$routeProvider
	
	.when('/home',{
		templateUrl: 'client/partials/signIn.html',
		controller: 'signInCtrl'
	})
	.when('/signUp', {
		templateUrl: 'client/partials/signUp.html',	
		controller: 'signUpCtrl'	
	})
	.when('/dashboard', {
		templateUrl: 'client/partials/dashboard.html',		
		controller: 'dashboardCtrl'
	})
	.when('/search', {
		templateUrl: 'client/partials/search.html',		
		controller: 'dashboardCtrl'
	})
	.otherwise({ redirectTo: '/home' })
}])

.controller('signInCtrl', ['$scope', function ($scope,$sce) {
	var imagesRoutes = "libs/local/img/";
	$scope.logo = imagesRoutes + "Uniway.png";
}])

.controller('signUpCtrl', ['$scope', function ($scope) {	
	var imagesRoutes = "libs/local/img/";
	$scope.logo = imagesRoutes + "Uniway.png";
	$scope.active = "1";
	
	$("input[name='mon_time_u']").val("06:30");
	$("#default_time_u").click(function () {
		var check = $("#default_time_u").is(':checked')		
		if(check){
			$("input[name='tue_time_u']").val($("input[name='mon_time_u']").val());	
			$("input[name='wed_time_u']").val($("input[name='mon_time_u']").val());	
			$("input[name='thu_time_u']").val($("input[name='mon_time_u']").val());	
			$("input[name='fri_time_u']").val($("input[name='mon_time_u']").val());					
		}else{
			$("input[name='tue_time_u']").val("");	
			$("input[name='wed_time_u']").val("");	
			$("input[name='thu_time_u']").val("");	
			$("input[name='fri_time_u']").val("");	
		}		
	});
	$("input[name='mon_time_h']").val("18:30");
	$("#default_time_h").click(function () {
		var check = $("#default_time_h").is(':checked')		
		if(check){
			$("input[name='tue_time_h']").val($("input[name='mon_time_h']").val());	
			$("input[name='wed_time_h']").val($("input[name='mon_time_h']").val());	
			$("input[name='thu_time_h']").val($("input[name='mon_time_h']").val());	
			$("input[name='fri_time_h']").val($("input[name='mon_time_h']").val());					
		}else{
			$("input[name='tue_time_h']").val("");	
			$("input[name='wed_time_h']").val("");	
			$("input[name='thu_time_h']").val("");	
			$("input[name='fri_time_h']").val("");	
		}		
	});
	$scope.isActive = function (id) {		
		return $scope.active === id;
	}

	$scope.asignActive = function (id) {
		$scope.active = id;
	}
}])
.controller('searchCtrl', ['$scope', function ($scope) {
	
}])
.controller('dashboardCtrl', ['$scope', function ($scope) {
	
}])
.directive('navbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/partials/directives/navbar.html',
    link: function(scope, elem, attrs){
    	$(".button-collapse").sideNav();
    	$('.button-collapse').sideNav('hide');
    }
  };
})
;