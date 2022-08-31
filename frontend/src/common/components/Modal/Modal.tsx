import React , {useState } from 'react';
import Swal from 'sweetalert2'
import { Modal, ModalCentral, ModalDireita, ModalEsquerda } from './styled';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

export type ModalProps = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  observacao: string;
}
export type BancoHospedes = {
  id: Number;
  nome: String;
  cpf: String;
  email: String;
  observacao: String;
  telefone: String;
}

export type BancoReserva = {
  id: Number;
  consumo: String;
  checkin: Date;
  checkout: Date;
}

export type BancoQuarto = {
  id_quarto: Number;
  tipo: String;
  status: String;
}

const schema = Yup.object({
  nome: Yup.string().required("Nome é obrigatório"),
  cpf: Yup.string().required("CPF é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  telefone: Yup.string().required("Telefone é obrigatório"),
});



export default function BasicModal({ onClose }) {

  const [hospedes, setHospedes] = React.useState<ModalProps[]>([]);
  const [reserva, setReserva] = useState<BancoReserva[]>([]);
  const [quartos, setQuartos] = useState<BancoQuarto[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<BancoHospedes>({ resolver: yupResolver(schema) });

  const onSubmit = (data: BancoHospedes) => {
    axios.post("http://localhost:4000/hospedes", {
      nome: data.nome,
      cpf: data.cpf

    }).then((res) => {
      setHospedes([...hospedes, res.data]);
    })
  }
    
    function close() {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hospede não cadastrado!',
        showConfirmButton: false,
        timer: 1500
      })
      onClose();
    }
   

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return(
    <div>
      <Box sx={style}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>          
              <ModalCentral>
                <ModalEsquerda>
                  <label>Quarto</label>
                  <TextField id="outlined-basic" label="Quarto" variant="outlined" />
                </ModalEsquerda>
                <div>
                  <label>Andar</label>
                  <div>
                    <TextField id="outlined-basic" type="number" label="Andar" variant="outlined" />
                  </div>
                </div>
              </ModalCentral>

              <ModalCentral>
                <div>
                  <label>CPF</label>
                  <TextField id="cpf" type="number" label="CPF" variant="outlined" maxRows={11} {...register("cpf")} />
                  <p>{errors.cpf?.message}</p>
                </div>

                <ModalDireita>
                  <label>Hospedes</label>
                  <TextField id="nome" label="Hospedes" variant="outlined"  {...register("nome")} />
                  <p>{errors.nome?.message}</p>
                </ModalDireita>
              </ModalCentral>
              <ModalCentral>
                <div>
                  <label>CHECK IN</label>
                  <TextField id="outlined-basic" type="date" variant="outlined" />
                </div>
                <div>
                  <label>CHECK OUT</label>
                  <TextField id="outlined-basic" type="date" variant="outlined" />
                </div>
              </ModalCentral>
              <ModalCentral>
                <div>
                  <label>Telefone</label>
                  <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </div>
                <div>
                  <label>Situação</label>
                  <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </div>
              </ModalCentral>
              <ModalCentral>
                <div>

                  <TextField
                    id="outlined-multiline-static"
                    label="Observação"
                    multiline
                    rows={4}
                    defaultValue="Observação"
                  />
                </div>
              </ModalCentral>

              <Button color="success" variant="contained" type='submit' >Enviar</Button>
           
          </form>
          <Button variant="outlined" color="error" onClick={close}>Voltar</Button>
        </div>
      </Box >
      </div>
      )
    }
