import { Paciente } from '@components/pacientes/models/paciente';
import { AtendimentoProcedimento } from './atendimento-procedimento';

export interface Atendimento {
  id_atendimento?: number,
  id_paciente: number,
  valor_total_procedimento: number,
  valor_total_comissao: number,
  data?: Date,
  procedimentos: AtendimentoProcedimento[],
  paciente?: Paciente
}
