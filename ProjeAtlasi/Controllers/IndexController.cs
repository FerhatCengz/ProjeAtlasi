using ProjeAtlasi.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ProjeAtlasi.Controllers
{
    [AllowAnonymous]
    public class IndexController : Controller
    {
        // GET: Index
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        //Post işlemleri
        [HttpPost]
        public  JsonResult Index(Contacts contacts)
        {
            using (ProjeAtlasEntities db = new ProjeAtlasEntities())
            {
                contacts.ContactDate = DateTime.Now.ToString();
                db.Contacts.Add(contacts);
                db.SaveChanges();
                return Json(new { success = true });
            }
        }
    }
}