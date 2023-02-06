using Newtonsoft.Json;
using ProjeAtlasi.Models.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Web.WebSockets;

namespace ProjeAtlasi.Controllers.Admin
{
    [AllowAnonymous]
    public class AdminLoginController : Controller
    {
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        //Admin post işlemi.
        [HttpPost]
        public async Task<JsonResult> Login(Admins admin)
        {
            using (ProjeAtlasEntities db = new ProjeAtlasEntities())
            {
                var getAdmin = await db.Admins.FirstOrDefaultAsync(x => x.AdminEmail == admin.AdminEmail && x.AdminPassword == admin.AdminPassword);
                
                if (getAdmin != null)
                {
                    FormsAuthentication.SetAuthCookie(admin.AdminEmail, true);
                    return Json(new { auth = true });
                }
                else
                {
                    Response.StatusCode = 500;
                    return Json(new { auth = false });
                }

            }
        }

        [HttpPost]
        public JsonResult Logout()
        {
            FormsAuthentication.SignOut();
            return Json(new { logout = true });
        }
    }
}