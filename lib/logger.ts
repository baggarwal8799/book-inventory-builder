import customLogger from "./customLogger";

// You can change this env var to control logging location
const errorLogPath = "logs/error.log";

export const errorLogger = customLogger(errorLogPath, "error");
