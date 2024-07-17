import { HtmlObject } from "./HtmlObject";

export interface GameDOM {
    hero: HtmlObject,
    pxadd: number,
    left: number,
    top: number,
    walls: Array<HtmlObject>,
    enemies: Array<HtmlObject>,
    end: any
}