export const WhoUsComponent = {
  template: `<section id="why-us" class="why-us">
    <div class="container" data-aos="fade-up">
      <div class="section-header">

        <h2 style="margin-top: 100px;">Neden Bizimle Olmalısın ?</h2>

      </div>

      <div class="row g-0" data-aos="fade-up" data-aos-delay="200">

        <div class="col-xl-5 img-bg" style="background-image: url('/Content/assets/img/why-us-bg.jpg')"></div>
        <div class="col-xl-7 slides  position-relative">

          <div class="slides-1 swiper">
            <div class="swiper-wrapper">

              <div class="swiper-slide">
                <div class="item">
                  <h3 class="mb-3">Fikirlerinizin Değerlendirilmesi</h3>
                  <p>Projeleriniz için en iyi değerlendirmeyi arıyorsanız, doğru yerdesiniz. Biz, projelerinizi en
                    ince ayrıntısına kadar inceleyerek size en iyi fikirleri sunuyoruz. Ayrıca, projelerinizi başarıya
                    ulaşması için size yardımcı olmak için buradayız. Size özel fırsatlar, tavsiyeler ve destek
                    sunuyoruz. Bizimle olmak, projelerinizin en iyi sonucu elde etmenin garantisidir.</p>
                </div>
              </div><!-- End slide item -->

              <div class="swiper-slide">
                <div class="item">
                  <h3 class="mb-3">Hayal Edilen Projeyi Gerçeğe Dönüştürme Fırastı</h3>
                  <p>Hayal ettiğiniz projeyi gerçeğe dönüştürmek istiyorsanız, bizimle çalışın. Profesyonel ekibimiz
                    ve farklı yaklaşımlarımız, projelerinizin potansiyelini keşfetmenize ve hayal ettiğiniz sonuca
                    ulaşmanıza yardımcı olacak. Her aşamada size destek verecek ve en iyi fikirleri sunacak olan
                    ekibimiz, projelerinizin pazarlaması, finansmanı ve başarısı gibi konuları da ele alacak. Bizimle
                    çalışmak, hayal ettiğiniz projeyi gerçeğe dönüştürmenize yardımcı olacak.</p>
                </div>
              </div><!-- End slide item -->

              <div class="swiper-slide">
                <div class="item">
                  <h3 class="mb-3">Farklı Bir Yaklaşımla Başarıya Ulaşın</h3>
                  <p>Projelerinizin potansiyelini keşfetmek istiyorsanız, farklı bir yaklaşımla başarıya
                    ulaşabilirsiniz. Bizimle çalışmak, sıradışı fikirler, profesyonel destek ve fırsatlar sunar.
                    Projelerinizin her aşamasında yanınızda olan ekibimiz, size en iyi fikirleri sunacak ve
                    projelerinizin pazarlaması, finansmanı ve başarısı gibi konuları da ele alacak. Bizimle olmak,
                    projelerinizin farklı ve başarılı bir yolculuğa çıkmasını sağlar.</p>
                </div>
              </div><!-- End slide item -->

            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>

      </div>

    </div>
  </section>
  `,

  mounted() {
    new Swiper(".slides-1", {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    /**
     * Init swiper slider with 3 slides at once in desktop view
     */
    new Swiper(".slides-3", {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40,
        },

        1200: {
          slidesPerView: 3,
        },
      },
    });
  },
};
