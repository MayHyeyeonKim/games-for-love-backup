export type HospitalInfo = {
    id: number; //여기 추가함 (보통은 id를 string으로 하는 게 좋다는데 number로 해도 되는건가?)
    name: string;
    status: string;
    type: string;
    description: string;
    year: number;
    country: string;
    state: string;
    zip: string; 
    city: string;
    address: string;
    longitude: number;
    latitude: number;
    hospitalPicture1: string[];
    hospitalPicture2: string[];
    hospitalPicture3: string[];
}
