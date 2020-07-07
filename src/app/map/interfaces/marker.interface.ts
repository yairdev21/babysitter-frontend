
export interface Info {
    id: number;
    name: string;
    avatarUrl?: string;
    phone: number;
    created: Date | number | string;
    ratePerHour: number;
}

export interface MarkerWithInfo {
    position: google.maps.LatLngLiteral;
    label: google.maps.MarkerLabel;
    title: string;
    options: google.maps.MarkerOptions;
    info: Info;
}
