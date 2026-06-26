import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { OrderAdminModel } from '../models/order.model';
import { formatCurrency } from '../../../../../utils/currency.util';
import { formatDateTime } from '../../../../../utils/date.util';
import { getPaymentMethodConfig } from '../../../../client/features/order/config/paymentMethod.config';

export const generateInvoicePDF = (order: OrderAdminModel) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text('HOA DON MUA HANG', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Ma don hang: #ORDER-${order.id}`, 14, 40);
    doc.text(`Ngay tao: ${formatDateTime(order.createdAt)}`, 14, 50);

    doc.text('Thong tin giao hang:', 14, 70);
    doc.setFontSize(10);
    const addressLines = doc.splitTextToSize(order.address, 180);
    doc.text(addressLines, 14, 80);

    // Table
    const tableColumn = ["STT", "Ten san pham", "Phan loai", "Don gia", "So luong", "Thanh tien"];
    const tableRows: any[] = [];

    order.items.forEach((item, index) => {
        const rowData = [
            index + 1,
            item.productName,
            item.attributes.map(a => `${a.name}: ${a.value}`).join(', '),
            formatCurrency(item.price),
            item.quantity,
            formatCurrency(item.price * item.quantity)
        ];
        tableRows.push(rowData);
    });

    autoTable(doc, {
        startY: 90 + (addressLines.length * 5),
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        styles: { font: 'helvetica', fontSize: 10 }
    });

    // Summary
    const summaryY = (doc as any).lastAutoTable.finalY + 10;
    const paymentConfig = getPaymentMethodConfig(order.paymentMethod);

    doc.text(`Phuong thuc thanh toan: ${paymentConfig.title}`, 14, summaryY);

    doc.text(`Tong tien hang: ${formatCurrency(order.totalAmount - order.shippingFee)}`, 120, summaryY);
    doc.text(`Phi van chuyen: ${formatCurrency(order.shippingFee)}`, 120, summaryY + 10);

    doc.setFontSize(14);
    doc.text(`TONG THANH TOAN: ${formatCurrency(order.totalAmount)}`, 120, summaryY + 20);

    doc.save(`invoice-${order.id}.pdf`);
};
