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
		controller: 'searchCtrl'

	})
	.when('/timetable', {

		templateUrl: 'client/partials/timetable.html',		
		controller: 'timetableCtrl'

	})
	.otherwise({ redirectTo: '/home' })
}])

.controller('signInCtrl', ['$scope', function ($scope,$sce) {
	var imagesRoutes = "libs/local/img/";
	$scope.logo = imagesRoutes + "Uniway.png";
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
.controller('dashboardCtrl', ['$scope', function ($scope) {
	
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