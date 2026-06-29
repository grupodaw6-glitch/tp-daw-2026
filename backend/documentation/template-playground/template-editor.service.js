"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateEditorService = void 0;
const core_1 = require("@angular/core");
let TemplateEditorService = class TemplateEditorService {
    editor;
    onChangeCallback = null;
    initializeEditor(container) {
        this.editor = monaco.editor.create(container, {
            value: '',
            language: 'html',
            theme: 'vs-dark',
            automaticLayout: true,
            minimap: {
                enabled: true
            },
            scrollBeyondLastLine: false,
            fontSize: 14,
            wordWrap: 'on',
            lineNumbers: 'on',
            roundedSelection: false,
            scrollbar: {
                horizontal: 'visible',
                vertical: 'visible'
            },
            overviewRulerLanes: 2,
            quickSuggestions: {
                other: true,
                comments: true,
                strings: true
            },
            parameterHints: {
                enabled: true
            },
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            tabCompletion: 'on',
            wordBasedSuggestions: false
        });
        this.editor.onDidChangeModelContent(() => {
            if (this.onChangeCallback) {
                this.onChangeCallback(this.editor.getValue());
            }
        });
        this.registerHandlebarsLanguage();
    }
    setEditorContent(content, fileType) {
        if (this.editor) {
            const language = this.getLanguageFromFileType(fileType);
            const model = monaco.editor.createModel(content, language);
            this.editor.setModel(model);
        }
    }
    setOnChangeCallback(callback) {
        this.onChangeCallback = callback;
    }
    getLanguageFromFileType(fileType) {
        switch (fileType) {
            case 'hbs':
                return 'handlebars';
            case 'css':
            case 'scss':
                return 'css';
            case 'js':
                return 'javascript';
            case 'ts':
                return 'typescript';
            default:
                return 'html';
        }
    }
    registerHandlebarsLanguage() {
        if (monaco.languages.getLanguages().find((lang) => lang.id === 'handlebars')) {
            return;
        }
        monaco.languages.register({ id: 'handlebars' });
        monaco.languages.setMonarchTokensProvider('handlebars', {
            tokenizer: {
                root: [
                    [/\{\{\{/, { token: 'keyword', next: '@handlebars_unescaped' }],
                    [/\{\{/, { token: 'keyword', next: '@handlebars' }],
                    [/<!DOCTYPE/, 'metatag', '@doctype'],
                    [/<!--/, 'comment', '@comment'],
                    [/(<)(\w+)/, ['delimiter', { token: 'tag', next: '@tag' }]],
                    [/(<\/)(\w+)/, ['delimiter', { token: 'tag', next: '@tag' }]],
                    [/</, 'delimiter'],
                    [/[^<]+/]
                ],
                handlebars_unescaped: [
                    [/\}\}\}/, { token: 'keyword', next: '@pop' }],
                    [/[^}]+/, 'variable']
                ],
                handlebars: [
                    [/\}\}/, { token: 'keyword', next: '@pop' }],
                    [/#if|#unless|#each|#with|\/if|\/unless|\/each|\/with/, 'keyword'],
                    [/[a-zA-Z_][\w]*/, 'variable'],
                    [/[^}]+/, 'variable']
                ],
                comment: [
                    [/-->/, 'comment', '@pop'],
                    [/[^-]+/, 'comment'],
                    [/./, 'comment']
                ],
                doctype: [
                    [/[^>]+/, 'metatag.content'],
                    [/>/, 'metatag', '@pop']
                ],
                tag: [
                    [/[ \t\r\n]+/, 'white'],
                    [/(\w+)(\s*=\s*)("([^"]*)")/, ['attribute.name', 'delimiter', 'attribute.value', 'attribute.value']],
                    [/(\w+)(\s*=\s*)('([^']*)')/, ['attribute.name', 'delimiter', 'attribute.value', 'attribute.value']],
                    [/\w+/, 'attribute.name'],
                    [/>/, 'delimiter', '@pop']
                ]
            }
        });
        monaco.languages.setLanguageConfiguration('handlebars', {
            comments: {
                blockComment: ['<!--', '-->']
            },
            brackets: [
                ['<', '>'],
                ['{{', '}}'],
                ['{{{', '}}}']
            ],
            autoClosingPairs: [
                { open: '<', close: '>' },
                { open: '{{', close: '}}' },
                { open: '{{{', close: '}}}' },
                { open: '"', close: '"' },
                { open: "'", close: "'" }
            ],
            surroundingPairs: [
                { open: '<', close: '>' },
                { open: '{{', close: '}}' },
                { open: '{{{', close: '}}}' },
                { open: '"', close: '"' },
                { open: "'", close: "'" }
            ]
        });
    }
    destroy() {
        if (this.editor) {
            this.editor.dispose();
            this.editor = null;
        }
    }
};
exports.TemplateEditorService = TemplateEditorService;
exports.TemplateEditorService = TemplateEditorService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], TemplateEditorService);
//# sourceMappingURL=template-editor.service.js.map