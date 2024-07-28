import { HtmlObject } from "./HtmlObject";

export interface GameDOM {
    heroVal: HtmlObject,
    pxadd: number,
    walls: Array<HtmlObject>,
    enemies: Array<HtmlObject>,
    end: any
}