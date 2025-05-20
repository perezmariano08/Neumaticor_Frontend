import React from 'react'
import { usePedido, usePedidoDetalle, usePedidos } from '../../../api/pedidos/usePedidos';
import DataTable from '../../../components/UI/DataTable/DataTable';
import { formatDate } from '../../../utils/formatDate';
import { DataTableEstado } from '../../../components/UI/DataTable/DataTableStyles';
import { useNavigate, useParams } from 'react-router-dom';
import { PedidoDetalleMain, PedidoDetallesLista } from './PedidosStyles';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Button from '../../../components/UI/Button/Button';

const PedidosDetalle = () => {
    const id_pedido = parseInt(useParams().id_pedido, 10);
    
    const { data: pedido, error, isLoading } = usePedido(id_pedido);
    const { data: pedido_detalle } = usePedidoDetalle(id_pedido);
    const navigate = useNavigate()
    console.log(pedido);
    console.log(pedido_detalle);
    

    const renderers = {
        precio_unitario: (rowData) => (
            <span>{Number(rowData.precio_unitario)?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
        ),
    };
    
    const columns = [
        { field: 'descripcion', header: 'Producto' },
        { field: 'precio_unitario', header: 'Precio Unitario' },
        { field: 'cantidad', header: 'Cantidad' },
    ];

    const exportarPDF = () => {
        const doc = new jsPDF();

        // Encabezado
        doc.setFontSize(16);
        doc.text('Comprobante de Pedido', 14, 20);

        // Información del pedido
        doc.setFontSize(12);
        doc.text(`Pedido N°: ${pedido.id_pedido}`, 14, 30);
        doc.text(`Cliente: ${pedido.usuario}`, 14, 38);
        doc.text(`Fecha: ${formatDate(pedido.fecha)}`, 14, 46);
        doc.text(`Dirección: ${pedido.direccion} - CP ${pedido.codigo_postal}`, 14, 54);
        doc.text(`Método de Pago: ${pedido.metodo_pago}`, 14, 62);
        doc.text(`Fecha vencimiento: ${pedido.fecha_vencimiento ? formatDate(pedido.fecha_vencimiento) : '-'}`, 14, 70);

        // Tabla de productos
        autoTable(doc, {
            startY: 78,
            head: [['Producto', 'Precio Unitario', 'Cantidad', 'Subtotal']],
            body: pedido_detalle.map(item => [
                item.descripcion,
                Number(item.precio_unitario).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
                item.cantidad,
                (item.cantidad * parseFloat(item.precio_unitario)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
            ]),
        });

        // Total
        doc.text(`Total: ${Number(pedido.total).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}`, 14, doc.lastAutoTable.finalY + 10);

        doc.save(`Pedido-${pedido.id_pedido}.pdf`);
    };


    return (
        <PedidoDetalleMain>
            <PedidoDetallesLista>
                <li><span>Pedido N°:</span>{pedido?.id_pedido}</li>
                <li><span>Estado:</span>
                    {pedido?.estado === "P" && <DataTableEstado className='orange'>Pendiente</DataTableEstado>}
                    {pedido?.estado === "C" && <DataTableEstado className='blue'>Confirmado</DataTableEstado>}
                    {pedido?.estado === "F" && <DataTableEstado className='green'>Finalizado</DataTableEstado>}
                    
                </li>
                <li><span>Cliente:</span>{pedido?.usuario}</li>
                <li><span>Fecha:</span>{formatDate(pedido?.fecha)}</li>
                <li><span>Dirección:</span>{pedido?.direccion}</li>
                <li><span>Metodo de pago:</span>{pedido?.metodo_pago}</li>
                <li><span>Fecha vencimiento:</span>{formatDate(pedido?.fecha_vencimiento)}</li>
                
            </PedidoDetallesLista>
            <Button onClick={exportarPDF}>Descargar PDF</Button>
            <DataTable
                rows={50} 
                rowsPerPageOptions={[5, 10, 25, 50]}
                value={pedido_detalle ? pedido_detalle : []} // 👈 importante
                tableStyle={{ minWidth: '50rem', width: '100%' }}
                loading={isLoading}
                columns={columns}
                renderers={renderers}
                dataKey={'id_pedido_detalle'}
                selectable={false}
                onRowClick={''} // usando react-route
            />
        </PedidoDetalleMain>
        
    )
}

export default PedidosDetalle