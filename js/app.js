var app = angular.module('app', [
    'ngRoute',
    'AngularGM' 
])


.controller("HomeCtrl", function ($scope, $http) {    
    $scope.options = {
        map: {
          center: new google.maps.LatLng(59.913869, 10.752245),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.TERRAIN
        },
        notselected: {
          icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
        },
        selected: {
          icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png',
        }
      };
    
    
    
    $scope.getInfo = function(type) {
        $http.get('novatransport.php?endpoint=' + type).
            success(function(data, status, headers, config) {
                $scope.assignments = data;
                console.log(data);
                $scope.center = new google.maps.LatLng(data[0].endLatitude, data[0].endLongitude);
                return data;
            }).
            error(function(data, status, headers, config) {
                console.log('error');
          });
        
    }
    
});
