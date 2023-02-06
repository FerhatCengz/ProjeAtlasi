//Vue.js cdn'sinin ve diğer componentlerin import edilmesi
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { LayoutComponent } from "./components/pageVisit/layout.js";
import { HeaderHero } from "./components/pageVisit/headerHero.js?v1.0";
import { ServiceComponent } from "./components/pageVisit/service.js";
import { TeamComponent } from "./components/pageVisit/team.js";
import { ContactComponent } from "./components/pageVisit/contact.js?v1.3";
import { FooterComponent } from "./components/pageVisit/footer.js";
import { WhoUsComponent } from "./components/pageVisit/whoUs.js";
import { FeaturesComponent } from "./components/pageVisit/features.js";
import { LoadingPageComponent } from "./components/pageVisit/loading.js";

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
