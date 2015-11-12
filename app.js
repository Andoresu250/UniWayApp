angular.module('Uniway', ['ngRoute', 'ngStorage'])

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
		controller: 'searchCtrl'

	})
	.when('/timetable', {

		templateUrl: 'client/partials/timetable.html',		
		controller: 'timetableCtrl'

	})
	.otherwise({ redirectTo: '/home' })
}])

.controller('signInCtrl', ['$scope','$localStorage', '$http', '$location', function ($scope, $localStorage, $http,$location) {
	var imagesRoutes = "libs/local/img/";	
	$scope.logo = imagesRoutes + "Uniway.png";

	$scope.signin = function(){
		
		var form = $scope.formSignIn
		var data ={
			username: form.userName, 
			password: form.password			
		};
		$http({method: 'POST', url: 'http://uniway-api.herokuapp.com/login', data: data}).success(function(data){
			$localStorage.userJson = data;
			$scope.userJson = $localStorage.userJson;					
			$location.url('/dashboard');
		});
					
	}
}])

.controller('signUpCtrl', ['$scope','$http', function ($scope,$http) {	
	var imagesRoutes = "libs/local/img/";
	$scope.logo = imagesRoutes + "Uniway.png";
	$scope.active = "1";
	$scope.formSignUp = {};
	$scope.gPlace;	
	
	$scope.isActive = function (id) {		
		return $scope.active === id;
	}

	$scope.asignActive = function (id) {
		$scope.active = id;
	}
	$scope.setRange = function(range){
		$scope.formSignUp.rank=range;
	}
	$scope.addAddress = function(){
		$scope.formSignUp.locationU=this.gPlace.getPlace().place_id;
	}
	$scope.signup = function(){
		var form=$scope.formSignUp
		var data ={
			username: form.userName, 
			password: form.password, 
			password_confirmation: form.cpassword, 
			rank: form.rank,    //'sa'/'admin'/'driver'/'passenger'
			name: form.nameU, 
			email: form.email, 
			location: form.locationU, 
			capacity: form.capacity
		};
		$http.post(url='http://uniway-api.herokuapp.com/users',data).then(function(data){
			$scope.asignActive('6');			
		},function(error){
			alert('No se puedo registrar')
		});
	
	}
}])
.controller('searchCtrl', ['$scope', function ($scope) {
	$('#select_uni').prop('checked',true);
}])
.controller('dashboardCtrl', ['$scope','$localStorage', function ($scope,$localStorage) {
	$scope.userJson = $localStorage.userJson;	
}])
.controller('timetableCtrl', ['$scope', function ($scope) {
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
.controller('navbarCtrl', ['$scope', '$localStorage','$http', function ($scope,$localStorage,$http) {
	$scope.userJson = $localStorage.userJson;	
	$scope.logOut = function () {		
		var data = {
			'Authorization' : $scope.userJson.user.token
		}
		$http({method: 'POST', url: 'http://uniway-api.herokuapp.com/logout', data: data}).success(function(data){
			$localStorage.userJson = null;								
			$location.url('/home');
		});
	}	
}])
.directive('selectlist', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/partials/directives/selectlist.html',
    link: function(scope, elem, attrs){
    	$('select').material_select();
    }
  };
})
.directive('googleplace', function() {
    return {
        require: 'ngModel',
        controller: 'navbarCtrl',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(scope.gPlace.getPlace().place_id);                
                });
            });
        }
    };
})
;