"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HbsRenderService = void 0;
const core_1 = require("@angular/core");
let HbsRenderService = class HbsRenderService {
    handlebarsInstance;
    constructor() {
        this.initializeHandlebars();
    }
    initializeHandlebars() {
        this.handlebarsInstance = Handlebars.create();
        this.registerHelpers();
    }
    registerHelpers() {
        this.handlebarsInstance.registerHelper('compare', (left, operator, right, options) => {
            let result;
            switch (operator) {
                case '===':
                    result = left === right;
                    break;
                case '!==':
                    result = left !== right;
                    break;
                case '<':
                    result = left < right;
                    break;
                case '>':
                    result = left > right;
                    break;
                case '<=':
                    result = left <= right;
                    break;
                case '>=':
                    result = left >= right;
                    break;
                default:
                    result = false;
            }
            return result ? options.fn(this) : options.inverse(this);
        });
        this.handlebarsInstance.registerHelper('unless', (conditional, options) => {
            return !conditional ? options.fn(this) : options.inverse(this);
        });
        this.handlebarsInstance.registerHelper('each', (context, options) => {
            let ret = '';
            for (let i = 0; i < context.length; i++) {
                ret += options.fn(context[i], { data: { index: i } });
            }
            return ret;
        });
        this.handlebarsInstance.registerHelper('if', (conditional, options) => {
            return conditional ? options.fn(this) : options.inverse(this);
        });
        this.handlebarsInstance.registerHelper('relativeURL', (depth, page) => {
            let url = '';
            for (let i = 0; i < depth; i++) {
                url += '../';
            }
            return url + (page || '');
        });
        this.handlebarsInstance.registerHelper('t', (key) => {
            const translations = {
                'info': 'Information',
                'source': 'Source',
                'example': 'Example',
                'template': 'Template',
                'styles': 'Styles',
                'component': 'Component',
                'module': 'Module',
                'overview': 'Overview',
                'components': 'Components',
                'modules': 'Modules',
                'file': 'File',
                'description': 'Description',
                'selector': 'Selector',
                'properties': 'Properties',
                'methods': 'Methods',
                'inputs': 'Inputs',
                'outputs': 'Outputs'
            };
            return translations[key] || key;
        });
        this.handlebarsInstance.registerHelper('orLength', (...args) => {
            const options = args[args.length - 1];
            const values = args.slice(0, -1);
            for (const value of values) {
                if (value && value.length && value.length > 0) {
                    return options.fn(this);
                }
            }
            return options.inverse(this);
        });
        this.handlebarsInstance.registerHelper('isTabEnabled', (navTabs, tabId, options) => {
            const tab = navTabs && navTabs.find((t) => t.id === tabId);
            return tab ? options.fn(this) : options.inverse(this);
        });
        this.handlebarsInstance.registerHelper('isInitialTab', (navTabs, tabId, options) => {
            const isInitial = navTabs && navTabs.length > 0 && navTabs[0].id === tabId;
            return isInitial ? options.fn(this) : options.inverse(this);
        });
    }
    renderTemplate(templateContent, data) {
        try {
            const template = this.handlebarsInstance.compile(templateContent);
            const rendered = template({ data });
            return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Template Preview</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .preview-wrapper { border: 1px solid #ddd; padding: 20px; }
            .preview-notice { background: #f0f8ff; padding: 10px; margin-bottom: 20px; border-left: 4px solid #007bff; }
          </style>
        </head>
        <body>
          <div class="preview-notice">
            <strong>Template Preview:</strong> This is a live preview of your template with mock data.
          </div>
          <div class="preview-wrapper">
            ${rendered}
          </div>
        </body>
        </html>
      `;
        }
        catch (error) {
            return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Template Preview - Error</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .error { color: red; background: #fff5f5; padding: 20px; border: 1px solid #red; }
          </style>
        </head>
        <body>
          <div class="error">
            <h3>Template Error</h3>
            <p><strong>Error:</strong> ${error.message}</p>
            <p>Please check your template syntax and try again.</p>
          </div>
        </body>
        </html>
      `;
        }
    }
    getMockData() {
        return {
            documentationMainName: 'Sample Documentation',
            depth: 0,
            context: 'component',
            components: [
                {
                    name: 'SampleComponent',
                    selector: 'app-sample',
                    file: 'src/app/sample/sample.component.ts',
                    description: 'A sample component for demonstration',
                    properties: [
                        { name: 'title', type: 'string', description: 'The component title' },
                        { name: 'isVisible', type: 'boolean', description: 'Whether the component is visible' }
                    ],
                    methods: [
                        { name: 'ngOnInit', description: 'Lifecycle hook', signature: 'ngOnInit(): void' },
                        { name: 'onClick', description: 'Handle click events', signature: 'onClick(event: MouseEvent): void' }
                    ]
                }
            ],
            navTabs: [
                { id: 'info', label: 'Info', href: '#info' },
                { id: 'source', label: 'Source', href: '#source' },
                { id: 'example', label: 'Example', href: '#example' }
            ]
        };
    }
};
exports.HbsRenderService = HbsRenderService;
exports.HbsRenderService = HbsRenderService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], HbsRenderService);
//# sourceMappingURL=hbs-render.service.js.map