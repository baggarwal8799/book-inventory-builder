const pino = require("pino");
import fs from "fs";
import path from "path";

const customLogger = (destination: string, logLevel: string = "info") => {
  // Ensure directory exists
  const logDir = path.dirname(destination);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const log = pino(
    {
      level: logLevel,
      formatters: {
        level(label: any) {
          return { level: label };
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    },
    pino.destination(destination)
  );

  log.customError = (
    error: string | Error,
    details = "",
    level: string = "error"
  ) => {
    const err = typeof error === "string" ? new Error(error) : error;
    const frame = err.stack?.split("\n")[2] || "";
    const functionName = frame.split(" ")[5] || "unknown";
    const lineInfo = frame.split(":").slice(-2).join(":");

    const errorInfo = {
      function: functionName,
      location: lineInfo,
      message: err.message,
      level,
      details,
    };

    switch (level) {
      case "info":
        log.info(errorInfo);
        break;
      case "warn":
        log.warn(errorInfo);
        break;
      case "error":
      default:
        log.error(errorInfo);
    }
  };

  return log;
};

export default customLogger;
