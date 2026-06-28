"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatePlaygroundModule = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
const template_playground_component_1 = require("./template-playground.component");
const template_editor_service_1 = require("./template-editor.service");
const zip_export_service_1 = require("./zip-export.service");
const hbs_render_service_1 = require("./hbs-render.service");
let TemplatePlaygroundModule = class TemplatePlaygroundModule {
};
exports.TemplatePlaygroundModule = TemplatePlaygroundModule;
exports.TemplatePlaygroundModule = TemplatePlaygroundModule = __decorate([
    (0, core_1.NgModule)({
        declarations: [
            template_playground_component_1.TemplatePlaygroundComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpClientModule
        ],
        providers: [
            template_editor_service_1.TemplateEditorService,
            zip_export_service_1.ZipExportService,
            hbs_render_service_1.HbsRenderService
        ],
        bootstrap: [template_playground_component_1.TemplatePlaygroundComponent]
    })
], TemplatePlaygroundModule);
//# sourceMappingURL=template-playground.module.js.map