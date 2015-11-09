var ViewModel = function () {
    var self = this;

    self.XmlName = ko.observable("data.xml");
    self.ClickedGraph = ko.observable('');

    self.SetClickedGraph = function (clickedGraph) {
        if (self.ClickedGraph() == '') {
            self.ClickedGraph(clickedGraph);
            console.log(clickedGraph);
        }
    };

    self.SaveFilters = function (chartName) {
        debugger;
        self.SetClickedGraph(chartName);
        self.ChartChangeEvent();
    }

    self.PageLoad = function () {
               

        // Get ALL Stored Graph here
        self.SavedGraphList = ko.observableArray([]);
        $.ajax({
            url: '/home/getallrecords',
            type: 'POST',
            data: ko.toJSON({ 'xmlName': self.XmlName() }),
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                if (response.IsSuccess) {
                    $.each(response.Data, function (index, data) {
                        self.SavedGraphList.push(data);
                    });
                }
                //self.SavedGraphList = ko.mapping.fromJS(response.Data);
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request) + "  " + error);
            }
        });
    };

    self.PageSize = ko.observable(10);
    var OldFilter = "1";
    var NewFilter = "2";
    var isFilterChangeCall = true;
    self.isSavedFilterChangeCall = ko.observable(false);
    self.FromStep = ko.observable("");
    var count = 0;

    self.SaveGraph = function (data) {
        //$.blockUI({ message: '<h1><img src="loading.gif" /></h1>' });
        //console.log(data);

        //var yearly_bubble_chart_canvas = $('#yearly-bubble-chart svg')[0];
        //var yearly_bubble_chart_imageUri;
        //var gain_loss_chart_canvas = $('#gain-loss-chart svg')[0];
        //var gain_loss_chart_imageUri;
        //var quarter_chart_canvas = $('#quarter-chart svg')[0];
        //var quarter_chart_imageUri;
        //var day_of_week_chart_canvas = $('#day-of-week-chart svg')[0];
        //var day_of_week_chart_imageUri;
        //var fluctuation_chart_canvas = $('#fluctuation-chart svg')[0];
        //var fluctuation_chart_imageUri;
        //var monthly_move_chart_canvas = $('#monthly-move-chart svg')[0];
        //var monthly_move_chart_imageUri;
        //var monthly_volume_chart_canvas = $('#monthly-volume-chart svg')[0];
        //var monthly_volume_chart_imageUri;

        var before_render_image = self.GetRenderedImage();


        setTimeout(function () {

            //saveSvgAsPng(canvas, 'D:\\Sanjay\\Projects\\DC\\DC\\assets\\img\\' + imageName + '.png');
            var imageUri;
            //svgAsDataUri(yearly_bubble_chart_canvas, null, function (uri) {
            //    yearly_bubble_chart_imageUri = uri;
            //});
            //svgAsDataUri(gain_loss_chart_canvas, null, function (uri) {
            //    gain_loss_chart_imageUri = uri;
            //});
            //svgAsDataUri(quarter_chart_canvas, null, function (uri) {
            //    quarter_chart_imageUri = uri;
            //});
            //svgAsDataUri(day_of_week_chart_canvas, null, function (uri) {
            //    day_of_week_chart_imageUri = uri;
            //});
            //svgAsDataUri(fluctuation_chart_canvas, null, function (uri) {
            //    fluctuation_chart_imageUri = uri;
            //});
            //svgAsDataUri(monthly_move_chart_canvas, null, function (uri) {
            //    monthly_move_chart_imageUri = uri;
            //});
            //svgAsDataUri(monthly_volume_chart_canvas, null, function (uri) {
            //    monthly_volume_chart_imageUri = uri;
            //});

            var after_render_image = self.GetRenderedImage();

            var object = {
                'ID': self.SavedGraphList().length + 1,
                'Filter': data,
                'FromStep': self.FromStep(),
                'YearlyBubbleChartImageUri': '',
                'GainLossChartImageUri': '',
                'QuarterChartImageUri': '',
                'DayOfWeekChartImageUri': '',
                'FluctuationChartImageUri': '',
                'MonthlyMoveChartImageUri': '',
                'MonthlyVolumeChartImageUri': '',
                'BeforeRenderImageUri': before_render_image,
                'AfterRenderImageUri': after_render_image,
                'XmlName': self.XmlName()
            };

            $.ajax({
                url: '/home/index',
                type: 'POST',
                data: ko.toJSON({ filterModel: object }),
                dataType: 'json',
                contentType: "application/json",
                success: function (response) {
                    if (response.IsSuccess) {
                        self.SavedGraphList.push(response.Data);
                        self.FromStep("");
                        self.ClickedGraph('');
                    }
                },
                error: function (request, error) {
                    alert("Request: " + JSON.stringify(request) + "  " + error);
                },
                complete: function () {
                    //$.unblockUI();
                }
            });
        }, 1500);
    };

    self.GetRenderedImage = function () {
        var render_image;
        //saveSvgAsPng($('#' + self.ClickedGraph() + ' svg')[0], 'D:\\Sanjay\\Projects\\DC\\DC\\assets\\img\\' + "test" + '.png');
        //svgAsDataUri($('#' + 'gain-loss-chart' + ' svg')[0], null, function (uri) {
        svgAsDataUri($('#' + self.ClickedGraph() + ' svg')[0], null, function (uri) {
            render_image = uri;
        });
        //switch (self.ClickedGraph()) {
        //    case 'yearly-bubble-chart':
        //        svgAsDataUri($('#yearly-bubble-chart svg')[0], null, function (uri) {
        //            render_image = uri;
        //        });
        //        break;
        //    case 'gain-loss-chart':
        //        svgAsDataUri($('#gain-loss-chart svg')[0], null, function (uri) {
        //            render_image = uri;
        //        });
        //        break;
        //    case 'quarter-chart':
        //        svgAsDataUri($('#quarter-chart svg')[0], null, function (uri) {
        //            render_image = uri;
        //        });
        //        break;
        //    case 'day-of-week-chart':
        //        svgAsDataUri($('#day-of-week-chart svg')[0], null, function (uri) {
        //            render_image = uri;
        //        });
        //        break;
        //    case 'fluctuation-chart':
        //        svgAsDataUri($('#fluctuation-chart svg')[0], null, function (uri) {
        //            render_image = uri;
        //        });
        //        break;
        //    case 'monthly-move-chart':
        //        svgAsDataUri($('#monthly-move-chart svg')[0], null, function (uri) {
        //            render_image = uri;
        //        });
        //        break;
        //    case 'monthly-volume-chart':
        //        svgAsDataUri($('#monthly-volume-chart svg')[0], null, function (uri) {
        //            render_image = uri;
        //        });
        //        break;
        //    case 'us-chart':
        //        svgAsDataUri($('#us-chart svg')[0], null, function (uri) {
        //            render_image = uri;
        //        });
        //        break;
        //    case 'industry-chart':
        //        svgAsDataUri($('#industry-chart svg')[0], null, function (uri) {
        //            render_image = uri;
        //        });
        //        break;
        //    case 'round-chart':
        //        svgAsDataUri($('#round-chart svg')[0], null, function (uri) {
        //            render_image = uri;
        //        });
        //        break;
        //}
        return render_image;
    };

    self.GetGraph = function (data, ele) {
        console.log(data);
        self.SetFilters(data.Filter);
        self.FromStep(data.ID);
        //self.SetFilters(data.Filter);
    };

    self.ChartChangeEvent = function () {
        debugger;
        NewFilter = self.GetFilters();
        if (OldFilter != NewFilter && NewFilter != '') {
            self.SaveGraph(NewFilter);
            OldFilter = NewFilter;
        }
    };

    self.GetFilters = function () {
        var filters = [];
        debugger;
        for (var i = 0; i < dc.chartRegistry.list().length; i++) {

            var chart = dc.chartRegistry.list()[i];

            for (var j = 0; j < chart.filters().length; j++) {
                filters.push({ ChartID: chart.chartID(), Filter: chart.filters()[j] });
            }
        }
        if (filters.length == 0)
            return '';
        return JSON.stringify(filters);
    };

    self.SetFilters = function (stringFilter) {
        debugger;
        self.isSavedFilterChangeCall(true);

        //gainOrLossChart.filterAll();
        //fluctuationChart.filterAll();
        //quarterChart.filterAll();
        //dayOfWeekChart.filterAll();
        //moveChart.filterAll();
        //volumeChart.filterAll();
        //yearlyBubbleChart.filterAll();

        for (var i = 0; i < dc.chartRegistry.list().length; i++) {
            dc.chartRegistry.list()[i].filterAll();
        }

        var filterObjects = JSON.parse(stringFilter);

        for (var i = 0; i < filterObjects.length; i++) {
            var filter = filterObjects[i].Filter;
            if (filter instanceof Array) {
                if (new Date(filter[0]) != "Invalid Date") {
                    filter[0] = new Date(filter[0]);
                }
                if (new Date(filter[1]) != "Invalid Date") {
                    filter[1] = new Date(filter[1]);
                }
                filter = dc.filters.RangedFilter(filter[0], filter[1]);

                if (filterObjects[i].ChartID - 1 == 4)
                    dc.chartRegistry.list()[filterObjects[i].ChartID - 1].x(d3.time.scale().domain(filter));
            }
            dc.chartRegistry.list()[filterObjects[i].ChartID - 1].filter(filter);
        }

        dc.redrawAll();
        self.isSavedFilterChangeCall(false);
    };
};