var app = angular.module('calendarApp', []);

app.controller('CalendarController', function($scope) {
    $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $scope.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var today = new Date();
    $scope.currentMonth = today.getMonth();
    $scope.currentYear = today.getFullYear();

    $scope.days = [];
    $scope.generateCalendar = function() {
        var firstDay = new Date($scope.currentYear, $scope.currentMonth, 1).getDay();
        var lastDate = new Date($scope.currentYear, $scope.currentMonth + 1, 0).getDate();
        var lastMonthLastDate = new Date($scope.currentYear, $scope.currentMonth, 0).getDate();
        
        $scope.days = [];

        for (var i = firstDay; i > 0; i--) {
            $scope.days.push({ date: new Date($scope.currentYear, $scope.currentMonth - 1, lastMonthLastDate - i + 1), isCurrentMonth: false });
        }

        for (var j = 1; j <= lastDate; j++) {
            $scope.days.push({ date: new Date($scope.currentYear, $scope.currentMonth, j), isCurrentMonth: true });
        }

        var remainingDays = 42 - $scope.days.length;
        for (var k = 1; k <= remainingDays; k++) {
            $scope.days.push({ date: new Date($scope.currentYear, $scope.currentMonth + 1, k), isCurrentMonth: false });
        }
    };

    $scope.prevMonth = function() {
        $scope.currentMonth--;
        if ($scope.currentMonth < 0) {
            $scope.currentMonth = 11;
            $scope.currentYear--;
        }
        $scope.generateCalendar();
    };

    $scope.nextMonth = function() {
        $scope.currentMonth++;
        if ($scope.currentMonth > 11) {
            $scope.currentMonth = 0;
            $scope.currentYear++;
        }
        $scope.generateCalendar();
    };

    $scope.generateCalendar();
});
