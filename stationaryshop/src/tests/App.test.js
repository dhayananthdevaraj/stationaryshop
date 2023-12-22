import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Home from '../components/Home';
import Footer from '../components/Footer';
import AddProduct from '../components/AddProduct';
import DisplayProduct from '../components/DisplayProduct';

test('renders_App_with_Header_and_Routing_Links', () => {
  render(
    <App />
  );
  
  const headerText = screen.getByText(/Happy - Stationary Shop/i);
  const homeLink = screen.getByText(/Home/i);
  const addProductLink = screen.getByText(/Add Product/i);
  const displayProductLink = screen.getByText(/Display Product/i);
  
  expect(headerText).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
  expect(addProductLink).toBeInTheDocument();
  expect(displayProductLink).toBeInTheDocument();
});


test('renders_Home_component_with_Heading', () => {
  render(<Home />);
  
  const headingText = screen.getByText(/Welcome/i);
  expect(headingText).toBeInTheDocument();
});

test('renders_Home_component_div_contains_shop_info', () => {
  render(<Home />);
  const shopInfoDiv = screen.getByText(/Our shop/i).closest('.shop_info');
  expect(shopInfoDiv).toBeInTheDocument();
});

test('renders_Footer_component_with_correct_text', () => {
  render(<Footer />);
  const footerElement = screen.getByText(/rights reserved/i);
  expect(footerElement).toBeInTheDocument();
});

test('renders_Add_Product_component_title_correctly', () => {
  render(<App />);
  
  const AddProductLink =  screen.getByText(/Add Product/i)
  fireEvent.click(AddProductLink); 

  const titleElement = screen.getByText(/Add Product to Shop/i);
  expect(titleElement).toBeInTheDocument();
});


test('renders_Display_Product_component_title_correctly', () => {
  render(<App />);
  
  const DisplayProductLink =  screen.getByText(/Display Product/i)
  fireEvent.click(DisplayProductLink); 

  const titleElement = screen.getByText(/Products in Shop/i);
  expect(titleElement).toBeInTheDocument();
});


test('renders_form_input_fields_and_labels', () => {
  render(<AddProduct />);

  const productNameLabel = screen.getByLabelText(/Product Name:/i);
  const productTypeLabel = screen.getByLabelText(/Product Type:/i);
  const stockItemLabel = screen.getByLabelText(/Stock Item:/i);
  const priceLabel = screen.getByLabelText(/Price:/i);
  const mfDateLabel = screen.getByLabelText(/Manufacture Date:/i);
  const companyNameLabel = screen.getByLabelText(/Company Name:/i);

  expect(productNameLabel).toBeInTheDocument();
  expect(productTypeLabel).toBeInTheDocument();
  expect(stockItemLabel).toBeInTheDocument();
  expect(priceLabel).toBeInTheDocument();
  expect(mfDateLabel).toBeInTheDocument();
  expect(companyNameLabel).toBeInTheDocument();
});

test('displays_validation_errors_with_empty_input_fields', async () => {
  render(<AddProduct />);
  
  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);
  
  await waitFor(() => {
    expect(screen.getByText('Product Name is required')).toBeInTheDocument();
    expect(screen.getByText('Product Type is required')).toBeInTheDocument();
    expect(screen.getByText('Stock Item is required')).toBeInTheDocument();
    expect(screen.getByText('Price is required')).toBeInTheDocument();
    expect(screen.getByText('Manufacture Date is required')).toBeInTheDocument();
    expect(screen.getByText('Company Name is required')).toBeInTheDocument();
  });
});


test('checks_submit_form_functionality', async () => {
  render(<AddProduct />);

  const productNameInput = screen.getByLabelText(/Product Name:/i);
  const productTypeInput = screen.getByLabelText(/Product Type:/i);
  const stockItemInput = screen.getByLabelText(/Stock Item:/i);
  const priceInput = screen.getByLabelText(/Price:/i);
  const manufactureDateInput = screen.getByLabelText(/Manufacture Date:/i);
  const companyNameInput = screen.getByLabelText(/Company Name:/i);

  fireEvent.change(productNameInput, { target: { value: 'Sample Product' } });
  fireEvent.change(productTypeInput, { target: { value: 'others' } });
  fireEvent.change(stockItemInput, { target: { value: 100 } });
  fireEvent.change(priceInput, { target: { value: 50} });
  fireEvent.change(manufactureDateInput, { target: { value: '2023-11-15' } });
  fireEvent.change(companyNameInput, { target: { value: 'Sample Company' } });

  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true });

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/addShopitem'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productname: 'Sample Product',
          producttype: 'others',
          stockitem: 100,
          price: 50,
          mfdate: '2023-11-15',
          companyname: 'Sample Company'
        }),
      })
    );
  });

  fetchMock.mockRestore();
});


test('fetches_data_from_the_backend_when_the_component_mounts', async () => {
  const mockData = [
    {
      id: 1,
      productname: 'Sample Product 1',
      producttype: 'Electronics',
      stockitem: 50,
      price: 100,
      mfdate: '2023-11-15',
      companyname: 'Sample Company 1',
    },
    // Add more mock data if needed
  ];

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockData),
    ok: true,
  });

  render(<DisplayProduct />);

  await waitFor(() => {
    expect(screen.getByText('Sample Product 1')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('2023-11-15')).toBeInTheDocument();
    expect(screen.getByText('Sample Company 1')).toBeInTheDocument();
    // You can add more assertions based on your mock data and component structure
  });

  expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/getAllShopitem'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
