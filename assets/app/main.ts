import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from "./modules/app.modules";

platformBrowserDynamic().bootstrapModule(AppModule);