
export class LeftSidebarMenuItem {

    public label: any = '';
    public icon: any = '';
    public link: any = '';
    public cssClass: Array<string> = Array<string>();
    constructor(label, icon, link, cssClass: Array<string>) {
        this.label = label;
        this.icon = icon;
        this.link = link;
        if (cssClass.length) {
            for (const css of cssClass) {
                this.cssClass.push(css);
            }
        }
    }
}
