import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useStaffsQuery } from "../../features/staff/hooks/queries/staffs.query";
import { staffKeys } from "../../features/staff/hooks/staff.keys";
import { useStaffDetailQuery } from "../../features/staff/hooks/queries/staffDetail.query";
import { useCreateStaffMutation } from "../../features/staff/hooks/mutations/createStaff.mutation";
import { useUpdateStaffMutation } from "../../features/staff/hooks/mutations/updateStaff.mutation";
import { useDeleteStaffMutation } from "../../features/staff/hooks/mutations/deleteStaff.mutation";
import type { CreateStaffRequest } from "../../features/staff/models/create-staff.request";
import type { UpdateStaffRequest } from "../../features/staff/models/update-staff.request";
import { useToastStore } from "../../../../core/store/useToastStore";

export const useStaffManagementController = () => {
    // List state
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [search, setSearch] = useState("");

    // Selection state
    const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

    const queryClient = useQueryClient();

    // Queries
    const { 
        data: staffsData, 
        isLoading: isStaffsLoading, 
        isError: isStaffsError 
    } = useStaffsQuery(page, limit, search);

    const { 
        data: selectedStaffData, 
        isLoading: isDetailLoading 
    } = useStaffDetailQuery(selectedStaffId!);

    // Mutations
    const createMutation = useCreateStaffMutation();
    const updateMutation = useUpdateStaffMutation();
    const deleteMutation = useDeleteStaffMutation();

    // Toasts
    const addToast = useToastStore((state) => state.addToast);

    // Handlers
    const handleSearch = (term: string) => {
        setSearch(term);
        setPage(1);
    };

    const handleSelectStaff = (id: number) => {
        setSelectedStaffId(id);
    };

    const handleClosePanel = () => {
        setSelectedStaffId(null);
    };

    const handleOpenCreate = () => {
        setModalMode('create');
        setIsModalOpen(true);
    };

    const handleOpenEdit = () => {
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateStaff = async (data: CreateStaffRequest) => {
        try {
            const response = await createMutation.mutateAsync(data);
            handleCloseModal();
            addToast("Tạo nhân viên thành công", "success");
            
            if (response.data) {
                queryClient.setQueriesData({ queryKey: staffKeys.lists() }, (oldData: any) => {
                    if (!oldData || !oldData.data) return oldData;
                    return {
                        ...oldData,
                        data: [response.data, ...oldData.data]
                    };
                });
            }
        } catch (error) {
            addToast("Đã xảy ra lỗi khi tạo nhân viên", "error");
            console.error("Failed to create staff", error);
        }
    };

    const handleUpdateStaff = async (data: UpdateStaffRequest) => {
        try {
            const response = await updateMutation.mutateAsync(data);
            handleCloseModal();
            addToast("Cập nhật nhân viên thành công", "success");
            
            if (response.data) {
                queryClient.setQueriesData({ queryKey: staffKeys.lists() }, (oldData: any) => {
                    if (!oldData || !oldData.data) return oldData;
                    return {
                        ...oldData,
                        data: oldData.data.map((item: any) => item.id === response.data.id ? response.data : item)
                    };
                });
                queryClient.setQueryData(staffKeys.detail(response.data.id), (oldDetail: any) => {
                    if (!oldDetail) return oldDetail;
                    return {
                        ...oldDetail,
                        data: response.data
                    };
                });
            }
        } catch (error) {
            addToast("Đã xảy ra lỗi khi cập nhật nhân viên", "error");
            console.error("Failed to update staff", error);
        }
    };

    const handleDeleteStaff = async (id: number) => {
        if (!confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) return;
        try {
            await deleteMutation.mutateAsync(id);
            addToast("Xóa nhân viên thành công", "success");
            
            queryClient.setQueriesData({ queryKey: staffKeys.lists() }, (oldData: any) => {
                if (!oldData || !oldData.data) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.filter((item: any) => item.id !== id)
                };
            });
            queryClient.removeQueries({ queryKey: staffKeys.detail(id) });

            if (selectedStaffId === id) {
                setSelectedStaffId(null);
            }
        } catch (error) {
            addToast("Đã xảy ra lỗi khi xóa nhân viên", "error");
            console.error("Failed to delete staff", error);
        }
    };

    return {
        // State
        page,
        setPage,
        search,
        selectedStaffId,
        isModalOpen,
        modalMode,
        
        // Data
        staffs: staffsData?.data || [],
        pagination: staffsData?.pagination,
        selectedStaff: selectedStaffData?.data,
        isStaffsLoading,
        isStaffsError,
        isDetailLoading,

        // Mutation states
        isSubmitting: createMutation.isPending || updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        // Handlers
        handleSearch,
        handleSelectStaff,
        handleClosePanel,
        handleOpenCreate,
        handleOpenEdit,
        handleCloseModal,
        handleCreateStaff,
        handleUpdateStaff,
        handleDeleteStaff
    };
};
