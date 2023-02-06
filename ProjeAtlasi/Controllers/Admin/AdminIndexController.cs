using ProjeAtlasi.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ProjeAtlasi.Controllers.Admin
{

    public class AdminIndexController : Controller
    {
        // GET: AdminIndex
        [HttpGet]
        public ActionResult AdminIndex()
        {
            //İletişim tablosunun verilerini döndürür.
            using (ProjeAtlasEntities db = new ProjeAtlasEntities())
            {
                return View(db.Contacts.ToList());
            }
        }

        [HttpPost]

        public async Task<JsonResult> DeleteConctact(int id)
        {
            using (ProjeAtlasEntities db = new ProjeAtlasEntities())
            {
                var getContactQuery = await db.Contacts.FindAsync(id);

                if (getContactQuery != null)
                {
                    db.Contacts.Remove(getContactQuery);
                    db.SaveChanges();
                    return Json(new { success = true });
                }
                else
                {
                    Response.StatusCode = 500;
                    return Json(null);
                }

            }
        }

    }
}