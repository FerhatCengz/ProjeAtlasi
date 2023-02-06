export const AdminLayout = {
  template: `<nav class="navbar navbar-expand-lg navbar-dark bg-info">
    <a class="navbar-brand" href="#">Anasayfa</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="#">İletişme Geçenler</a>
            </li>
        </ul>
       <div class='p-3'>
       
       <!-- Çıkış Yap-->
            <button class='btn btn-light' @click="logOut">Çıkış Yap</button>
       </div>
    </div>
</nav>`,

  methods: {
    logOut() {
      Swal.fire({
        title: "Çıkış Yapmayı Onaylıyor musun ?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.showLoading();
          axios
            .post("/AdminLogin/Logout")
            .then((result) => {
              window.location.href = "/AdminLogin/Login";
            })
            .catch((err) => {
              Swal.fire("Yanlış Giden Bir Şeyler Var Lütfen Terkar Deneyiniz", "", "error");
            });
        }
      });
    },
  },
};
