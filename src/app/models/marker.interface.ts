import { workerInfo } from "./worker-info.interface";

export interface MarkerWithInfo {
    label: google.maps.MarkerLabel;
    title: string;
    options: google.maps.MarkerOptions;
    info: workerInfo;
}
