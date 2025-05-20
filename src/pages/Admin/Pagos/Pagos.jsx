import React from 'react'
import { usePagoDetalle, usePagos } from '../../../api/pagos/UsePagos';
import DataTable from '../../../components/UI/DataTable/DataTable';
import { DataTableAccionesWrapper } from '../../../components/UI/DataTable/DataTableStyles';
import { BiDownload, BiEdit } from 'react-icons/bi';
import api from '../../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatDate } from '../../../utils/formatDate';
import { formatPrice } from '../../../utils/formatPrice';
import Button from '../../../components/UI/Button/Button';
import { PagosMain } from './PagosStyles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../../assets/Logotipo-Negro.png';

const Pagos = () => {
    const navigate = useNavigate()
    const token = useSelector((state) => state.user.token);
    const { data: pagos, error, isLoading } = usePagos();
    const { data: pago_detalle } = usePagoDetalle(1);
    
    const renderers = {
        acciones: (rowData) => (
            <DataTableAccionesWrapper>
                <span className='blue' onClick={(e) => { 
                    e.stopPropagation(); // Evita que se dispare el onRowClick
                    generarPDF(rowData.id_pago, rowData);
                }}><BiDownload/></span>
            </DataTableAccionesWrapper>
        ),
        fecha: (rowData) => (
            <span>{formatDate(rowData.fecha)}</span>
        ),
        monto_total: (rowData) => (
            <span>$ {formatPrice(rowData.monto_total)}</span>
        ),
    };
    
    const columns = [
        { field: 'acciones', header: '' },
        { field: 'id_pago', header: 'N° Comprobante' },
        { field: 'usuario', header: 'Usuario', filter: true , style:{maxWidth: '150px'}},
        { field: 'metodo_pago', header: 'Metodo de Pago', filter: true , style:{maxWidth: '150px'}},
        { field: 'monto_total', header: 'Monto', filter: true },
        { field: 'fecha', header: 'Fecha', filter: true },
    ];
    
    const generarPDF = async (id_pago, pago) => {
    try {
        const { data: detalle } = await api.get(`/pagos/detalle/${id_pago}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const doc = new jsPDF();

        // Crear una imagen HTML para pasarlo al canvas
        const img = new Image();
        img.src = logo;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const base64 = canvas.toDataURL('image/png');

            const logoWidth = 40; // ancho deseado
            const aspectRatio = img.height / img.width;
            const logoHeight = logoWidth * aspectRatio;

            doc.addImage(base64, 'PNG', 150, 10, logoWidth, logoHeight);

            doc.setFontSize(12);
            doc.text(`Fecha: ${formatDate(pago.fecha)}`, 14, 30);
            doc.text(`Cliente: ${pago.usuario}`, 14, 38);
            doc.text(`Monto Total: $${pago.monto_total}`, 14, 46);
            doc.text(`Metodo de Pago: ${pago.metodo_pago}`, 14, 54);

            autoTable(doc, {
                startY: 64,
                head: [['N° Pedido', 'Total Pedido', 'Deuda Pedido', 'Monto Pagado', 'Saldo Pendiente']],
                body: detalle.map(item => [
                    item.id_pedido,
                    `$${item.total_pedido}`,
                    `$${item.deuda_pedido}`,
                    `- $${item.monto_pago}`,
                    `$${item.saldo_pedido}`,
                ]),
            });

            doc.save(`comprobante_pago_${id_pago}.pdf`);
        };
    } catch (err) {
        console.error('Error generando PDF', err);
    }
};


    return (
        <PagosMain>
            <Button onClick={()=> navigate('/admin/pagos/registrar')}>Registrar pago</Button>
            <DataTable
                paginator 
                rows={50} 
                rowsPerPageOptions={[5, 10, 25, 50]}
                value={pagos} 
                tableStyle={{ minWidth: '50rem', width: '100%' }}
                loading={isLoading}
                columns={columns}
                renderers={renderers}
                dataKey={'id_pago'}
            />
        </PagosMain>
    )
}

export default Pagos