/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.sisadri.appcobranza.controller;

import groovyjarjarpicocli.CommandLine;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author pc
 */
@Controller
@RequestMapping(path = "cliente")
public class ClienteController {
    
    @GetMapping()
    public String index(){
        return "bandejaCliente";
    }
    
    @GetMapping(value = "/detalleCliente/{uuid}")
    public String detalleCliente(@PathVariable("uuid") String uuid){
        return "detalleCliente";
    }
    
}
