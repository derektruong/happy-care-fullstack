import { ServerUrl, PharmacyServerUrl, CloudinaryCloudName } from './env';

const BASE_URL_V1 = `${ServerUrl}/api`;
const BASE_URL_PHARMACY = `${PharmacyServerUrl}/api/v1`;

export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CloudinaryCloudName}/image/upload`;

export const UserUrl = `${BASE_URL_V1}/users`;
export const AdminUrl = `${BASE_URL_V1}/admin`;
export const NewsUrl = `${BASE_URL_V1}/news`;
export const SymptomsURL = `${BASE_URL_V1}/symptom-keyword`;
export const RoomsURL = `${BASE_URL_V1}/rooms`;
export const MessagesURL = `${BASE_URL_V1}/messages`;
export const MedicineURL = `${BASE_URL_PHARMACY}/public/products`;
