(function () {
    'use strict';

    angular
        .module(HygieiaConfig.module)
        .controller('RepoViewController', RepoViewController);

    RepoViewController.$inject = ['$q', '$scope', 'codeRepoData', 'collectorData', '$uibModal'];
    function RepoViewController($q, $scope, codeRepoData, collectorData, $uibModal) {
        var ctrl = this;

        ctrl.commitChartOptions = {
            plugins: [
                //Chartist.plugins.gridBoundaries(),
                Chartist.plugins.lineAboveArea(),
                //Chartist.plugins.pointHalo(),
                Chartist.plugins.ctPointClick({
                    onClick: showDetail
                }),
                Chartist.plugins.axisLabels({
                    stretchFactor: 1.6,
                    axisX: {
                        labels: [
                            moment().subtract(14, 'days').format('MMM DD'),
                            moment().subtract(7, 'days').format('MMM DD'),
                            moment().format('MMM DD')
                        ]
                    }
                }),
               /* Chartist.plugins.ctPointLabels({
                    //textAnchor: 'middle'
                })*/
            ],
            showArea: false,
            lineSmooth: true,
            fullWidth: true,
            axisY: {
                offset: 15,
                showGrid: true,
                showLabel: true,
                labelInterpolationFnc: function (value) {
                    return Math.round(value * 100) / 100;
                }
            }
        };

        ctrl.commits = [];
        ctrl.totalCommitsCount = [];
        ctrl.totalOpenPrsCount = [];
        ctrl.totalClosedPrsCount = [];

        ctrl.pullRequests = [];
        ctrl.showDetail = showDetail;
        ctrl.load = function () {
            var deferred = $q.defer();
            var params = {
                componentId: $scope.widgetConfig.componentId,
                numberOfDays: 14
            };
            codeRepoData.details(params).then(function (data) {
                processCommitResponse(data.result, params.numberOfDays);
                //ctrl.lastUpdated = data.lastUpdated;
            }).then(function () {
                codeRepoData.prDetails(params).then(function (prData) {
                    processPrResponse(prData.result, params.numberOfDays);
                    ctrl.lastUpdated = prData.lastUpdated;
                }).then(function () {
                    collectorData.getCollectorItem($scope.widgetConfig.componentId, 'scm').then(function (data) {
                        deferred.resolve( {lastUpdated: ctrl.lastUpdated, collectorItem: data});
                    });
                });
            });
            return deferred.promise;
        };

        function showDetail(evt) {
            var target = evt.target,
                pointIndex = target.getAttribute('ct:point-index');

            $uibModal.open({
                controller: 'RepoDetailController',
                controllerAs: 'detail',
                templateUrl: 'components/widgets/repo/detail.html',
                size: 'lg',
                resolve: {
                    commits: function () {
                        return groupedCommitData[pointIndex];
                    }
                }
            });
        }

        var groupedCommitData = [];
        var groupedOpenPr = [];
        var groupedClosedPr = [];

        function processCommitResponse(data, numberOfDays) {
            // get total commits by day
            //var commits = [];
            var groups = _(data).sortBy('timestamp')
                .groupBy(function (item) {
                    //console.log(moment.duration(moment().diff(moment(item.scmCommitTimestamp))).asHours());
                    return -1 * Math.floor(moment.duration(moment().diff(moment(item.scmCommitTimestamp))).asDays());
                }).value();

            var totalCommits=0;
            ctrl.totalCommitsCount = [];
            for (var x = -1 * numberOfDays + 1; x <= 0; x++) {
                if (groups[x]) {
                    totalCommits = totalCommits + groups[x].length;
                    ctrl.totalCommitsCount.push(totalCommits);
                    groupedCommitData.push(groups[x]);
                }
                else {
                    ctrl.totalCommitsCount.push(totalCommits);
                    groupedCommitData.push([]);
                }
            }

            //update charts
           /* if (ctrl.totalCommitsCount.length) {
                var labels = [];
                console.log("update in commits");
                ctrl.commitChartData = {
                    series: [ctrl.totalCommitsCount],
                    labels: labels
                };
            }*/


            // group get total counts and contributors
            var today = toMidnight(new Date());
            var sevenDays = toMidnight(new Date());
            var fourteenDays = toMidnight(new Date());
            sevenDays.setDate(sevenDays.getDate() - 7);
            fourteenDays.setDate(fourteenDays.getDate() - 14);

            var lastDayCount = 0;
            var lastDayContributors = [];

            var lastSevenDayCount = 0;
            var lastSevenDaysContributors = [];

            var lastFourteenDayCount = 0;
            var lastFourteenDaysContributors = [];

            // loop through and add to counts
            _(data).forEach(function (commit) {

                if (commit.scmCommitTimestamp >= today.getTime()) {
                    lastDayCount++;

                    if (lastDayContributors.indexOf(commit.scmAuthor) === -1) {
                        lastDayContributors.push(commit.scmAuthor);
                    }
                }

                if (commit.scmCommitTimestamp >= sevenDays.getTime()) {
                    lastSevenDayCount++;

                    if (lastSevenDaysContributors.indexOf(commit.scmAuthor) === -1) {
                        lastSevenDaysContributors.push(commit.scmAuthor);
                    }
                }

                if (commit.scmCommitTimestamp >= fourteenDays.getTime()) {
                    lastFourteenDayCount++;
                    ctrl.commits.push(commit);
                    if (lastFourteenDaysContributors.indexOf(commit.scmAuthor) === -1) {
                        lastFourteenDaysContributors.push(commit.scmAuthor);
                    }
                }

            });

            ctrl.lastDayCommitCount = lastDayCount;
            ctrl.lastDayContributorCount = lastDayContributors.length;
            ctrl.lastSevenDaysCommitCount = lastSevenDayCount;
            ctrl.lastSevenDaysContributorCount = lastSevenDaysContributors.length;
            ctrl.lastFourteenDaysCommitCount = lastFourteenDayCount;
            ctrl.lastFourteenDaysContributorCount = lastFourteenDaysContributors.length;
        }

        function toMidnight(date) {
                date.setHours(0, 0, 0, 0);
                return date;
            }

        function processPrResponse(data,numberOfDays){
            //var openPullRequests = [];
            //var closedPullRequests = [];
            console.log(data);
            var groupsOpen = _(data).sortBy('timestamp')
                .groupBy(function (item) {
                    var val = Math.floor(moment.duration(moment().diff(moment(item.createdAtTimeStamp))).asDays());
                    if(val >= numberOfDays){
                        val = numberOfDays-1;
                    }
                    console.log(val);
                    return -1 * val;
                }).value();

            console.log("groups");
            console.log(groupsOpen);
            var groupsClosed = _(data).sortBy('timestamp')
                .groupBy(function (item) {
                    //console.log(moment.duration(moment().diff(moment(item.scmCommitTimestamp))).asHours());
                    return -1 * Math.floor(moment.duration(moment().diff(moment(item.closedAtTimeStamp))).asDays());
                }).value();

            var totalOpen=0;
            var totalClose=0;

            ctrl.totalOpenPrsCount=[];
            ctrl.totalClosedPrsCount=[];
            for (var x = -1 * numberOfDays+1; x <= 0; x++) {
                if (groupsOpen[x]) {
                    totalOpen = totalOpen + groupsOpen[x].length;
                    ctrl.totalOpenPrsCount.push(totalOpen);
                    groupedOpenPr.push(groupsOpen[x]);
                }
                else {
                    ctrl.totalOpenPrsCount.push(totalOpen);
                    groupedOpenPr.push([]);
                }
                if (groupsClosed[x]) {
                    totalClose = totalClose + groupsClosed[x].length;
                    ctrl.totalClosedPrsCount.push(totalClose);
                    groupedClosedPr.push(groupsClosed[x]);
                }
                else {
                    ctrl.totalClosedPrsCount.push(totalClose);
                    groupedClosedPr.push([]);
                }
            }

            //update charts
            if (ctrl.totalClosedPrsCount.length || ctrl.totalOpenPrsCount.length || ctrl.totalCommitsCount) {
                var labels = [];
                console.log("update in pr");
                ctrl.commitChartData = {
                    //series: [ctrl.totalCommitsCount,ctrl.totalOpenPrsCount,ctrl.totalClosedPrsCount],
                    series: [   { name : 'ravi',
                                  data : ctrl.totalCommitsCount},
                                { name : 'teja',
                                  data : ctrl.totalOpenPrsCount},
                                { name : 'dug',
                                  data : ctrl.totalClosedPrsCount}],
                    labels: labels
                };
            }
        }

    }
})();
