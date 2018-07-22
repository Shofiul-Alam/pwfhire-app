import {LeftSidebarMenuItem} from './LeftSidebarMenuItem';
import {forEach} from '@angular/router/src/utils/collection';

export class LeftSidebarSubMenu {

    public submenu: Array<LeftSidebarMenuItem> = new Array<LeftSidebarMenuItem>();
    public subMenuTitle: any = '';
    public subMenuIcon: any = '';
    public subMenuLink: any = '';
    public subMenuCssClass: Array<string> = [];

    constructor(subItems?: Array<LeftSidebarMenuItem>, subMenuTitle?: any, subIcon?: any, subLink?: any, subMenuCssClass?: Array<string>) {
        if (subItems != null && subItems.length > 0) {
            for (const item of subItems) {
                this.submenu.push(item);
            }
        }
            this.subMenuTitle = subMenuTitle;
            this.subMenuIcon = subIcon;
            if (subMenuCssClass != null && subMenuCssClass.length > 0) {
                for (const subMenuCss of subMenuCssClass)
                this.subMenuCssClass.push(subMenuCss);
            }

            this.subMenuLink = subLink;
    }
}
