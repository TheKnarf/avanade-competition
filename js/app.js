var app = angular.module('app', [
    'ngRoute',
    'AngularGM' 
])


.controller("HomeCtrl", function ($scope) {    
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
});
