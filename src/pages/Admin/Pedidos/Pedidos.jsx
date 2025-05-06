import React, { useState } from 'react'
import { usePedidos } from '../../../hooks/api/usePedidos';
import DataTable from '../../../components/UI/DataTable/DataTable';
import { formatDate } from '../../../utils/formatDate';
import { DataTableAccionesWrapper, DataTableEstado } from '../../../components/UI/DataTable/DataTableStyles';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import Form from '../../../components/Form/Form';
import useForm from '../../../hooks/useForm';
import InputTextWrapper from '../../../components/UI/InputText/InputTextWrapper';
import InputText from '../../../components/UI/InputText/InputText';
import Dialog from '../../../components/UI/Dialog/Dialog';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { estadosPedido, URL_API } from '../../../utils/constants';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../context/ToastContext';
import { BiEdit } from "react-icons/bi";

const Pedidos = () => {
    const toast = useToast(); // Usamos el hook para acceder al Toast
    const queryClient = useQueryClient();
    const { data: pedidos, error, isLoading } = usePedidos();
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    console.log(pedidoSeleccionado);
    
    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        estado: ''
    });  

    const renderers = {
        acciones: (rowData) => (
            <DataTableAccionesWrapper>
                <span className='orange' onClick={(e) => { 
                    e.stopPropagation(); // Evita que se dispare el onRowClick
                    setPedidoSeleccionado(rowData);
                    setFormState({
                        estado: rowData.estado || ''
                    });
                    setVisible(true); 
                }}><BiEdit/></span>
            </DataTableAccionesWrapper>
            
        ),        
        total: (rowData) => (
            <span>{Number(rowData.total)?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
        ),
        fecha: (rowData) => (
            <span>{formatDate(rowData.fecha)}</span>
        ),
        estado: (rowData) => {
            switch (rowData.estado) {
                case 'P':
                    return <DataTableEstado>Pendiente</DataTableEstado>;
                case 'C':
                    return <DataTableEstado className='orange'>Confirmado</DataTableEstado>;
                case 'F':
                    return <DataTableEstado className='green'>Finalizado</DataTableEstado>;
            }
        }        

    };
    
    const columns = [
        { field: 'acciones', header: '' },
        { field: 'id_pedido', header: 'N° pedido' },
        { field: 'usuario', header: 'Usuario' },
        { field: 'total', header: 'Total' },
        { field: 'fecha', header: 'Fecha' },
        { field: 'metodo_pago', header: 'Metodo Pago' },
        { field: 'estado', header: 'Estado' },
        { field: 'codigo_postal', header: 'Codigo Postal' },
        { field: 'direccion', header: 'Direccion' },

    ];

    const handleActualizarPedido = async () => {
        if (!pedidoSeleccionado) return;
        if (pedidoSeleccionado.estado === formState.estado) return

        try {
            const response = await axios.put(`${URL_API}pedidos/actualizar-pedido`, {
                estado: formState.estado,
                id_pedido: pedidoSeleccionado.id_pedido
            });
            setVisible(false);
            if (response.data.success) {
                await queryClient.invalidateQueries(["pedidos"]);
                setVisible(false);
                toast.current.show({
                    severity: 'success',
                    summary: "Actualizado",
                    detail: `Se ha actualizado correctamente el pedido`,
                    life: 3000,
                });
                // Podés recargar pedidos si no se actualizan solos:
                
            } else {
                alert("Error al actualizar");
            }
        } catch (error) {
            console.error("Error actualizando pedido:", error);
            alert("Error del servidor");
        }
    };

    return (
        <>
            <DataTable
                rows={50} 
                rowsPerPageOptions={[5, 10, 25, 50]}
                value={pedidos} 
                tableStyle={{ minWidth: '50rem', width: '100%' }}
                loading={isLoading}
                columns={columns}
                renderers={renderers}
                dataKey={'id_pedido'}
                selectable={false}
                onRowClick={(e) => navigate(`/admin/pedidos/${e.data.id_pedido}`)} // usando react-route
            />
            <Dialog 
                header="Editar" 
                visible={visible} 
                modal
                onHide={() => {if (!visible) return; setVisible(false); }}
            >
                <Form>
                    <InputTextWrapper label="Estado *">
                        <Dropdown
                            name="estado" // <--- esto es clave
                            value={formState.estado}
                            onChange={handleFormChange} // el value ya es el objeto
                            options={estadosPedido}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Seleccione estado"
                            error={formErrors.estado}
                        />
                    </InputTextWrapper>
                </Form>
                <Button 
                    onClick={handleActualizarPedido}
                    disabled={pedidoSeleccionado?.estado === formState.estado}
                >
                    Actualizar
                </Button>
            </Dialog>
        </>
    )
}

export default Pedidos