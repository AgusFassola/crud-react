import e from "express";

export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
      if (error.errors) {
      // 👇 Solo devolver los mensajes
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json(messages);
    }

    // Si no es Zod, igualmente devolvemos string
    return res.status(400).json([error.message || "Validation error"]);
  }
}