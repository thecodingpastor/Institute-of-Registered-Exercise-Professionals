export type ImageType = {
  url: string;
  size: number;
  type: string;
};

const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
const ValidateImage: (image: ImageType) => string = (image: ImageType) => {
  if (image.size > 3000000) return "Image should not be more than 3MB";
  if (!allowedImageTypes.includes(image.type))
    return "Invalid image type. Only JPG and PNG formats allowed";
  return "ok";
};

export default ValidateImage;
