const { response } = require("express");
//const dbConnection = require('../database/conecta');
const CitaModel = require('../models/cita');

const {QueryTypes} = require('sequelize');

const getCitas = async (req, resp=response) => {
    const citas = await
        CitaModel.sequelize.query(
            "select * from cita",
            {type:QueryTypes.SELECT}
        );
    resp.json(citas);
}

const getCita= async (req, resp = response) => {
    const cve = req.params.cve;
    //const {cve} = req.params;
    const cita = await CitaModel.findByPk(cve);
    if (cita==null){
        resp.json({
            respuesta: false,
            resultado:"No se encuentra"
        });
    }
    else{
        resp.json(cita); 
    }
}

const postCita = async (req, resp = response) => {
    const {body} = req;
    const citaParam = {
        Id_cita: body.Id_cita,
        Id_paciente   : body.Id_paciente,
        Id_psicologo   : body.Id_psicologo,
        Tratamiento : body.Tratamiento,
        Tipo: body.Tipo,
        Hora_inicio: body.Hora_inicio,
        Hora_fin: body.Hora_fin,
        Estatus: body.Estatus,
        Notas: body.Notas
    };
    try{
        const cita = await 
            CitaModel.sequelize.query(
                "INSERT INTO cita (Id_paciente, Id_psicologo, Tratamiento, Tipo, Hora_inicio, Hora_fin, Estatus, Notas) VALUES(:paramId_cita, :paramId_paciente, :paramId_psicologo, :paramTratamiento, :paramTipo, :paramHora_inicio, :paramHora_fin, :paramEstatus, :paramNotas)",
{
    replacements:{
        paramId_cita:citaParam.Id_cita,
        paramId_paciente:citaParam.Id_paciente,
        paramId_psicologo:citaParam.Id_psicologo,
        paramTratamiento: citaParam.Tratamiento,
        paramTipo: citaParam.Tipo,
        paramFechaFinal: citaParam.FechaHoraFin,
        paramHora_inicio: citaParam.Hora_inicio,
        paramHora_fin:citaParam.Hora_fin,
        paramEstatus:citaParam.Estatus,
        paramNotas:citaParam.Notas
    }
}
        );

        const citaR = await CitaModel.findByPk(cita[0]);

        resp.json(citaR);

    }
    catch(error){
        console.log(error);
    }
    /*
    const {cve} = req.params;
    const {body} = req;
    const materiaParam = {
        nombreMateria   : body.nombreMateria,
        estadoMateria   : body.estadoMateria,
        semestreMateria : body.semestreMateria
    };
    try{
        const materia = await MateriaModel.create(
            materiaParam
        );
        resp.json(materia);
    }
    catch(error){
        console.log(error);
        resp.status(500).json(
            {mensaje: "Error en el servidor"}
            );
    }c
    */
    /*
    resp.json({
        respuesta:true,
        mensaje: 'Llamada a post - insertar',
        body
    });
    */
}
const putCita = async (req, resp = response) => {
        const { cve } = req.params;
        const { body } = req;
    
        try {
            const updatedRows = await CitaModel.sequelize.query(
                'UPDATE cita SET Id_paciente = :id_paciente, Id_psicologo = :id_psicologo, Tratamiento = :tratamiento, Tipo = :tipo, Hora_inicio = :hora_inicio, Hora_fin = :hora_fin, Estatus = :estatus, Notas = :notas WHERE Id_cita = :cve',
                {
                    replacements: {
                        cve: cve,
                        id_paciente: body.Id_paciente,
                        id_psicologo: body.Id_psicologo,
                        tratamiento: body.Tratamiento,
                        tipo: body.Tipo,
                        hora_inicio: body.Hora_inicio,
                        hora_fin: body.Hora_fin,
                        estatus: body.Estatus,
                        notas: body.Notas
                    },
                    type: CitaModel.sequelize.QueryTypes.UPDATE,
                }
            );
    
            if (updatedRows[1] === 0) {
                return resp.status(404).json({
                    mensaje: "No se encuentra el registro"
                });
            }
    
            // Obtén el registro actualizado (opcional)
            const updatedCita = await CitaModel.findByPk(cve);
    
            resp.json(updatedCita);
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                mensaje: "Error interno del servidor"
            });
        }    
}

const deleteCita = async (req, resp = response) => {
    
    const {cve} = req.params;
    try{
        const cita = await CitaModel.findByPk(cve);
        if (!cita){
            return resp.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        //eliminación física
        //await materia.destroy();
        //eliminación lógica
        await cita.update({estadoCita:false});
        resp.json(cita);
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getCitas,
    getCita,
    postCita,
    putCita,
    deleteCita
}