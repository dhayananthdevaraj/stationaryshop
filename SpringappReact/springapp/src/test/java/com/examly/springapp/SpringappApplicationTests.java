package com.examly.springapp;
import java.io.File;
import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc

class SpringappApplicationTests {

 
    @Autowired
    private  MockMvc mockMvc ;
    @Test

    void testaddShopitem() throws Exception{    

      
        String st = "{\"productname\": \"demoname\",\"producttype\": \"demotype\",\"stockitem\": 20,\"price\": 950,\"mfdate\": \"2021-05-05\",\"companyname\": \"SampleCompany\"}";
         mockMvc.perform(MockMvcRequestBuilders.post("/addShopitem")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(st)
                    .accept(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andReturn();

    }

    @Test
    void testgetAllShopitem() throws Exception{
         mockMvc.perform(get("/getAllShopitem")
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print())
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$").isArray())
                        .andReturn();

    }


    @Test 
    public void test_Controller_Directory_Exists() { 
        String directoryPath = "src/main/java/com/examly/springapp/controller"; // Replace with the path to your directory 
        File directory = new File(directoryPath); 
        assertTrue(directory.exists() && directory.isDirectory()); 
    }
    
    @Test 
    public void test_ApiController_File_Exists() { 
        String filePath = "src/main/java/com/examly/springapp/controller/ApiController.java"; // Replace with the path to your file 
        File file = new File(filePath); 
        assertTrue(file.exists() && file.isFile()); 
    }

    @Test 
    public void test_model_Directory_Exists() { 
        String directoryPath = "src/main/java/com/examly/springapp/model"; // Replace with the path to your directory 
        File directory = new File(directoryPath); 
        assertTrue(directory.exists() && directory.isDirectory()); 
    }
    
    @Test 
    public void test_Shop_File_Exists() { 
        String filePath = "src/main/java/com/examly/springapp/model/Shop.java"; // Replace with the path to your file 
        File file = new File(filePath); 
        assertTrue(file.exists() && file.isFile()); 
    }

    @Test 
    public void test_Repository_Folder_Exists() { 
        String directoryPath = "src/main/java/com/examly/springapp/repository"; // Replace with the path to your directory 
        File directory = new File(directoryPath); 
        assertTrue(directory.exists() && directory.isDirectory()); 
    }
    
    @Test 
   
    public void test_Service_Folder_Exists() { 
        String directoryPath = "src/main/java/com/examly/springapp/service"; // Replace with the path to your directory 
        File directory = new File(directoryPath); 
        assertTrue(directory.exists() && directory.isDirectory()); 
    }

    @Test 
   
    public void test_congifuration_Folder_Exists() { 
        String directoryPath = "src/main/java/com/examly/springapp/configuration"; // Replace with the path to your directory 
        File directory = new File(directoryPath); 
        assertTrue(directory.exists() && directory.isDirectory()); 
    }

    @Test
    public void test_ApiController_Class_Exists() {
        checkClassExists("com.examly.springapp.controller.ApiController");
    }

    @Test
    public void test_ShopRepo_Class_Exists() {
        checkClassExists("com.examly.springapp.repository.ShopRepo");
    }

    @Test
    public void test_ShopService_Class_Exists() {
        checkClassExists("com.examly.springapp.service.ShopService");
    }

    @Test
    public void test_ShopModel_Class_Exists() {
        checkClassExists("com.examly.springapp.model.Shop");
    }


    @Test
    public void test_Shop_Model_Has_id_Field() {
        checkFieldExists("com.examly.springapp.model.Shop", "id");
    }

    @Test
    public void test_Shop_Model_Has_productname_Field() {
        checkFieldExists("com.examly.springapp.model.Shop", "productname");
    }

    @Test
    public void test_Shop_Model_Has_producttype_Field() {
        checkFieldExists("com.examly.springapp.model.Shop", "producttype");
    }

    @Test
    public void test_Shop_Model_Has_stockitem_Field() {
        checkFieldExists("com.examly.springapp.model.Shop", "stockitem");
    }


    @Test
    public void test_Shop_Model_Has_price_Field() {
        checkFieldExists("com.examly.springapp.model.Shop", "price");
    }

    @Test
    public void test_Shop_Model_Has_mfdate_Field() {
        checkFieldExists("com.examly.springapp.model.Shop", "mfdate");
    }

    @Test
    public void test_Shop_Model_Has_companyname_Field() {
        checkFieldExists("com.examly.springapp.model.Shop", "companyname");
    }


    @Test
    public void test_ShopRepo_Extends_JpaRepository() {
        checkClassImplementsInterface("com.examly.springapp.repository.ShopRepo", "org.springframework.data.jpa.repository.JpaRepository");
    }

  
  
     private void checkClassExists(String className) {
        try {
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " does not exist.");
        }
    }

    private void checkFieldExists(String className, String fieldName) {
        try {
            Class<?> clazz = Class.forName(className);
            clazz.getDeclaredField(fieldName);
        } catch (ClassNotFoundException | NoSuchFieldException e) {
            fail("Field " + fieldName + " in class " + className + " does not exist.");
        }
    }

    private void checkClassImplementsInterface(String className, String interfaceName) {
        try {
            Class<?> clazz = Class.forName(className);
            Class<?> interfaceClazz = Class.forName(interfaceName);
            assertTrue(interfaceClazz.isAssignableFrom(clazz));
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " or interface " + interfaceName + " does not exist.");
        }
    }


}

 