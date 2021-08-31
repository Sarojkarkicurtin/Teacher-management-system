using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Teacher_management_system.DbCon;
using Teacher_management_system.Models;

namespace Teacher_management_system.Controllers
{
    public class HomeController : Controller
    {
        DbConn conn = new DbConn();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [HttpPost]
        public ActionResult GetSalutation()
        {
            List<Salutation> SList = conn.SalutationData();
            return Json(new JsonResult { Data = SList, JsonRequestBehavior = JsonRequestBehavior.DenyGet });
        }
        [HttpPost]
        public ActionResult GetNationality()
        {
            List<NationalityM> NList = conn.NationalityTypeData();
            return Json(new JsonResult { Data = NList, JsonRequestBehavior = JsonRequestBehavior.DenyGet });
        }
        [HttpPost]
        public ActionResult GetAddressType()
        {
            List<AddressTypeM> ADList = conn.AddressTypeData();
            return Json(new JsonResult { Data = ADList, JsonRequestBehavior = JsonRequestBehavior.DenyGet });
        }
        [HttpPost]
        public ActionResult GetProvince()
        {
            List<ProvinceM> PRList = conn.ProvinceData();
            return Json(new JsonResult { Data = PRList, JsonRequestBehavior = JsonRequestBehavior.DenyGet });
        }
        [HttpPost]
        public ActionResult GetCity()
        {
            List<CityM> CTList = conn.CityData();
            return Json(new JsonResult { Data = CTList, JsonRequestBehavior = JsonRequestBehavior.DenyGet });
        }
        [HttpPost]
        public ActionResult GetClass()
        {
            List<ClassM> CSList = conn.ClassData();
            return Json(new JsonResult { Data = CSList, JsonRequestBehavior = JsonRequestBehavior.DenyGet });
        }
        [HttpPost]
        public ActionResult GetSection()
        {
            List<SectionM> STList = conn.SectionData();
            return Json(new JsonResult { Data = STList, JsonRequestBehavior = JsonRequestBehavior.DenyGet });
        }
        public ActionResult GetJsonData(Teacherinfo data)
        {
            string message;
            conn.SaveData(data, out message);
            return Json(new JsonResult { Data = message });
            //return Json(data);
        }
        [HttpPost]
        public ActionResult GetJsonDetail()
        {
            List<Detail> TeacherList = conn.GetData();
            return Json(new JsonResult { Data = TeacherList, JsonRequestBehavior = JsonRequestBehavior.DenyGet });
        }

        [HttpPost]

        public ActionResult FetchDetails(int? id)
        {
            Teacherinfo AllDataList = conn.Editmydata(id);
            return Json(new JsonResult { Data = AllDataList, JsonRequestBehavior = JsonRequestBehavior.DenyGet });
        }

        [HttpPost]
        public ActionResult GetDeletedata(int? id)

        {
            string message;
            conn.Deletedata(id, out message);
            return Json(new JsonResult { Data = message });
            //return Json(data);

        }

        [HttpGet]
        public JsonResult AllDataList(int pq_rpp, int pq_curpage)
        {
            FinalResult response = new FinalResult();

            try
            {
                PQMODEL requestData = new PQMODEL
                {
                    RowPerPage = pq_rpp,
                    CurrentPage = pq_curpage
                };

                PQResult<PqFinalResult> finalData = conn.GetAllData(requestData);

                //  SearchCollectorAreaGraceResult<CollectorAreaGraceMasterData> searchResult = bl.GetList(requestData, 0); // 0 for Unapproved

                response.Data = finalData.Records;
                return Json(new { Success = true, response.Data, CurrentPage = pq_curpage, TotalRecords = finalData.TotalCount }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

            }
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }

}
