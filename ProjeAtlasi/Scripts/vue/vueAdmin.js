import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

//Login templatin ekzlenmesi
import { LoginTemplate } from "./components/admin/login.js";
import { AdminLayout } from "./components/admin/adminLayout.js";
import { LoadingPageComponent } from "./components/pageVisit/loading.js";

//Admin Login Kısmı
const loginApp = createApp();
loginApp.component("login-template-component", LoginTemplate);
loginApp.mount("#loginApp");

//Admin Anasayfası
const adminIndexApp = createApp({
  data() {
    return {
      //Sayfanın yüklenenme kontrolü
      loadingPage: false,

      //Modal Pencerisine aktarılacak özellikler
      modalObject: {
        fullName: "",
        emailAddress: "",
        message: "",
        phoneNumber: "",
        fileURL: "",
      },
    };
  },
  methods: {
    // "Büyük Pencerede Açmak İçin Tıklayınız" ' a tıklandığında .
    messageModalShow(event, messageText, fullName, emailAddress, fileURL , phoneNumber) {
      this.modalObject.fullName = fullName;
      this.modalObject.emailAddress = emailAddress;
      this.modalObject.message = messageText;
      this.modalObject.phoneNumber = phoneNumber;
      this.modalObject.fileURL = fileURL;
    },

    //İletişim verisini sil ....
    deletedContact(event, _id) {
      //Hangi tr buttonuna tıklandığını getiriyorum.
      var parent = event.target.parentNode.parentNode;
      //Silme uyarıları
      Swal.fire({
        title: `${parent.children[0].textContent} Kişisine Ait Olan Veriyi Silmeyi Onaylıyor musunuz ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
      }).then((result) => {
        Swal.showLoading();
        //Silmek için post...
        axios
          .post("/AdminIndex/DeleteConctact", { id: Number(_id) })
          .then((result) => {
            Swal.fire("Silme İşlemi Başarılı", "", "success");
            //İlgili method kaldırıllır (silinir)
            parent.remove();
          })
          .catch((err) => {
            Swal.fire("Öğe Silinirken Bir Problem İle Karşılaştı", "", "error");
          });
      });
    },
  },
  mounted() {
    //Sayfa yüklenmiştir.
    setTimeout(() => {
      this.loadingPage = true;
    }, 1000);
  },
});
//Admin Layout
adminIndexApp.component("admin-layout-component", AdminLayout);

//Loading Göstergesi
adminIndexApp.component("loading-component", LoadingPageComponent);

adminIndexApp.mount("#adminIndexApp");
