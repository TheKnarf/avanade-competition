var app = angular.module('app', [
    'ngRoute',
    'AngularGM' 
])


.controller("HomeCtrl", function ($scope, $http) {    
    $scope.options = {
        map: {
          center: new google.maps.LatLng(59.913869, 10.752245),
          zoom: 10
        },
        notselected: {
          icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
        },
        selected: {
          icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png',
        }
      };
    
    
    $scope.assignments = [];
    
    $scope.getAssignments = function() {
        $http.get('novatransport.php?endpoint=assignments').
            success(function(data, status, headers, config) {
                $scope.assignments = data;
                console.log($scope.assignments);
                $scope.center = new google.maps.LatLng(data[0].endLatitude, data[0].endLongitude);
                $scope.$broadcast('gmMarkersUpdate');
            }).
            error(function(data, status, headers, config) {
                console.log('error');
          });
        
    }
    
    $scope.$on('gmMarkersUpdated', function(event, objects) {
        console.log("markers updated..");
    });
    
    
});
