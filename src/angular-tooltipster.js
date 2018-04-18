(function(angular) {
	angular.module("tooltipster",[]).directive('tooltipTitle', function() {
	    return {
            restrict: 'A',
            scope: {
                tooltipTitle: '@',
                tooltipTitleContent: '=?',
                tooltipTitleVariable: '=?',
                tooltipOptions: "=?"
            },
            link: function(scope, element, attrs) {
                var isTooltipDynamicVariable = (scope.tooltipTitleVariable !== undefined);

                if (!scope.tooltipTitle && !isTooltipDynamicVariable) {
                    return;
                }
                
                var tooltipOptions = scope.tooltipOptions || {theme: 'tooltipster-light'};
                var message = scope.tooltipTitle;
                if (isTooltipDynamicVariable) {
                    message = scope.tooltipTitleVariable;
                    scope.$watch('tooltipTitleVariable', function(value) {
                        element.tooltipster('content', value);
                        if (!value) {
                            element.tooltipster('disable');
                        } else {
                            element.tooltipster('enable');
                        }
                    });
                }


                tooltipOptions.content = message;
                element.tooltipster(tooltipOptions);

                if(scope.tooltipTitleContent) {
                    element.tooltipster('content', $(scope.tooltipTitleContent));
                }

                scope.$on("$destroy", function () {
                    element.tooltipster('destroy');
                })
            }
	    }	
	});
})(angular);
