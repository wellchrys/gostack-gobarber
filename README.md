# Recuperação de senha

**Requisito Funcional**

- O usuário deve recuparar a sua senha informando seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar a senha;

**Requisito Não Funcional**

- Utilizar Mailrap para testar os envios de email em ambiente de desenvolvimento;
- Utilizar amozon SES para envios em produção
- O envio de emails deve ocorrer em segundo plano (background job);

**Regra de Negócio**

- O link enviado por email para resetar a senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**Requisito Funcional**

- O usuário deve poder atualizar seu email, nome e senha;

**Requisito Não Funcional**

**Regra de Negócio**

- O usuário não pode atualizar seu email para um email já utilizado;
- Para atualizar a senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**Requisito Funcional**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notifição sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**Requisito Não Funcional**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações devem ser salvas no mongoDB;
- As notificações devem ser enviadas em tempo real via Socket.io;

**Regra de Negócio**

- A notificação deve ter um status de lida e não lida;

# Agendamentos de serviços

**Requisito Funcional**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder lsitar os horários disponivei em um dia de um pretador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**Requisito Não Funcional**

- A listagem de prestadores de serviços deve ser armazena em cache
-

**Regra de Negócio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h e 18h (primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário já passou;
- O usuário não pode agendar serviços consigo mesmo;
