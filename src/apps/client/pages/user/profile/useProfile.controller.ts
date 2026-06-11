import { useState, useEffect } from "react";
import { useProfileQuery } from "../../../features/profile/hooks/queries/useProfile.query";
import { useUpdateProfileMutation } from "../../../features/profile/hooks/mutations/useUpdateProfile.mutation";
import { useCloudMediaUpload } from "../../../../../shared/features/cloudMedia/hooks/useCloudMediaUpload";
import { useToastStore } from "../../../../../core/store/useToastStore";

export const useProfileController = () => {
    const { data: profile, isLoading, error } = useProfileQuery();
    const updateProfileMutation = useUpdateProfileMutation();
    const cloudMediaUpload = useCloudMediaUpload();
    const toast = useToastStore(state => state.addToast);

    const [isEditing, setIsEditing] = useState(false);

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    useEffect(() => {
        if (profile) {
            setFullName(profile.fullName || "");
            setPhone(profile.phoneNumber || "");
            if (!avatarFile) {
                setAvatarPreview(profile.avatar || null);
            }
        }
    }, [profile, avatarFile]);

    /**
     * Xử lý bật chế độ chỉnh sửa thông tin
     */
    const handleEditClick = () => {
        setIsEditing(true);
    };

    /**
     * Xử lý hủy thay đổi thông tin
     */
    const handleCancelClick = () => {
        setIsEditing(false);
        setAvatarFile(null);
        if (profile) {
            setFullName(profile.fullName || "");
            setPhone(profile.phoneNumber || "");
            setAvatarPreview(profile.avatar || null);
        }
    };

    /**
     * Xử lý thay đổi avatar - Chỉ review, chưa submit
     */
    const handleAvatarChange = (file: File) => {
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    /**
     * Submit thay đổi thông tin
     */
    const handleSave = async () => {
        try {
            let avatarMediaId: number | undefined = undefined;
            let avatar_url: string | undefined = undefined;

            if (avatarFile) {
                const uploadResult = await cloudMediaUpload.upload([avatarFile]);
                if (uploadResult && uploadResult.length > 0) {
                    avatarMediaId = uploadResult[0].id;
                    avatar_url = uploadResult[0].url;
                }
            }

            await updateProfileMutation.mutateAsync({
                fullName,
                phone,
                avatarMediaId,
                avatar_url
            });

            setIsEditing(false);
            setAvatarFile(null);
        } catch (err: any) {
            console.error("Lỗi khi cập nhật profile", err);
            toast(err.message || err.data.message || "Có lỗi xảy ra khi cập nhật profile", "error");
        }
    };

    return {
        profile,
        isLoading,
        error,
        isEditing,
        isSaving: cloudMediaUpload.isUploading || updateProfileMutation.isPending,
        formData: {
            fullName,
            phone,
            avatarPreview
        },
        actions: {
            setFullName,
            setPhone,
            handleEditClick,
            handleCancelClick,
            handleSave,
            handleAvatarChange
        }
    };
};
