const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      info: {
        title: "Divar-Backend",
        description: "Express JS Project",
        version: "1.0.0",
      },
    },
    apis: [],
  });

  const swagger = swaggerUi.setup(swaggerDocument, {});

  app.use("/swagger", swaggerUi.serve, swagger)
}

module.exports = SwaggerConfig;
