import React from "react";
import { useProductListController } from "./ProductList.controller";
import { AdminProductCard } from "./components/AdminProductCard";
import { ProductFloatingActions } from "../../components/floating-action/ProductFloatingActions";
import { Search } from "lucide-react";

export const ProductListPage: React.FC = () => {
    const listCtrl = useProductListController();

    if (listCtrl.isLoading) return <div className="p-8 text-center text-slate-500">Đang tải danh sách sản phẩm...</div>;
    if (listCtrl.isError) return <div className="p-8 text-center text-red-500">Đã xảy ra lỗi khi tải dữ liệu!</div>;

    return (
        <div className="w-full">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sản phẩm</h1>
                    <p className="text-slate-500 mt-1 text-sm">Quản lý toàn bộ danh mục sản phẩm của hệ thống</p>
                </div>
                
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm sản phẩm..." 
                        defaultValue={listCtrl.search}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                listCtrl.handleSearch(e.currentTarget.value);
                            }
                        }}
                        onBlur={(e) => listCtrl.handleSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Grid 100% width, tự responsive theo số cột */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {listCtrl.products.map(product => (
                    <AdminProductCard 
                        key={product.id} 
                        product={product} 
                        onDelete={() => listCtrl.handleDelete(product.id)}
                        isDeleting={listCtrl.isDeleting}
                    />
                ))}
            </div>

            {/* Pagination UI basic */}
            {listCtrl.pagination && listCtrl.pagination.totalPages > 1 && (
                <div className="mt-10 flex justify-center items-center space-x-2">
                    <button 
                        onClick={() => listCtrl.handlePageChange(listCtrl.page - 1)} 
                        disabled={listCtrl.page === 1}
                        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-slate-50"
                    >
                        Trước
                    </button>
                    <span className="text-sm font-medium text-slate-600">Trang {listCtrl.page} / {listCtrl.pagination.totalPages}</span>
                    <button 
                        onClick={() => listCtrl.handlePageChange(listCtrl.page + 1)} 
                        disabled={listCtrl.page === listCtrl.pagination.totalPages}
                        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-slate-50"
                    >
                        Sau
                    </button>
                </div>
            )}

            <ProductFloatingActions mode="list" />
        </div>
    );
};
