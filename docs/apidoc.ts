/*const apiDocumentation: any = {
  openapi: '3.0.0',
  info: {
    title: 'User API',
    description: 'API for managing users, questions, and quizzes',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:6000',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          user_id: {
            type: 'integer',
          },
          user_name: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          date_registered: {
            type: 'string',
            format: 'date-time',
          },
          score: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Quiz',
            },
          },
          current_score: {
            type: 'integer',
          },
        },
        required: ['user_id', 'user_name', 'password', 'email', 'date_registered'],
        additionalProperties: false,
      },
      Question: {
        type: 'object',
        properties: {
          question_id: {
            type: 'integer',
          },
          question_text: {
            type: 'string',
          },
          options: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          correct_answer: {
            type: 'string',
          },
          answers: {
            $ref: '#/components/schemas/Quiz',
          },
        },
        required: ['question_id', 'question_text', 'options', 'correct_answer'],
        uniqueItems: ['question_id'],
      },
      Quiz: {
        type: 'object',
        properties: {
          quiz_id: {
            type: 'integer',
          },
          question_id: {
            type: 'integer',
          },
          user_id: {
            type: 'integer',
          },
          user_answer: {
            type: 'string',
          },
          question: {
            $ref: '#/components/schemas/Question',
          },
          user: {
            $ref: '#/components/schemas/User',
          },
          start_time: {
            type: 'string',
            format: 'date-time',
          },
          end_time: {
            type: 'string',
            format: 'date-time',
          },
          score: {
            type: 'integer',
          },
        },
        required: ['quiz_id', 'question_id', 'user_id', 'user_answer', 'start_time', 'end_time'],
        uniqueItems: ['question_id', 'user_id'],
      },
    },
  },
  paths: {
    '/createUser': {
      post: {
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'The newly created user',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
    '/getAllUsers': {
      get: {
        summary: 'Get all users',
        responses: {
          200: {
            description: 'A list of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/getSingleUser/{id}': {
      get: {
        summary: 'Get user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          200: {
            description: 'The user',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
    '/updateUser/{id}': {
      patch: {
        summary: 'Update user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'The updated user',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
    '/deleteUser/{id}': {
      delete: {
        summary: 'Delete user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          200: {
            description: 'User deleted successfully',
          },
        },
      },
    },
  },
};
export {apiDocumentation}; */