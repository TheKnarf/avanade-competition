var app = angular.module('app', [
    'ngRoute'
]);

app.controller('HomeCtrl', function($scope, $http) {
  
    $scope.buttonSelect = {'loan':2000000, 'startDateMonth':5, 'rate':3.45, 'paymentTime':10, 'startDateYear':2064};    
    
    var loanRaisingMonth = 'loanRaisingMonth=';
    // Parameters to send
    switch($scope.buttonSelect.startDateMonth) {
            
            case 'Jan': 
                loanRaisingMonth += 1; 
                break;
            case 'Feb': 
                loanRaisingMonth += 2;
                break;
            case 'Mar': 
                loanRaisingMonth += 3;
                break;
            case 'Apr': 
                loanRaisingMonth += 4;
                break;
            case 'Mai': 
                loanRaisingMonth += 5;
                break;
            case 'Jun': 
                loanRaisingMonth += 6;
                break;
            case 'Jul': 
                loanRaisingMonth += 7;
                break;
            case 'Aug': 
                loanRaisingMonth += 8;
                break;
            case 'Sep': 
                loanRaisingMonth += 9;
                break;
            case 'Okt': 
                loanRaisingMonth += 10;
                break;
            case 'Nov': 
                loanRaisingMonth += 11;
                break;
            case 'Dec': 
                loanRaisingMonth += 12;
                break;
            default: 
                loanRaisingMonth += 1;
            
    }
    
    
    var loanRaisingMonth = "loanRaisingMonth=" + $scope.buttonSelect.startDateMonth;
    var loanRaisingYear = "loanRaisingYear=" + $scope.buttonSelect.startDateYear;
    var prinicpalAmount = "principalAmount=" + $scope.buttonSelect.loan;
    var annualNominalInterestRate = "annualNominalInterestRate=" + $scope.buttonSelect.rate;
    var totalNumberOfPayments = "totalNumberOfPayments=" + $scope.buttonSelect.paymentTime;
    var fullURL = 'bolig.php?' +
        loanRaisingMonth + '&' + 
        loanRaisingYear + '&' + 
        prinicpalAmount + '&' + 
        annualNominalInterestRate + '&' + 
        annualNominalInterestRate + '&' + 
        totalNumberOfPayments;
    
     $scope.calc = function() {
        console.log("calc");
        $http.get(fullURL).
            success(function(data, status, headers, config) {
                $scope.result = data;
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                console.log('error');
          });
     };    
    
})
.directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9,]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
})
.directive('numbersDotOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9,.]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});

