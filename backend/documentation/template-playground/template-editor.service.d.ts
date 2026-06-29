export declare class TemplateEditorService {
    private editor;
    private onChangeCallback;
    initializeEditor(container: HTMLElement): void;
    setEditorContent(content: string, fileType: string): void;
    setOnChangeCallback(callback: (value: string) => void): void;
    private getLanguageFromFileType;
    private registerHandlebarsLanguage;
    destroy(): void;
}
