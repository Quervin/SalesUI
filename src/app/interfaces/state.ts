import { City } from './city';
export interface State {
    id: number;
    name: string;
    countryId: number;
    cities: City[];
}
