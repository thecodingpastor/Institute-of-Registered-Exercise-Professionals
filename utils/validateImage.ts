export type ImageType = {
  url: string;
  size: number;
  type: string;
  secure_url?: string;
};

const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
const ValidateImage: (image: ImageType) => string = ({
  type,
  size,
  secure_url,
  url,
}: ImageType) => {
  if (!secure_url && !url) return "Image not detected";
  if (url) {
    // checks if the model is new as it would have imageBase64 string
    if (size > 3000000) return "Image should not be more than 3MB";
    if (!allowedImageTypes.includes(type))
      return "Invalid image type. Only JPG and PNG formats allowed";
    // clean to be uploaded to cloud
    return "newImage";
  } else {
    // checks if the model has a previously uploaded image
    if (!secure_url) return "Image not detected";
    return "oldImage";
  }
};

export default ValidateImage;
