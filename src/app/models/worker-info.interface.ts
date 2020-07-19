export interface WorkerForm {
    firstName: string;
    lastName: string;
    address: string;
    position: google.maps.LatLngLiteral;
    dateOfBirth: Date;
    ratePerHour: number;
    phone: number;
}

export interface WorkerInfo extends WorkerForm {
    _id?: number;
    avatarUrl?: string;
    created: Date | number | string;
}
