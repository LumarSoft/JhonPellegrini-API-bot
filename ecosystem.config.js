module.exports = {
  apps: [
    {
      name: "app-chatbot",
      script: "./src/app.ts",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "worker",
      script: "worker.js",
    },
  ],
};
