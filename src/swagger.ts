
const swagger = {
    "swagger": "2.0",
    "info": {
        "title": "User and Quiz Management API",
        "version": "1.0.0",
        "description": "API for managing users, authentication, and quizzes"
    },
    "securityDefinitions": {
        "JWT": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    },
    "paths": {


        
        "/api/createUser": {
            "post": {
                "tags": ["Users"],
                "summary": "Create a new user",
                "description": "This endpoint creates a new user with a unique user ID.",
                "produces": ["application/json"],
                "parameters": [{
                    "name": "body",
                    "in": "body",
                    "required": true,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "user_name": {
                                "type": "string",
                                "description": "User name of the new user"
                            },
                            "email": {
                                "type": "string",
                                "description": "Email address of the new user"
                            },
                            "password": {
                                "type": "string",
                                "description": "Password for the new user account"
                            }
                        },
                        "required": ["user_name", "email", "password"]
                    }
                }],
                "responses": {
                    "201": {
                        "description": "User created successfully",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "User created successfully"
                                },
                                "user": {
                                    "type": "object",
                                    "description": "Details of the created user"
                                },
                                "token": {
                                    "type": "string",
                                    "description": "JWT token for the created user",
                                    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwidXNlck5hbWUiOiJhZG1pbiIsImlhdCI6MTYyMzkwMjIyMCwiZXhwIjoxNjIzOTE0MjIwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request - Invalid input provided"
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                },
                "x-controller": "signup",
                "security": [{
                    "JWT": []
                }] 
            }
        },
        "/api/getAllUsers": {
            "get": {
                "tags": ["Users"],
                "summary": "Get all user data",
                "description": "This endpoint retrieves all user data.",
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "array",
                                    "items": {
                                        "type": "object"

                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                },
                "x-controller": "getData"
            }
        },
        "/api/getSingleUser/{id}": {
            "get": {
                "tags": ["Users"],
                "summary": "Get single user data",
                "description": "This endpoint retrieves data of a single user by their ID.",
                "produces": ["application/json"],
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "description": "ID of the user to retrieve",
                    "required": true,
                    "type": "integer",
                    "format": "int64"
                }],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                            "type": "object"

                        }
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                },
                "x-controller": "single"
            }
        },
        "/api/updateUser/{id}": {
            "put": {
                "tags": ["Users"],
                "summary": "Update user data",
                "description": "This endpoint updates data of a single user by their ID.",
                "produces": ["application/json"],
                "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "ID of the user to update",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    },
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object"

                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "status": {
                                    "type": "string",
                                    "example": "updated successfully"
                                },
                                "updated": {
                                    "type": "object"

                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                },
                "x-controller": "updateData"
            }
        },
        "/api/deleteUser/{id}": {
            "delete": {
                "tags": ["Users"],
                "summary": "Delete user data",
                "description": "This endpoint deletes data of a single user by their ID.",
                "produces": ["application/json"],
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "description": "ID of the user to delete",
                    "required": true,
                    "type": "integer",
                    "format": "int64"
                }],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "status": {
                                    "type": "string",
                                    "example": "successfully deleted"
                                },
                                "deleted": {
                                    "type": "object"

                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                },
                "x-controller": "deleteData"
            }
        },
        "/api/login": {
            "post": {
                "tags": ["Auth"],
                "summary": "User login",
                "description": "This endpoint allows users to log in to the system.",
                "produces": ["application/json"],
                "parameters": [{
                    "name": "body",
                    "in": "body",
                    "required": true,

                    "schema": {
                        "type": "object",
                        "properties": {
                            "email": {
                                "type": "string",
                                "description": "Email address of the user"
                            },
                            "password": {
                                "type": "string",
                                "description": "Password for the user account"
                            }
                        },
                        "required": ["email", "password"]
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Login successful",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Login successful"
                                },
                                "token": {
                                    "type": "string",
                                    "description": "JWT token for the user"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request - Invalid input provided"
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                },
                "x-controller": "login"
            }
        },

        "/api/logout": {
            "post": {
                "tags": ["Auth"],
                "summary": "User logout",
                "description": "This endpoint allows users to log out from the system.",
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "Logged out successfully"
                    },
                    "401": {
                        "description": "Unauthorized - Access token not provided or invalid"
                    }
                },
                "x-controller": "logout"
            }
        },
        "/api/quizInstructions": {
            "get": {
                "tags": ["Quiz"],
                "summary": "Get quiz instructions",
                "description": "This endpoint retrieves instructions and rules for the quiz.",
                "produces": ["application/json"],
                "responses": {
                    "200": {
                       // "description": "Successful operation",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "instructions": {
                                    "type": "string",
                                    "example": "Read the questions carefully before answering."
                                },
                                "rules": {
                                    "type": "string",
                                    "example": "You have 30 seconds to answer each question."
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                }
            }
        },
        "/api/startQuiz/{user_id}": {
            "get": {
                "tags": ["Quiz"],
                "summary": "Start quiz",
                "description": "This endpoint starts the quiz for the specified user.",
                "produces": ["application/json"],
                "parameters": [{
                    "name": "user_id",
                    "in": "path",
                    "description": "ID of the user",
                    "required": true,
                    "type": "integer"
                }],
                "responses": {
                    "200": {
                        "description": "Quiz started successfully",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Quiz started successfully"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                }
            }
        },
        "/api/submitAnswer/{user_id}/{question_id}": {
            "post": {
                "tags": ["Quiz"],
                "summary": "Submit answer",
                "description": "This endpoint submits an answer for a question in the quiz.",
                "produces": ["application/json"],
                "parameters": [{
                        "name": "user_id",
                        "in": "path",
                        "description": "ID of the user",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "name": "question_id",
                        "in": "path",
                        "description": "ID of the question",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Answer details",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "user_answer": {
                                    "type": "string",
                                    "example": true
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Answer submitted successfully",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Answer submitted successfully"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request - Invalid input provided"
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                }
            }
        },
        "/api/resetProgress/{user_id}": {
            "post": {
                "tags": ["Quiz"],
                "summary": "Reset quiz progress",
                "description": "This endpoint resets the progress of the quiz for the specified user.",
                "produces": ["application/json"],
                "parameters": [{
                    "name": "user_id",
                    "in": "path",
                    "description": "ID of the user",
                    "required": true,
                    "type": "integer"
                }],
                "responses": {
                    "200": {
                        "description": "Progress reset successfully",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Progress reset successfully"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                }
            }
        },
        "/api/completeQuiz/{user_id}": {
            "post": {
                "tags": ["Quiz"],
                "summary": "Complete quiz",
                "description": "This endpoint completes the quiz for the specified user.",
                "produces": ["application/json"],
                "parameters": [{
                    "name": "user_id",
                    "in": "path",
                    "description": "ID of the user",
                    "required": true,
                    "type": "integer"
                }],
                "responses": {
                    "200": {
                        "description": "Quiz completed successfully",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Quiz completed successfully"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                }
            }
        }
    }
};

export default swagger;
