export interface workerForm {
    firstName: string;
    lastName: string;
    address: string;
    position: google.maps.LatLngLiteral;
    dateOfBirth: Date;
    ratePerHour: number;
    phone: number;
}

export interface workerInfo extends workerForm{
    id?: number;
    avatarUrl?: string;
    created: Date | number | string;
}
