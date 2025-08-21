const openapiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Posts API (MVC)',
    description:
      'API para gerenciamento de usuários e posts. Documentação gerada via swagger-ui-express com especificação estática em TypeScript.',
    version: '1.0.0',
  },
  servers: [
    { url: '/api', description: 'Servidor principal (mesmo host)' },
  ],
  tags: [
    { name: 'Users', description: 'Operações de usuário' },
    { name: 'Posts', description: 'Operações de post' },
  ],
  components: {
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Bad request' },
        },
        required: ['success', 'message'],
      },

      SuccessResponseMessage: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Operação realizada com sucesso' },
          data: { nullable: true },
        },
        required: ['success', 'data'],
      },

      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', format: 'int32' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          bio: { type: 'string', nullable: true },
          avatar_url: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
        },
        required: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
      },

      CreateUserInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          bio: { type: 'string' },
          avatar_url: { type: 'string' },
        },
        required: ['name', 'email'],
      },

      UpdateUserInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          bio: { type: 'string' },
          avatar_url: { type: 'string' },
        },
      },

      Post: {
        type: 'object',
        properties: {
          id: { type: 'integer', format: 'int32' },
          author_id: { type: 'integer', format: 'int32' },
          title: { type: 'string' },
          status: { type: 'string', example: 'draft' },
          content: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
          deleted_at: { type: 'string', format: 'date-time', nullable: true },
          author: {
            type: 'object',
            nullable: true,
            properties: {
              id: { type: 'integer', format: 'int32' },
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
            },
          },
        },
        required: ['id', 'author_id', 'title', 'status', 'content', 'created_at', 'updated_at', 'deleted_at'],
      },

      CreatePostInput: {
        type: 'object',
        properties: {
          author_id: { type: 'integer', format: 'int32' },
          title: { type: 'string' },
          content: { type: 'string' },
        },
        required: ['author_id', 'title', 'content'],
      },

      UpdatePostInput: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
          status: { type: 'string' },
        },
      },

      SuccessResponseUser: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: { $ref: '#/components/schemas/User' },
          message: { type: 'string', nullable: true },
        },
        required: ['success', 'data'],
      },

      SuccessResponseUserList: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/User' },
          },
          message: { type: 'string', nullable: true },
        },
        required: ['success', 'data'],
      },

      SuccessResponsePost: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: { $ref: '#/components/schemas/Post' },
          message: { type: 'string', nullable: true },
        },
        required: ['success', 'data'],
      },

      SuccessResponsePostList: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/Post' },
          },
          message: { type: 'string', nullable: true },
        },
        required: ['success', 'data'],
      },
    },
    parameters: {
      IdPathParam: {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer', format: 'int32' },
      },
    },
  },
  paths: {
    '/users': {
      post: {
        tags: ['Users'],
        summary: 'Cria um novo usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/CreateUserInput' } },
          },
        },
        responses: {
          '201': { description: 'Usuário criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponseUser' } } } },
          '400': { description: 'Erro de validação', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '409': { description: 'Conflito', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      get: {
        tags: ['Users'],
        summary: 'Lista usuários',
        responses: {
          '200': { description: 'Lista de usuários', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponseUserList' } } } },
        },
      },
    },
    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Busca usuário por id',
        parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
        responses: {
          '200': { description: 'Usuário encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponseUser' } } } },
          '404': { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Atualiza um usuário',
        parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/UpdateUserInput' } },
          },
        },
        responses: {
          '200': { description: 'Usuário atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponseUser' } } } },
          '400': { description: 'Erro de validação', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Remove um usuário',
        parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
        responses: {
          '200': { description: 'Usuário removido', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponseMessage' } } } },
          '404': { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/users/{id}/posts': {
      get: {
        tags: ['Users'],
        summary: 'Lista posts de um usuário',
        parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
        responses: {
          '200': { description: 'Lista de posts', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponsePostList' } } } },
          '404': { description: 'Usuário não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },

    '/posts': {
      post: {
        tags: ['Posts'],
        summary: 'Cria um novo post',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/CreatePostInput' } },
          },
        },
        responses: {
          '201': { description: 'Post criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponsePost' } } } },
          '400': { description: 'Erro de validação', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      get: {
        tags: ['Posts'],
        summary: 'Lista posts',
        responses: {
          '200': { description: 'Lista de posts', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponsePostList' } } } },
        },
      },
    },
    '/posts/{id}': {
      get: {
        tags: ['Posts'],
        summary: 'Busca post por id',
        parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
        responses: {
          '200': { description: 'Post encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponsePost' } } } },
          '404': { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      put: {
        tags: ['Posts'],
        summary: 'Atualiza um post',
        parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/UpdatePostInput' } },
          },
        },
        responses: {
          '200': { description: 'Post atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponsePost' } } } },
          '400': { description: 'Erro de validação', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      delete: {
        tags: ['Posts'],
        summary: 'Remove um post',
        parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
        responses: {
          '200': { description: 'Post removido', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponseMessage' } } } },
          '404': { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
  },
};

export default openapiSpec;

