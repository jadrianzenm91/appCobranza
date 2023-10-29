/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.sisadri.appcobranza.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author pc
 */
@Controller
@RequestMapping(path = "cobrador")
public class CobradorController {
    
    @GetMapping()
    public String index(){
        return "bandejaCobrador";
    }
    
}
