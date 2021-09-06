import React, { FormEvent, useState } from 'react';

import { Card, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { useModalAlert } from '../../context/hooks/useModalAlert';
import { baseUrl } from '../../services/api';

interface ModalAnexoProps {
  id_funcionario: string;
  id_cliente: string;
}

export default function ModalAnexo(props: ModalAnexoProps) {
  const { callModel } = useModalAlert();
  const [open, setOpen] = React.useState(false);
  const [cnh, setCnh] = useState<File>();
  const [cpf, setCpf] = useState<File>();
  const [rg, setRg] = useState<File>();
  const [cnh2, setCnh2] = useState<File>();
  const [cpf2, setCpf2] = useState<File>();
  const [rg2, setRg2] = useState<File>();
  const [comprovante_endereco, setComprovante_Endereco] = useState<File>();
  const [certidao_casamento, setCertidao_Casamento] = useState<File>();
  const [matricula, setMatricula] = useState<File>();
  const [contrato_arrendamento, setContrato_Arrendamento] = useState<File>();
  const [outros, setOutros] = useState<File>();
  const recarregar = useRouter();

  function validartamanho(arquivoTamanho: number) {
    if (arquivoTamanho > 10000000) {
      callModel('Erro', 'Seu arquivo é muito grande!', 'OK');
      return false;
    } else return true;
  }

  function salvaranexo(e: FormEvent) {
    e.preventDefault();

    const AnexoData = new FormData();
    AnexoData.append('id_funcionario', props.id_funcionario);
    AnexoData.append('id_cliente', props.id_cliente);
    AnexoData.append('cnh', cnh);
    AnexoData.append('cpf', cpf);
    AnexoData.append('rg', rg);
    AnexoData.append('cnh2', cnh2);
    AnexoData.append('cpf2', cpf2);
    AnexoData.append('rg2', rg2);
    AnexoData.append('comprovante_endereco', comprovante_endereco);
    AnexoData.append('certidao_casamento', certidao_casamento);
    AnexoData.append('matricula', matricula);
    AnexoData.append('contrato_arrendamento', contrato_arrendamento);
    AnexoData.append('outros', outros);

    baseUrl
      .post('/anexo/store', AnexoData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        callModel('Sucesso', 'Cadastro realizado com sucesso.', 'Ok');
        setOpen(false);
        recarregar.reload();
      })
      .catch((error) => {
        callModel('Erro', 'Ocorreu um erro', 'OK');
      });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Anexar Arquivos
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={salvaranexo}>
          <DialogTitle id="alert-dialog-title">{'Inserir arquivos:'}</DialogTitle>
          <DialogContent
            style={{
              display: 'grid',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1.3rem',
            }}
          >
            <Card>
              <Grid container item xs={12} sm={12} style={{ paddingLeft: 34 }}>
                <Grid container item xs={12} sm={3}>
                  CNH Frente
                </Grid>
                <Grid container item xs={12} sm={9}>
                  <input
                    color="primary"
                    accept="image/*, .pdf"
                    type="file"
                    onChange={(e) => {
                      if (validartamanho(e.target.files[0].size) == true) {
                        setCnh(e.target.files[0]);
                      } else {
                        e.target.value = '';
                      }
                    }}
                    id="cnh"
                  />
                </Grid>
              </Grid>
              <br />
            </Card>

            <Card>
              <Grid container item xs={12} sm={12} style={{ paddingLeft: 34 }}>
                <Grid container item xs={12} sm={3}>
                  CNH Verso
                </Grid>
                <Grid container item xs={12} sm={9}>
                  <input
                    color="primary"
                    accept="image/*, .pdf"
                    type="file"
                    onChange={(e) => {
                      if (validartamanho(e.target.files[0].size) == true) {
                        setCnh2(e.target.files[0]);
                      } else {
                        e.target.value = '';
                      }
                    }}
                    id="cnh2"
                  />
                </Grid>
              </Grid>
              <br />
            </Card>

            <Card>
              <Grid container item xs={12} sm={12} style={{ paddingLeft: 34 }}>
                <Grid container item xs={12} sm={3}>
                  CPF Frente
                </Grid>
                <Grid container item xs={12} sm={9}>
                  <input
                    color="primary"
                    accept="image/*, .pdf"
                    type="file"
                    onChange={(e) => {
                      if (validartamanho(e.target.files[0].size) == true) {
                        setCpf(e.target.files[0]);
                      } else {
                        e.target.value = '';
                      }
                    }}
                    id="cpf"
                  />
                </Grid>
              </Grid>
              <br />
            </Card>

            <Card>
              <Grid container item xs={12} sm={12} style={{ paddingLeft: 34 }}>
                <Grid container item xs={12} sm={3}>
                  CPF Verso
                </Grid>
                <Grid container item xs={12} sm={9}>
                  <input
                    color="primary"
                    accept="image/*, .pdf"
                    type="file"
                    onChange={(e) => {
                      if (validartamanho(e.target.files[0].size) == true) {
                        setCpf2(e.target.files[0]);
                      } else {
                        e.target.value = '';
                      }
                    }}
                    id="cpf2"
                  />
                </Grid>
              </Grid>
              <br />
            </Card>

            <Card>
              <Grid container item xs={12} sm={12} style={{ paddingLeft: 34 }}>
                <Grid container item xs={12} sm={3}>
                  RG Frente
                </Grid>
                <Grid container item xs={12} sm={9}>
                  <input
                    color="primary"
                    accept="image/*, .pdf"
                    type="file"
                    onChange={(e) => {
                      if (validartamanho(e.target.files[0].size) == true) {
                        setRg(e.target.files[0]);
                      } else {
                        e.target.value = '';
                      }
                    }}
                    id="rg"
                  />
                </Grid>
              </Grid>
              <br />
            </Card>

            <Card>
              <Grid container item xs={12} sm={12} style={{ paddingLeft: 34 }}>
                <Grid container item xs={12} sm={3}>
                  RG Verso
                </Grid>
                <Grid container item xs={12} sm={9}>
                  <input
                    color="primary"
                    accept="image/*, .pdf"
                    type="file"
                    onChange={(e) => {
                      if (validartamanho(e.target.files[0].size) == true) {
                        setRg2(e.target.files[0]);
                      } else {
                        e.target.value = '';
                      }
                    }}
                    id="rg2"
                  />
                </Grid>
              </Grid>
              <br />
            </Card>

            <Card>
              <Grid container item xs={12} sm={12} style={{ paddingLeft: 34 }}>
                <Grid container item xs={12} sm={3}>
                  Comprovante de endereço
                </Grid>
                <Grid container item xs={12} sm={9}>
                  <input
                    color="primary"
                    accept="image/*, .pdf"
                    type="file"
                    onChange={(e) => {
                      if (validartamanho(e.target.files[0].size) == true) {
                        setComprovante_Endereco(e.target.files[0]);
                      } else {
                        e.target.value = '';
                      }
                    }}
                    id="comprovante_endereco"
                  />
                </Grid>
              </Grid>
              <br />
            </Card>

            <Card>
              <Grid container item xs={12} sm={12} style={{ paddingLeft: 34 }}>
                <Grid container item xs={12} sm={3}>
                  Certidão de casamento
                </Grid>
                <Grid container item xs={12} sm={9}>
                  <input
                    color="primary"
                    accept="image/*, .pdf"
                    type="file"
                    onChange={(e) => {
                      if (validartamanho(e.target.files[0].size) == true) {
                        setCertidao_Casamento(e.target.files[0]);
                      } else {
                        e.target.value = '';
                      }
                    }}
                    id="certidao_casamento"
                  />
                </Grid>
              </Grid>
              <br />
            </Card>

            <Card>
              <Grid container item xs={12} sm={12} style={{ paddingLeft: 34 }}>
                <Grid container item xs={12} sm={3}>
                  Matrícula
                </Grid>
                <Grid container item xs={12} sm={9}>
                  <input
                    color="primary"
                    accept="image/*, .pdf"
                    type="file"
                    onChange={(e) => {
                      if (validartamanho(e.target.files[0].size) == true) {
                        setMatricula(e.target.files[0]);
                      } else {
                        e.target.value = '';
                      }
                    }}
                    id="matricula"
                  />
                </Grid>
              </Grid>
              <br />
            </Card>

            <Card>
              <Grid container item xs={12} sm={12} style={{ paddingLeft: 34 }}>
                <Grid container item xs={12} sm={3}>
                  Contrato de arrendamento
                </Grid>
                <Grid container item xs={12} sm={9}>
                  <input
                    color="primary"
                    accept="image/*, .pdf"
                    type="file"
                    onChange={(e) => {
                      if (validartamanho(e.target.files[0].size) == true) {
                        setContrato_Arrendamento(e.target.files[0]);
                      } else {
                        e.target.value = '';
                      }
                    }}
                    id="contrato_arrendamento"
                  />
                </Grid>
              </Grid>
              <br />
            </Card>

            <Card>
              <Grid container item xs={12} sm={12} style={{ paddingLeft: 34 }}>
                <Grid container item xs={12} sm={3}>
                  Outros
                </Grid>
                <Grid container item xs={12} sm={9}>
                  <input
                    color="primary"
                    accept=".rar, .zip, .jar"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files[0].size > 100000000) {
                        callModel('Erro', 'Seu arquivo é muito grande!', 'OK');
                        e.target.value = '';
                      } else {
                        setOutros(e.target.files[0]);
                      }
                    }}
                    id="outros"
                  />
                </Grid>
              </Grid>
              <br />
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userToken: token, TokenUser: permissao } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false, // se for true, a pessoa se ferrou, nunca mais loga
      },
    };
  }

  const jsonPermissao = JSON.parse(permissao);
  const id_cliente = ctx.query.id_cliente;
  const id_funcionario: number = JSON.parse(parseCookies(ctx).TokenUser).id_funcionario;

  const permissaoArray = {
    ...jsonPermissao,
    id_permissao: jsonPermissao.id_permissao.split(','),
  };

  return {
    props: {
      token,
      permissao: permissaoArray,
      id_cliente,
      id_funcionario,
    },
  };
};
