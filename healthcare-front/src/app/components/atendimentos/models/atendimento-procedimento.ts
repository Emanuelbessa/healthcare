import { Paciente } from '@components/pacientes/models/paciente';
import { Procedimento } from '@components/procedimentos/models/procedimento';
import { Profissional } from '@components/profissionais/models/profissional';

export interface AtendimentoProcedimento {
  id_atend_proc?: number,
  id_atendimento?: number,
  id_profissional: number,
  id_procedimento: number,
  valor_procedimento: number,
  valor_comissao: number,
  procedimento_realizado: boolean,
  paciente?: Paciente,
  profissional?: Profissional,
  procedimento?: Procedimento,
}
