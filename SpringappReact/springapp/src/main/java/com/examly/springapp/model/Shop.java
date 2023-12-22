package com.examly.springapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    public String productname;
    public String producttype;
    public int stockitem;
    public int price;
    public String mfdate;
    public String companyname;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public String getProducttype() {
        return producttype;
    }

    public void setProducttype(String producttype) {
        this.producttype = producttype;
    }

    public int getStockitem() {
        return stockitem;
    }

    public void setStockitem(int stockitem) {
        this.stockitem = stockitem;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getMfdate() {
        return mfdate;
    }

    public void setMfdate(String mfdate) {
        this.mfdate = mfdate;
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    public Shop(int id, String productname, String producttype, int stockitem, int price, String mfdate,
            String companyname) {
        this.id = id;
        this.productname = productname;
        this.producttype = producttype;
        this.stockitem = stockitem;
        this.price = price;
        this.mfdate = mfdate;
        this.companyname = companyname;
    }

    public Shop() {
    }

    

    
}
