import { Info } from "./info-dialog/info.interface";

export interface MarkerWithInfo {
    position: google.maps.LatLngLiteral;
    label: google.maps.MarkerLabel;
    title: string;
    options: google.maps.MarkerOptions;
    info: Info;
}
