//Firebase Storage import edilmesi
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable /*Bu dosyayı yüklerken duraklatama sürdürme iptal etme gibi vs şeyleri ele alıyor*/, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2CRGgvfsg8UWISL8g65xEv3PB641m9Wk",
  authDomain: "projeatlas-92191.firebaseapp.com",
  projectId: "projeatlas-92191",
  storageBucket: "projeatlas-92191.appspot.com",
  messagingSenderId: "281631043548",
  appId: "1:281631043548:web:a7789e442ed14cadea6919",
};

const firebaseInitializeApp = initializeApp(firebaseConfig);

export const ContactComponent = {
  data() {
    return {
      stateSubmit: false,
      //Dropzone object
      dropzone: null,

      dropzoneObject: {
        //dropzoneMainObject Dropzone'nin mevcut değerlerini alır örn : Dosya idisi , dosya adı , dosya tibi vs...
        dropzoneMainObject: {
          fileID: "",
          fileName: "",
        },
        //dropzoneBlobObejct : Dropzone'nin üzerine bir dosya eklendiğinde dataURL üretir ve bunu formSubmite taşımak için Blob türüne atarız.
        dropzoneBlobObject: null,
      },

      //Dosyanın yüklenme  yüzdesi
      childProgressPercent: 0,

      //Form doğrulama işlemleri
      fromObject: {
        FullName: "",
        EmailAddress: "",
        Subject: "",
        PhoneNumber: "",
        Message: "",
        /* 
        Bot objesi bilerek koyulmuştur. Bot scriptlerin önüne geçmesi için (input hidden türünde oluşturulmuştur)
        Eğer bu alan doluysa o zaman bir insan değil bir bot olduğu anlaşılır
        */
        bot: "",
      },
    };
  },

  template: `
  <section id="contact" class="contact">
  <div class="container position-relative" data-aos="fade-up">

    <div class="row gy-4 d-flex justify-content-end">

      <div class="col-lg-5" data-aos="fade-up" data-aos-delay="100">

        <div class="info-item d-flex">
          <i class="bi bi-geo-alt flex-shrink-0"></i>
          <div>
            <h4>Lokasyon :</h4>
            <p>Şişli/İstanbul</p>
          </div>
        </div><!-- End Info Item -->

        <div class="info-item d-flex">
          <i class="bi bi-envelope flex-shrink-0"></i>
          <div>
            <h4>Email :</h4>
            <a href="mailto:iletisim@ogrencikariyeri.com" class="text-muted">iletisim@ogrencikariyeri.com</a>
          </div>
        </div><!-- End Info Item -->

        <div class="info-item d-flex">
          <i class="bi bi-phone flex-shrink-0"></i>
          <div>
            <h4>Telefon No:</h4>
            <a href="tel:+908508882234" class="text-muted">+90 850 888 22 34</a>
          </div>
        </div><!-- End Info Item -->

      </div>

      <div class="col-lg-6" data-aos="fade-up" data-aos-delay="250">

        <form onsubmit="return false" :style='formDisabledCss' method="post" role="form" class="php-email-form">
          <div class="row">
            <div class="col-md-6 form-group">
              <input v-model="fromObject.FullName" type="text" name="name" class="form-control" id="name" placeholder="Tam Adınız">
            </div>
            <div class="col-md-6 form-group mt-3 mt-md-0">
              <input v-model="fromObject.EmailAddress" type="text" class="form-control" name="email" id="email" placeholder="E-Mail Adresiniz"
              >
            </div>
          </div>
          <div class="form-group mt-3">
            <input v-model="fromObject.Subject" type="text" class="form-control" name="Subject" id="Subject" placeholder="Başlık">
          </div>
          <div class="form-group mt-3">
            <input v-model="fromObject.PhoneNumber" type="tel" class="form-control" name="Subject" id="telNo" placeholder="Telefon Numaranız">
          </div>
          <div class="form-group mt-3">
            <textarea v-model="fromObject.Message" class="form-control" name="message" rows="5" placeholder="Açıklama"></textarea>
            <p :class='fromObject.Message.length >= 1500 ? "text-danger" : "" '>{{fromObject.Message.length}} / 1500</p>
          </div>

          <input type='hidden' v-model="fromObject.bot">

          <!--- Dropzone  --->
          <div class="dropzone"></div>

          <div class="text-center" v-if="!stateSubmit">
              <!-- Form Submit Method -->
              <button @click="formSubmit" type="submit" class='mt-4'>İletiyi Gönder</button>
          </div>

          <!--Yükleme işleminin loadingbarı --->
        <div v-else>
              <div class="progress mt-4">
                    <div class="progress-bar" role="progressbar" :style="{width: childProgressPercent + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{childProgressPercent}}%</div>
              </div>
        </div>

        </form>

      </div><!-- End Contact Form -->
    </div>

  </div>
</section>
`,

  methods: {
    formReset() {
      for (const formValue in this.fromObject) {
        this.fromObject[formValue] = "";
      }
    },
    async formSubmit(props) {
      let errorMessage = "";
      for (const errors in this.validationControl) {
        errorMessage += this.validationControl[errors][0];
        break;
      }

      //Bot objesi ve doğrulama kontrol

      if (!this.validationControl && this.fromObject.bot.length == 0 && !this.dropzoneObject.dropzoneBlobObject) {
        this.axiosPost();
      }

      //Dropzone'ye bir dosya eklenmiş ve doğrulama işlemi başarılıysa ...
      else if (!this.validationControl && this.fromObject.bot.length == 0 && this.dropzoneObject.dropzoneBlobObject) {
        //stateSubmit Progcess Gösterir
        this.stateSubmit = true;
        const dropzoneBlobFile = this.dropzoneObject.dropzoneBlobObject;
        const dropzoneMainProperty = this.dropzoneObject.dropzoneMainObject;
        this.fileUpload(`ProjeAtlasi/${this.fromObject.EmailAddress}`, dropzoneBlobFile, dropzoneMainProperty.fileID + "_" + dropzoneMainProperty.fileName);
      } else {
        Swal.fire(errorMessage, "Bu Alanı Doldurmak Zorunludur", "warning");
      }
    },
    //Dosya yükleme işemleri...
    fileUpload(refPath, file, fileName) {
      //Firebase Storage içeren bir başlangıç noktası
      const storage = getStorage();
      //Dosyanın yüklenecek yolu referans almak
      const storageRef = ref(storage, refPath + "/" + fileName);
      //Dosyayı yükeleme kısmı
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //Dosyanın yüklenme yüzdesi
          this.childProgressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log("Upload is " + this.childProgressPercent + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Durduldu !");
              break;
            case "running":
              console.log("Yükleme İşlemi Başaldı");
              break;
          }
        },
        (error) => {
          console.log("error => ", error);
        },
        () => {
          //Yüklenen dosyanın linkinin alınması
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Yüklenen Dosya Linki => ", downloadURL);
            //Url verildikten sonra post edilsin
            Object.assign(this.fromObject, { FileURL: downloadURL });
            this.axiosPost();
            this.stateSubmit = false;
          });
        }
      );
    },

    //Axios işlemi
    async axiosPost() {
      Swal.showLoading();
      await axios
        .post("/Index/Index", this.fromObject)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          Swal.fire("Bir Şeyler Yanlış Gitti Lütfen Tekrar Deneyin", "", "error");
        })
        .finally(() => {
          Swal.fire("Bilgileriniz Başarıyla İletildi !", "İletişiminiz Bize Ulaşmıştır İlgili Ekibimiz En Kısa Sürede Sizin İle Görüşme Sağlayacaktır.", "success");
          this.formReset();
        });
    },
  },
  computed: {
    //Form kısıtlamaların tanımlanması (validate.js) kullanılmıştır.
    validationControl() {
      const constraints = {
        FullName: {
          presence: {
            allowEmpty: false,
            message: "Kullanıcı adı gereklidir",
          },
          length: {
            minimum: 5,
            message: "En az 5 karakter olmalıdır",
          },
        },
        EmailAddress: {
          presence: {
            allowEmpty: false,
            message: "Email gereklidir",
          },
          email: {
            message: "Geçerli bir email adresi olmalıdır",
          },
        },
        
        Subject: {
          presence: {
            allowEmpty: false,
            message: "Başlık Kısmını Yazınız",
          },
          length: {
            minimum: 3,
            maximum:20,
            message: "Başlık Kısmınız En Az 3 Karakter En Fazla 20 Karakter Olacak Şekilde Sade Ve Öz Olamalı",
          },
        },
        PhoneNumber: {
          presence: {
            allowEmpty: false,
            message: "Lütfen Sizin İle İletişime Geçeceğimiz Bir Telefon Numarası Giriniz",
          },
          length: {
            minimum: 11,
            message: "Lütfen Geçerli Bir Telefon Numarası Giriniz",
          },
          format: {
            pattern: /^\d+$/,
            message: "Geçerli bir telefon numarası girin (örn: 05551234567)",
          },
        },
        Message: {
          presence: {
            allowEmpty: false,
            message: "Lütfen Daha Ayrıntılı Bir Mesaj Gönderin",
          },
          length: {
            minimum: 50,
            message: "Mesaj Kısmınız En Az 50 Karakter En Fazla 1500 Karakter Olacak Şekilde Kapsamlı Bir Özet Olmalı",
            maximum: 1500,
          },
        },
      };

      return validate(this.fromObject, constraints, { fullMessages: false });
    },

    formDisabledCss() {
      return this.stateSubmit ? { "pointer-events": "none", opacity: "0.65" } : null;
    },
  },
  mounted() {
    
    Dropzone.autoDiscover = false;

    //Dropzonu başlat
    this.dropzone = new Dropzone(".dropzone", {
      url: "/Index/Index",
      maxFiles: 1,
      addRemoveLinks: true,
      autoProcessQueue: false,
      paramName: "file",
      dictDefaultMessage: "Dosyanızı (Sürükle / Bırak) Yaparakta Yükleyebilirsiniz",
      maxFiles: 1,
      dictMaxFilesExceeded: "En fazla 1 Dosya Gönderebilirsiniz",
      maxFilesize: 15,
      dictFileTooBig: "Dosya boyutu fazla - Max : 15 MB",
      acceptedFiles: ".rar , .docx , .pdf,image/jpeg,image/png,image/gif,.zip",
      dictInvalidFileType: "Geçersiz Dosya Tipi",
      dictRemoveFile: "Dosyayı Kaldır",
    });

    //Dropzone'nin üzerine bir dosya eklendiğinde ...
    this.dropzone.on("addedfile", (file) => {
      //Dropzone özelliklerini property'de tutmak
      this.dropzoneObject.dropzoneBlobObject = new Blob([file], { type: file.type });
      this.dropzoneObject.dropzoneMainObject = { fileID: file.upload.uuid, file, fileName: file.name };
    });
    this.dropzone.on("removedfile", (file) => {
      this.dropzoneObject.dropzoneMainObject = { fileID: "", file, fileName: "" };
      this.dropzoneObject.dropzoneBlobObject = null;
    });
  },
};
