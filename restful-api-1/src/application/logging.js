import winston from "winston";

export const logger = winston.createLogger({
  level: "info", // hanya menampilkan sampai level info
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
