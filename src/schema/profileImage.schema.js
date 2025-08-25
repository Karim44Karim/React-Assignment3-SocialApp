import * as z from 'zod';

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
export const profileImageSchema = z.object({
  photo: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Please select one image")
    .refine(
      (files) => files[0].size <= MAX_FILE_SIZE,
      "File Size must be less than 4 MB"
    )
    .refine(
      (files) => ALLOWED_IMAGE_TYPES.includes(files[0].type),
      "File type must be jpeg, jpg or png"
    ),
});
