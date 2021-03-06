import { Group } from "../../scene/group";
import { LegendDatum } from "../legend";
import { Shape } from "../../scene/shape/shape";
import { Observable } from "../../util/observable";
import { ChartAxis, ChartAxisDirection } from "../chartAxis";
import { Chart } from "../chart";
/**
 * `D` - raw series datum, an element in the {@link Series.data} array.
 * `SeriesNodeDatum` - processed series datum used in node selections,
 *                     contains information used to render pie sectors, bars, line markers, etc.
 */
export interface SeriesNodeDatum {
    seriesDatum: any;
}
export interface TooltipRendererParams {
    datum: any;
    title?: string;
    color?: string;
}
export interface CartesianTooltipRendererParams extends TooltipRendererParams {
    xKey: string;
    xName?: string;
    yKey: string;
    yName?: string;
}
export interface PolarTooltipRendererParams extends TooltipRendererParams {
    angleKey: string;
    angleName?: string;
    radiusKey?: string;
    radiusName?: string;
}
export interface HighlightStyle {
    fill?: string;
    stroke?: string;
}
export declare abstract class Series extends Observable {
    readonly id: string;
    /**
     * The group node that contains all the nodes used to render this series.
     */
    readonly group: Group;
    chart?: Chart;
    xAxis: ChartAxis;
    yAxis: ChartAxis;
    directions: ChartAxisDirection[];
    directionKeys: {
        [key in ChartAxisDirection]?: string[];
    };
    tooltipEnabled: boolean;
    data: any[];
    visible: boolean;
    showInLegend: boolean;
    /**
     * Returns the actual keys used (to fetch the values from `data` items) for the given direction.
     */
    getKeys(direction: ChartAxisDirection): string[];
    private createId;
    abstract getDomain(direction: ChartAxisDirection): any[];
    abstract processData(): boolean;
    abstract update(): void;
    abstract getTooltipHtml(nodeDatum: SeriesNodeDatum): string;
    /**
     * @private
     * Populates the given {@param data} array with the items of this series
     * that should be shown in the legend. It's up to the series to determine
     * what is considered an item. An item could be the series itself or some
     * part of the series.
     * @param data
     */
    abstract listSeriesItems(data: LegendDatum[]): void;
    toggleSeriesItem(itemId: any, enabled: boolean): void;
    abstract highlightNode(node: Shape): void;
    abstract dehighlightNode(): void;
    readonly scheduleLayout: () => void;
    readonly scheduleData: () => void;
    protected fixNumericExtent(extent?: [number, number], type?: string): [number, number];
}
