export const LoginTemplate = {
  template: `
    
   <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6 text-center mb-5">
                    <h2 class="heading-section">Admin Girişi</h2>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-5">
                    <div class="login-wrap p-4 p-md-5">
                        <div class="icon d-flex align-items-center justify-content-center">
                            <span class="fa fa-user-o"></span>
                        </div>
                        <form onsubmit="return false" class="login-form mt-4">
                            <div class="form-group">
                                <input v-model='formObject.AdminEmail' type="text" class="form-control rounded-left" placeholder="E-Mail Adresi">
                            </div>
                            <div class="form-group d-flex">
                                <input v-model='formObject.AdminPassword' type="password" class="form-control rounded-left" placeholder="Parolanız">
                            </div>
                        
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary rounded submit p-3 px-5" @click='loginAuth'>Giriş Yap</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>  
    

    <admin-layout-component></admin-layout-component>
    `,

  data() {
    return {
      formObject: {
        AdminEmail: "",
        AdminPassword: "",
      },
    };
  },
  methods: {
    loginAuth() {
      Swal.showLoading();
      axios
        .post("/AdminLogin/Login", this.formObject)
        .then((result) => {
          Swal.fire("Giriş İşlemi Başarılı", "Admin Paneline Yöneliyorsun", "success");
          setTimeout(() => {
            window.location.href = "/AdminIndex/AdminIndex/";
          }, 1000);
        })
        .catch((err) => {
          Swal.fire("Kullanıcı Adı Ve Parola Hatalı", "Lütfen Tekrar Deneyin", "warning");
        });
    },
  },
};
