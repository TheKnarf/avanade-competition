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

    $scope.results= [];
    $scope.getAssignments = function() {
        $http.get('novatransport.php?endpoint=assignments').
            success(function(data, status, headers, config) {
                $scope.assignments = data;
                angular.forEach(data, function(val, key) {
                    console.log(val);
                    var obj = {'id':val.id, 'lat': val.startLatitude, 'long': val.startLongitude};
                    $scope.results.push(obj);
                    console.log(obj);
                });
                console.log($scope.results);
                $scope.center = new google.maps.LatLng(data[0].endLatitude, data[0].endLongitude);
                $scope.$broadcast('gmMarkersUpdate', 'assignments');
            }).
            error(function(data, status, headers, config) {
                console.log('error');
          });
        
    }
    
    $scope.getVehicleLocations = function() {
        $http.get('novatransport.php?endpoint=vehiclelocations/1').
            success(function(data, status, headers, config) {
                $scope.vehiclelocations = data;
                $scope.vehiclelocations.splice(20, 0);
                console.log($scope.vehiclelocations);
                $scope.$broadcast('gmMarkersUpdate', 'vehiclelocations');
            }).
            error(function(data, status, headers, config) {
                console.log('error');
          });
    }
    $scope.getAssignmentOptions = function(object) {
        return angular.extend(
         { title: object.notes },
         object.selected ? $scope.options.selected :
            $scope.options.notselected
        );
    }
    
    $scope.$on('gmMarkersUpdated', function(event, objects) {
        console.log("markers updated..");
    });
    
    
});
