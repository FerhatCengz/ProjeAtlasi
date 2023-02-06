export const LayoutComponent = {
  template: `<header id="header" class="header d-flex align-items-center fixed-top">
  <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

    <a href="index.html" class="logo d-flex align-items-center">
      <!-- Uncomment the line below if you also wish to use an image logo -->
      <!-- <img src="assets/img/logo.png" alt=""> -->
      <!-- <h1 class="d-flex align-items-center">Nova</h1> -->
      <!-- <img class="d-flex align-items-center"> -->
      <svg width="281px" height="60px" viewBox="0 0 281 60" version="1.1">
        <title>Logo</title>
        <desc>Created with Sketch.</desc>
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-315.000000, -40.000000)">
            <g>
              <g id="logo" transform="translate(315.000000, 40.000000)">
                <text id="Keystroke-Startup-la" font-family="DMSans-Bold, DM Sans" font-size="20" font-weight="bold"
                  fill="#fff">
                  <tspan x="76.16" y="49.5001221" font-family="DMSans-Regular, DM Sans" font-size="28"
                    font-weight="bold">Proje
                    <tspan font-weight="normal" x="137.16" y="49.5001221">
                      &nbsp;&nbsp;ATLASI
                      <tspan font-weight="bold" font-size="20" fill="#00a181">
                        ■
                      </tspan>
                    </tspan>
                  </tspan>
                </text>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </a>

    <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
    <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

    <nav id="navbar" class="navbar">
      <ul>
        <li><a href="index.html#">Anasayfa</a></li>
        <li><a href="#why-us">Neden Bizimle Olmalısın</a></li>
        <li><a href="#services-list">Hizmetlerimiz</a></li>
        <li><a href="#features">Güçümüz</a></li>
        <li><a href="#team">Takım Liderlerimiz</a></li>
        <li><a href="#contact">İletişim</a></li>
      </ul>
    </nav><!-- .navbar -->

  </div>
</header>

`,

  mounted() {
    /**
     * Sticky header on scroll
     */
    const selectHeader = document.querySelector("#header");
    if (selectHeader) {
      document.addEventListener("scroll", () => {
        window.scrollY > 100
          ? selectHeader.classList.add("sticked")
          : selectHeader.classList.remove("sticked");
      });
    }

    /**
     * Mobile nav toggle
     */
    const mobileNavShow = document.querySelector(".mobile-nav-show");
    const mobileNavHide = document.querySelector(".mobile-nav-hide");

    document.querySelectorAll(".mobile-nav-toggle").forEach((el) => {
      el.addEventListener("click", function (event) {
        event.preventDefault();
        mobileNavToogle();
      });
    });

    function mobileNavToogle() {
      document.querySelector("body").classList.toggle("mobile-nav-active");
      mobileNavShow.classList.toggle("d-none");
      mobileNavHide.classList.toggle("d-none");
    }

    /**
     * Toggle mobile nav dropdowns
     */
    const navDropdowns = document.querySelectorAll(".navbar .dropdown > a");

    navDropdowns.forEach((el) => {
      
      el.addEventListener("click", function (event) {
        if (document.querySelector(".mobile-nav-active")) {
          event.preventDefault();
          this.classList.toggle("active");
          this.nextElementSibling.classList.toggle("dropdown-active");

          let dropDownIndicator = this.querySelector(".dropdown-indicator");
          dropDownIndicator.classList.toggle("bi-chevron-up");
          dropDownIndicator.classList.toggle("bi-chevron-down");
        }
      });
    });

    /**
     * Scroll top button
     */
    const scrollTop = document.querySelector(".scroll-top");
    if (scrollTop) {
      const togglescrollTop = function () {
        window.scrollY > 100
          ? scrollTop.classList.add("active")
          : scrollTop.classList.remove("active");
      };
      window.addEventListener("load", togglescrollTop);
      document.addEventListener("scroll", togglescrollTop);
      scrollTop.addEventListener(
        "click",
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      );
    }
  },
};
