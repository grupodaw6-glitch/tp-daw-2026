export declare class HbsRenderService {
    private handlebarsInstance;
    constructor();
    private initializeHandlebars;
    private registerHelpers;
    renderTemplate(templateContent: string, data: any): string;
    getMockData(): any;
}
