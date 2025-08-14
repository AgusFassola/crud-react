import e from "express";

export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
     console.log("Zod raw error:", error);

        if (Array.isArray(error.errors)) {
            const mensajes = error.errors.map(err => err.message);
            console.log("Mensajes extraídos:", mensajes); // <-- ver en consola
            return res.status(400).json(mensajes);
        }

        console.log("Error sin array:", error.message); // <-- ver en consola
        return res.status(400).json([error.message || "Error desconocido"]);
    }
}