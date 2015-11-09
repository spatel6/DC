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
    
        var before_render_image = self.GetRenderedImage();

        setTimeout(function () {

            //saveSvgAsPng(canvas, 'D:\\Sachin\\Projects\\DC\\DC\\assets\\img\\' + imageName + '.png');
            var imageUri;
            //svgAsDataUri(yearly_bubble_chart_canvas, null, function (uri) {
            //    yearly_bubble_chart_imageUri = uri;
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
                }
            });
        }, 1500);
    };

    self.GetRenderedImage = function () {
        var render_image;
        svgAsDataUri($('#' + self.ClickedGraph() + ' svg')[0], null, function (uri) {
            render_image = uri;
        });
        return render_image;
    };

    self.GetGraph = function (data, ele) {
        console.log(data);
        self.SetFilters(data.Filter);
        self.FromStep(data.ID);
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