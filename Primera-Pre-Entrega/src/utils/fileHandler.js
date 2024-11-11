import fs from "fs";
import path from "path";

const validateFileName = (filepath, filename) => {
    if (!filepath) throw new Error("No se encontro la ruta");
    if (!filename) throw new Error("No se encontro el nombre");
}

export const readJsonFile = async (filepath, filename) => {
    validateFileName(filepath, filename);
    try {
        const content = await fs.promises.readFile(path.join(filepath, filename), "utf-8")
        return JSON.parse(content || "[]");
    } catch (err) {
        throw new Error("Error al leer el archivo");                 
    }
}

export const writeJsonFile = async (filepath, filename, content) => {
    validateFileName(filepath, filename);
    if (!content) throw new Error("No se encontro el contenido");
    try {
        await fs.promises.writeFile(path.join(filepath, filename), JSON.stringify(content, null, "\t"), "utf-8")
    } catch (err) {
        throw new Error("Error al escribir el archivo");                 
    }
};

// Elimina un archivo
export const deleteFile = async (filepath, filename) => {
    validateFileName(filepath, filename);

    try {
        await fs.promises.unlink(path.join(filepath, filename));
    } catch (error) {
        if (error.code === "ENOENT") {
            console.warn(`El archivo ${filename} no existe.`);
        } else {
            throw new Error(`Error al eliminar el archivo ${filename}`);
        }
    }
};