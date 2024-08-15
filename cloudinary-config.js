// cloudinary-config.js
import { Cloudinary } from 'cloudinary-core';

// Configura Cloudinary
const cloudinary = new Cloudinary({
  cloud_name: 'dqgzxa6uk',  // Reemplaza con tu Cloud Name
  secure: true  // Usa HTTPS
});

export default cloudinary;
