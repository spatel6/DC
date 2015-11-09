using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace DC.Controllers
{
    public class HomeController : Controller
    {

        [HttpPost]
        public JsonResult Index(FilterModel filterModel)
        {
            ServiceResponse serviceResponse = new ServiceResponse();
            try
            {
                string xmlName = filterModel.XmlName;

                XmlDocument xmlDoc = new XmlDocument();
                string xmlFilePath = Server.MapPath("~/assets/include/" + xmlName);

                //source: http://freefeast.info/tutorials-for-beginners/dotnet-tutorials/how-to-create-xml-document-programatically-in-c/
                XmlElement subRoot;
                if (!System.IO.File.Exists(xmlFilePath))
                {
                    XmlNode rootRecordsNode = xmlDoc.CreateElement("Records");
                    xmlDoc.AppendChild(rootRecordsNode);
                     subRoot = xmlDoc.CreateElement("Record");
                    rootRecordsNode.AppendChild(subRoot);
                }
                else
                {
                    xmlDoc.Load(xmlFilePath);
                    XmlNode rootRecordsNode = xmlDoc.DocumentElement;
                     subRoot = xmlDoc.CreateElement("Record");
                    rootRecordsNode.AppendChild(subRoot);

                    //xmlDoc.Load(xmlFilePath);
                    //subRoot = xmlDoc.CreateElement("Record");
                }
                
                //Step
                XmlElement appendedElementStep = xmlDoc.CreateElement("ID");
                XmlText xmlTextStep = xmlDoc.CreateTextNode(filterModel.ID);
                appendedElementStep.AppendChild(xmlTextStep);
                subRoot.AppendChild(appendedElementStep);
                xmlDoc.DocumentElement.AppendChild(subRoot);
                
                //Link
                XmlElement appendedElementLink = xmlDoc.CreateElement("Filter");
                XmlText xmlTextLink = xmlDoc.CreateTextNode(filterModel.Filter);
                appendedElementLink.AppendChild(xmlTextLink);
                subRoot.AppendChild(appendedElementLink);
                xmlDoc.DocumentElement.AppendChild(subRoot);
                
                //FromStep
                XmlElement appendedElementFromStep = xmlDoc.CreateElement("FromStep");
                XmlText xmlTextFromStep = xmlDoc.CreateTextNode(filterModel.FromStep);
                appendedElementFromStep.AppendChild(xmlTextFromStep);
                subRoot.AppendChild(appendedElementFromStep);
                xmlDoc.DocumentElement.AppendChild(subRoot);

                //TimeStamp
                XmlElement appendedElementTime = xmlDoc.CreateElement("Time");
                filterModel.Time = Convert.ToString(DateTime.Now);
                XmlText xmlTextTime = xmlDoc.CreateTextNode(filterModel.Time);
                appendedElementTime.AppendChild(xmlTextTime);
                subRoot.AppendChild(appendedElementTime);
                xmlDoc.DocumentElement.AppendChild(subRoot);

                //Title
                XmlElement appendedElementTitle = xmlDoc.CreateElement("Title");
                filterModel.Title = filterModel.Time;
                XmlText xmlTextTitle = xmlDoc.CreateTextNode(filterModel.Time);
                appendedElementTitle.AppendChild(xmlTextTitle);
                subRoot.AppendChild(appendedElementTitle);
                xmlDoc.DocumentElement.AppendChild(subRoot);

                ////YearlyBubbleChartImageUri
                //XmlElement appendedElementYearlyBubbleChartImageUri = xmlDoc.CreateElement("YearlyBubbleChartImageUri");
                //XmlText xmlTextYearlyBubbleChartImageUri = xmlDoc.CreateTextNode(filterModel.YearlyBubbleChartImageUri);
                //appendedElementYearlyBubbleChartImageUri.AppendChild(xmlTextYearlyBubbleChartImageUri);
                //subRoot.AppendChild(appendedElementYearlyBubbleChartImageUri);
                //xmlDoc.DocumentElement.AppendChild(subRoot);

                ////GainLossChartImageUri
                //XmlElement appendedElementGainLossChartImageUri = xmlDoc.CreateElement("GainLossChartImageUri");
                //XmlText xmlTextGainLossChartImageUri = xmlDoc.CreateTextNode(filterModel.GainLossChartImageUri);
                //appendedElementGainLossChartImageUri.AppendChild(xmlTextGainLossChartImageUri);
                //subRoot.AppendChild(appendedElementGainLossChartImageUri);
                //xmlDoc.DocumentElement.AppendChild(subRoot);

                ////QuarterChartImageUri
                //XmlElement appendedElementQuarterChartImageUri = xmlDoc.CreateElement("QuarterChartImageUri");
                //XmlText xmlTextQuarterChartImageUri = xmlDoc.CreateTextNode(filterModel.QuarterChartImageUri);
                //appendedElementQuarterChartImageUri.AppendChild(xmlTextQuarterChartImageUri);
                //subRoot.AppendChild(appendedElementQuarterChartImageUri);
                //xmlDoc.DocumentElement.AppendChild(subRoot);

                ////DayOfWeekChartImageUri
                //XmlElement appendedElementDayOfWeekChartImageUri = xmlDoc.CreateElement("DayOfWeekChartImageUri");
                //XmlText xmlTextDayOfWeekChartImageUri = xmlDoc.CreateTextNode(filterModel.DayOfWeekChartImageUri);
                //appendedElementDayOfWeekChartImageUri.AppendChild(xmlTextDayOfWeekChartImageUri);
                //subRoot.AppendChild(appendedElementDayOfWeekChartImageUri);
                //xmlDoc.DocumentElement.AppendChild(subRoot);

                ////FluctuationChartImageUri
                //XmlElement appendedElementFluctuationChartImageUri = xmlDoc.CreateElement("FluctuationChartImageUri");
                //XmlText xmlTextFluctuationChartImageUri = xmlDoc.CreateTextNode(filterModel.FluctuationChartImageUri);
                //appendedElementFluctuationChartImageUri.AppendChild(xmlTextFluctuationChartImageUri);
                //subRoot.AppendChild(appendedElementFluctuationChartImageUri);
                //xmlDoc.DocumentElement.AppendChild(subRoot);

                ////MonthlyMoveChartImageUri
                //XmlElement appendedElementMonthlyMoveChartImageUri = xmlDoc.CreateElement("MonthlyMoveChartImageUri");
                //XmlText xmlTextMonthlyMoveChartImageUri = xmlDoc.CreateTextNode(filterModel.MonthlyMoveChartImageUri);
                //appendedElementMonthlyMoveChartImageUri.AppendChild(xmlTextMonthlyMoveChartImageUri);
                //subRoot.AppendChild(appendedElementMonthlyMoveChartImageUri);
                //xmlDoc.DocumentElement.AppendChild(subRoot);

                ////MonthlyVolumeChartImageUri
                //XmlElement appendedElementMonthlyVolumeChartImageUri = xmlDoc.CreateElement("MonthlyVolumeChartImageUri");
                //XmlText xmlTextMonthlyVolumeChartImageUri = xmlDoc.CreateTextNode(filterModel.MonthlyVolumeChartImageUri);
                //appendedElementMonthlyVolumeChartImageUri.AppendChild(xmlTextMonthlyVolumeChartImageUri);
                //subRoot.AppendChild(appendedElementMonthlyVolumeChartImageUri);
                //xmlDoc.DocumentElement.AppendChild(subRoot);

                //BeforeRenderImageUri
                XmlElement appendedElementBeforeRenderImageUri = xmlDoc.CreateElement("BeforeRenderImageUri");
                XmlText xmlTextBeforeRenderImageUri = xmlDoc.CreateTextNode(filterModel.BeforeRenderImageUri);
                appendedElementBeforeRenderImageUri.AppendChild(xmlTextBeforeRenderImageUri);
                subRoot.AppendChild(appendedElementBeforeRenderImageUri);
                xmlDoc.DocumentElement.AppendChild(subRoot);

                //AfterRenderImageUri
                XmlElement appendedElementAfterRenderImageUri = xmlDoc.CreateElement("AfterRenderImageUri");
                XmlText xmlTextAfterRenderImageUri = xmlDoc.CreateTextNode(filterModel.AfterRenderImageUri);
                appendedElementAfterRenderImageUri.AppendChild(xmlTextAfterRenderImageUri);
                subRoot.AppendChild(appendedElementAfterRenderImageUri);
                xmlDoc.DocumentElement.AppendChild(subRoot);

                xmlDoc.Save(xmlFilePath);
                serviceResponse.IsSuccess = true;
                serviceResponse.Data = filterModel;
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;// "Sorry, Error occurred";
            }
            return Json(serviceResponse);
        }

        [HttpPost]
        public JsonResult GetAllRecords(string xmlName)
        {
            ServiceResponse serviceResponse = new ServiceResponse();
            try
            {
                List<FilterModel> lstFilterModel = new List<FilterModel>();
                string xmlFilePath = Server.MapPath("~/assets/include/" + xmlName);
                if (System.IO.File.Exists(xmlFilePath))
                {
                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc.Load(xmlFilePath);
                    XmlNodeList nodeList = xmlDoc.DocumentElement.SelectNodes("/Records/Record");
                    foreach (XmlNode node in nodeList)
                    {
                        FilterModel filterModel = new FilterModel();
                        filterModel.ID = node.SelectSingleNode("ID").InnerText;
                        filterModel.Filter = node.SelectSingleNode("Filter").InnerText;
                        filterModel.Title = node.SelectSingleNode("Title").InnerText;
                        filterModel.FromStep = node.SelectSingleNode("FromStep").InnerText;
                        //filterModel.YearlyBubbleChartImageUri = node.SelectSingleNode("YearlyBubbleChartImageUri").InnerText;
                        //filterModel.GainLossChartImageUri = node.SelectSingleNode("GainLossChartImageUri").InnerText;
                        //filterModel.QuarterChartImageUri = node.SelectSingleNode("QuarterChartImageUri").InnerText;
                        //filterModel.DayOfWeekChartImageUri = node.SelectSingleNode("DayOfWeekChartImageUri").InnerText;
                        //filterModel.FluctuationChartImageUri = node.SelectSingleNode("FluctuationChartImageUri").InnerText;
                        //filterModel.MonthlyMoveChartImageUri = node.SelectSingleNode("MonthlyMoveChartImageUri").InnerText;
                        //filterModel.MonthlyVolumeChartImageUri = node.SelectSingleNode("MonthlyVolumeChartImageUri").InnerText;
                        filterModel.BeforeRenderImageUri = node.SelectSingleNode("BeforeRenderImageUri").InnerText;
                        filterModel.AfterRenderImageUri = node.SelectSingleNode("AfterRenderImageUri").InnerText;
                        lstFilterModel.Add(filterModel);
                    }

                    serviceResponse.IsSuccess = true;
                    serviceResponse.Data = lstFilterModel;
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;// "Sorry, Error occurred";
            }

            return Json(serviceResponse);
        }

    }

    public class ServiceResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
    }

    public class FilterModel
    {
        public string ID { set; get; }
        public string Filter { set; get; }
        public string Title { set; get; }
        public string Time { set; get; }
        public string FromStep { set; get; }
        public string YearlyBubbleChartImageUri { set; get; }
        public string GainLossChartImageUri { set; get; }
        public string QuarterChartImageUri { set; get; }
        public string DayOfWeekChartImageUri { set; get; }
        public string FluctuationChartImageUri { set; get; }
        public string MonthlyMoveChartImageUri { set; get; }
        public string MonthlyVolumeChartImageUri { set; get; }
        public string BeforeRenderImageUri { get; set; }
        public string AfterRenderImageUri { get; set; }
        public string XmlName { get; set; }
    }
}
