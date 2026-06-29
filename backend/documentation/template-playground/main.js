"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const template_playground_module_1 = require("./template-playground.module");
document.addEventListener('DOMContentLoaded', () => {
    (0, platform_browser_dynamic_1.platformBrowserDynamic)()
        .bootstrapModule(template_playground_module_1.TemplatePlaygroundModule)
        .catch(err => console.error('Error starting template playground:', err));
});
//# sourceMappingURL=main.js.map