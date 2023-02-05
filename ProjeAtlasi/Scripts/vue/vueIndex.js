//Vue.js cdn'sinin ve diğer componentlerin import edilmesi
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { LayoutComponent } from "./components/layout.js";
import { HeaderHero } from "./components/headerHero.js";
import { ServiceComponent } from "./components/service.js";
import { TeamComponent } from "./components/team.js";
import { ContactComponent } from "./components/contact.js?v1.3";
import { FooterComponent } from "./components/footer.js";
import { WhoUsComponent } from "./components/whoUs.js";
import { FeaturesComponent } from "./components/features.js";
import { LoadingPageComponent } from "./components/loading.js";


//Vue instance
const app = createApp({
  data() {
    return {
      loaded: false,
    };
  },

  //DOM yüklendiğinde ...
  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 1500);
  },
});

//Component adlandırılması ve tanımlaması
app.component("layout-component", LayoutComponent);
app.component("header-component", HeaderHero);
app.component("service-component", ServiceComponent);
app.component("team-component", TeamComponent);
app.component("contact-component", ContactComponent);
app.component("footer-component", FooterComponent);
app.component("who-component", WhoUsComponent);
app.component("features-component", FeaturesComponent);
app.component("loading-component", LoadingPageComponent);

app.mount("#app");
