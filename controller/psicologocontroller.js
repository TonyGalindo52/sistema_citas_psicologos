const { response } = require("express");
const PsicologoModel = require('../models/psicologo');
const { QueryTypes } = require('sequelize');

const getPsicologos = async (req, resp = response) => {
    const psicologos = await PsicologoModel.sequelize.query(
        "SELECT * FROM psicologos",
        { type: QueryTypes.SELECT }
    );
    resp.json(psicologos);
}

const getPsicologo = async (req, resp = response) => {
    const cve = req.params.cve;
    const psicologo = await PsicologoModel.findByPk(cve);
    if (psicologo == null) {
        resp.json({
            respuesta: false,
            resultado: "No se encuentra"
        });
    } else {
        resp.json(psicologo);
    }
}

const postPsicologo = async (req, resp = response) => {
    const { body } = req;
    const psicologoParam = {
        Id_psicologo: body.Id_psicologo,
        Contraseña: body.Contraseña
    };
    try {
        const psicologo = await PsicologoModel.sequelize.query(
            "INSERT INTO psicologos (Contraseña) VALUES(:paramContraseña)",
            {
                replacements: {
                    paramContraseña: psicologoParam.Contraseña
                }
            }
        );

        const psicologoR = await PsicologoModel.findByPk(psicologo[0]);
        resp.json(psicologoR);

    } catch (error) {
        console.log(error);
    }
}

const putPsicologo = async (req, resp = response) => {
    const { cve } = req.params;
    const { body } = req;

    try {
        const updatedRows = await PsicologoModel.sequelize.query(
            'UPDATE psicologos SET Contraseña = :contraseña WHERE Id_psicologo = :cve',
            {
                replacements: {
                    cve: cve,
                    contraseña: body.Contraseña
                },
                type: QueryTypes.UPDATE,
            }
        );

        if (updatedRows[1] === 0) {
            return resp.status(404).json({
                mensaje: "No se encuentra el registro"
            });
        }

        const updatedPsicologo = await PsicologoModel.findByPk(cve);
        resp.json(updatedPsicologo);
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
}

const deletePsicologo = async (req, resp = response) => {
    const { cve } = req.params;
    try {
        const psicologo = await PsicologoModel.findByPk(cve);
        if (!psicologo) {
            return resp.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await psicologo.update({ estadoPsicologo: false });
        resp.json(psicologo);
    } catch (error) {
        console.log(error);
    }
}

const getPsicologoVista = async (req, resp = response) => {
    try {
        const psicologos = await PsicologoModel.sequelize.query(
            `SELECT 
                u.Id_usuarios AS Id_psicologo,
                u.Nombre,
                u.Apellido_p,
                u.Apellido_m,
                u.Telefono,
                u.Correo,
                ub.Estado,
                ub.Ciudad,
                ub.Calle,
                ub.Numero,
                ub.Colonia,
                ub.Cp,
                e.Nombre AS Especialidad,
                e.Descripcion
            FROM 
                Psicologos p
            JOIN 
                Usuarios u ON p.Id_psicologo = u.Id_usuarios
            JOIN 
                Psicologo_ubicacion pu ON p.Id_psicologo = pu.Id_psicologo
            JOIN 
                Ubicacion ub ON pu.Id_ubicacion = ub.Id_ubicacion
            JOIN 
                Psicologo_especialidad pe ON p.Id_psicologo = pe.Id_psicologo
            JOIN 
                Especialidad e ON pe.Id_especialidad = e.Id_especialidad;`, // Cambiado 'Especialidades' a 'Especialidad'
            { type: QueryTypes.SELECT }
        );
        

        resp.json(psicologos);
    } catch (error) {
        console.error("Error al obtener psicólogos:", error);
        resp.status(500).json({ error: "Error al obtener la lista de psicólogos" });
    }
}

module.exports = {
    getPsicologos,
    getPsicologo,
    postPsicologo,
    putPsicologo,
    deletePsicologo,
    getPsicologoVista
};
