import { useState } from "react";
import { useCloudMediaUpload } from "../../../../../shared/features/cloudMedia/hooks/useCloudMediaUpload";
import { useToastStore } from "../../../../../core/store/useToastStore";

export const useProductFormController = () => {
    const toast = useToastStore(state => state.addToast);
    const cloudMediaUpload = useCloudMediaUpload();
    const [isUploading, setIsUploading] = useState(false);

    const handleUploadImage = async (files: FileList | null, setValue: (field: string, value: any) => void) => {
        if (!files || files.length === 0) return;
        
        setIsUploading(true);
        try {
            const result = await cloudMediaUpload.upload(Array.from(files));
            if (result && result.length > 0) {
                setValue('imageUrl', result[0].url);
            }
        } catch (error) {
            console.error("Upload failed", error);
            toast("Lỗi tải ảnh lên", "error");
        } finally {
            setIsUploading(false);
        }
    };

    const handleUploadGallery = async (files: FileList | null, setValue: (field: string, value: any) => void, currentGallery: string[] = []) => {
        if (!files || files.length === 0) return;
        setIsUploading(true);
        try {
            const result = await cloudMediaUpload.upload(Array.from(files));
            if (result && result.length > 0) {
                const newUrls = result.map(res => res.url);
                setValue('thumbnailUrl', [...currentGallery, ...newUrls]);
            }
        } catch (error) {
            console.error("Upload gallery failed", error);
            toast("Lỗi tải ảnh Gallery", "error");
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveGalleryImage = (index: number, setValue: (field: string, value: any) => void, currentGallery: string[]) => {
        const newGallery = [...currentGallery];
        newGallery.splice(index, 1);
        setValue('thumbnailUrl', newGallery);
    };

    return {
        isUploading,
        handleUploadImage,
        handleUploadGallery,
        handleRemoveGalleryImage
    };
};
