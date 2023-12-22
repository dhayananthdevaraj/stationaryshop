package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Shop;
import com.examly.springapp.repository.ShopRepo;

@Service
public class ShopService {

    @Autowired
    private ShopRepo shopRepo;

    public boolean addShopItem(Shop shop) {
        return shopRepo.save(shop) != null ? true : false;
    }
        
    
    public List <Shop> getAllShopItem()
    {
        return shopRepo.findAll();
    }   
}
