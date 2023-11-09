import React, { useState } from 'react';
import { useProductsContext } from '@/context/products_context'; // Replace with the actual path

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
} from '@material-tailwind/react';

export function ProductEditScreen() {
  const { postProduct } = useProductsContext(); // Access the postProduct action from your context

  const [file, setFile] = useState(null);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Function to handle file input changes
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Use the postProduct action to post the product data
    postProduct(productData);

    // Clear the form fields and file input
    setProductData({
      name: '',
      price: '',
      category: '',
      description: '',
    });
    setFile(null);
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Edit Product
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
          <Input
            size="lg"
            label="Price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
          <Select
            label="Category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
          >
            <Option value="Celana">Celana</Option>
            <Option value="Topi">Topi</Option>
            <Option value="T-Shirt">T-Shirt</Option>
          </Select>
          <Textarea
            size="lg"
            color="purple"
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
          <input
            type="file"
            onChange={handleFileChange}
          />
          {file && (
            <img
              className="h-45 w-full rounded-lg object-cover object-center"
              src={file}
              alt="Selected File"
            />
          )}
        </div>
        <Button className="mt-6" fullWidth type="submit">
          Update
        </Button>
      </form>
    </Card>
  );
}
