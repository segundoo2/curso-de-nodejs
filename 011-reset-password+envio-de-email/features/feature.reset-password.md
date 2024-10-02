    ```
    > Feature Reset Password
    -- Model ResetPasswordSecret ( id, secret, user relation, userId relation ) --ok
    -- Model User ( relation ResetPasswordSecret ) --ok
     
    -- Rota Validate User
    --- Validar os dados do usuários como: email --ok
    --- Verificar se este email existe no banco de dados --ok
    --- Gerar código de segurança com 6 digitos numéricos --ok
    --- Salvar esse código no ResetPasswordSecret relacionando com o usuário 1 para 1 --ok
    --- Enviar o código para o email do usuário --ok
    --- Retornar o código gerado e email enviado --ok
     
    -- Rota Validate Security Code
    --- Validar os dados do usuários como: email e código gerado
    --- Verificar se este email e código gerado existem no banco de dados
    --- Retornar o código gerado e email enviado
     
    -- Rota Reset Password
    --- Validar os dados do usuários como: email, código gerado e nova senha
    --- Verificar se este email e código gerado existem no banco de dados
    --- Gerar uma nova senha ( edite a senha atual para a nova senha )
    --- Deletar a secret ( ResetPasswordSecret ) gerada no banco de dados
    ```