package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Shop;
import com.examly.springapp.service.ShopService;

@RestController
public class ApiController {

    @Autowired
    private ShopService shopService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addShopitem")
    public boolean addShopitem(@RequestBody Shop shop)
    {
        return shopService.addShopItem(shop);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllShopitem")
    public List <Shop> getAllShopitem()
    {
        return shopService.getAllShopItem();
    }

   
    
}
