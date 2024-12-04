import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { FontAwesomeIcon } from "font-awesome";

createApp( App )
	.component( "FontAwesomeIcon", FontAwesomeIcon )
	.mount("#app" );
