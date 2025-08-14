import e from "express";

export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        // Si es error de Zod, extraemos solo los mensajes
    if (error.name === "ZodError" && Array.isArray(error.errors)) {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json(messages);
    }

    // Si no es Zod, igualmente devolvemos string
    return res.status(400).json([error.message || "Validation error"]);
  }
}