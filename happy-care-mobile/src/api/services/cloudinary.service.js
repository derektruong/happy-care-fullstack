import * as FileSystem from 'expo-file-system';
import { httpService } from './http.service';
import { CLOUDINARY_URL, CloudinaryCloudName, CloudinaryUploadPreset } from '../common';

class CloudinaryService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new CloudinaryService();
    }

    return this.instance;
  }

  async uploadImage(imageUri) {
    const imgBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });

    const uriArr = imageUri.split('.');
    const fileType = uriArr[uriArr.length - 1];
    const file = `data:${fileType};base64,${imgBase64}`;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CloudinaryUploadPreset);
    data.append('cloud_name', CloudinaryCloudName);

    const res = await httpService.post(CLOUDINARY_URL, data, false);
    return res.url;
  }
}

export const cloudinaryService = CloudinaryService.getInstance();
