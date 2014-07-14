 var myApp = angular.module('myApp',['ngRoute'],['ngTable']);        
            
            myApp.config(function($routeProvider){
               $routeProvider.when('/customer',{templateUrl: 'partials/customer.html',controller:'basicController'})
                             .when('/animals',{templateUrl:'partials/animals.html',controller:'animalController'})            
                             .otherwise({redirectTo: '/customer'});
                
            });
 
            myApp.directive('name',function(){
                return{
                    restrict: 'E',
                    scope:{
                      data: '='
                    },
                    controller: function($scope){
                      
                    },
                    link:function(scope,e,a){
                        
                    },
                    template: "<h1> {{data.name}} and {{data.code}}</h1>"
                };
                
            });           
            
            myApp.factory('datafactory',function(){
                
                var customers = [{name:'john',code:'1000'} , {name:'doe',code:'2000'} , {name:'jane',code:'30000'},
                                 {name:'pane',code:'80000'},{name:'mane',code:'90000'}];                
                var objFactory ={};
                
                objFactory.getCustomers = function(){
                    return customers;                    
                };
                
                objFactory.pushCustomers = function(customer){
                    customers.push(customer);                    
                };
                
                return objFactory;
            });
            
            function basicController($scope,datafactory){
                $scope.customers = datafactory.getCustomers(); 
                $scope.master = {};
                
                $scope.addCust = function(){
                    datafactory.pushCustomers($scope.newCustomer);
                    $scope.newCustomer = {};
                    
                };
                
                $scope.update = function(newCusomer){
                  $scope.master = angular.copy(newCustomer);  
                    
                };
                
                $scope.isUnchanged = function(newCustomer){
                    return angular.equals(newCustomer , $scope.master);
                };
            }
            
            function animalController($scope){
                $scope.animals = [{name:'zebra',code:'666'} , {name:'tiger',code:'333'} , {name:'elephant',code:'999'}];                
            }
            
            
            myApp.controller('basicController', basicController);
            myApp.controller('animalController', animalController);
            myApp.controller('PaginationCtrl', PaginationCtrl);
            
            
            function PaginationCtrl($scope) {

                    $scope.itemsPerPage = 5;
                    $scope.currentPage = 0;
                    $scope.items = [];

                    for (var i=0; i<50; i++) {
                      $scope.items.push({
                        id: i, name: "name "+ i, description: "description " + i
                      });
                    }

                    $scope.prevPage = function() {
                      if ($scope.currentPage > 0) {
                        $scope.currentPage--;
                      }
                    };

                    $scope.prevPageDisabled = function() {
                      return $scope.currentPage === 0 ? "disabled" : "";
                    };

                    $scope.pageCount = function() {
                      return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
                    };

                    $scope.nextPage = function() {
                      if ($scope.currentPage < $scope.pageCount()) {
                        $scope.currentPage++;
                      }
                  };
              }
              
            myApp.filter('offset', function() {
                    return function(input, start) {
                      start = parseInt(start, 10);
                      return input.slice(start);
                    };
                  });
                  
            
