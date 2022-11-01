import express from "express";
import cors from "cors";
import {execQuery} from "./config/database.js";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/produtos", function(req,res){ 

    let filtro = [];
    let ssql = "Select * from produtos where id > 0";

    if(req.query.nome){
        ssql += "and nome like ?";
        filtro.push("%" + req.query.nome + "%");
    };

    if(req.query.valor){
        ssql += "and valor > ?";
        filtro.push(req.query.valor);
    };

    if(req.query.EAN13){
        ssql += "and EAN13 = ?";
        filtro.push(req.query.EAN13);
    };
    
    execQuery(ssql, filtro, function(err,result){
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json(result);  
        }
    });

});

app.get("/vendas", function(req,res){ 

    let filtro = [];
    let ssql = "Select SUM(VALOR) from vendas where id > 0";
    
    execQuery(ssql, filtro, function(err,result){
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json(result);  
        }
    });

});

app.listen(3000, function(){
    console.log("Servidor iniciado");
});