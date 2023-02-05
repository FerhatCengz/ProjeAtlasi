using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjeAtlasi.Controllers.Admin
{
    public class AdminLoginController : Controller
    {
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }
    }
}