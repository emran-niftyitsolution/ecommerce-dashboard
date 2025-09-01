"use client";

import {
  ArrowLeftOutlined,
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Upload,
  message,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const { Option } = Select;
const { TextArea } = Input;

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const { id } = use(params);

  // Mock product data - in a real app, this would come from an API
  const mockProduct = {
    id: id,
    name: "Wireless Bluetooth Headphones",
    vendor: "TechCorp",
    category: "Electronics",
    price: 89.99,
    stock: 45,
    status: "active",
    rating: 4.8,
    sales: 156,
    revenue: 14038.44,
    image: "🎧",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop",
    ],
    description:
      "High-quality wireless headphones with noise cancellation technology. Features include 30-hour battery life, premium sound quality, and comfortable over-ear design.",
    sku: "WH-001",
    weight: "0.3kg",
    dimensions: "20x15x8cm",
    colors: ["Black", "White", "Blue"],
    warranty: "2 years",
    shipping: "Free shipping",
    returnPolicy: "30-day return policy",
    joinDate: "2024-01-15",
  };

  useEffect(() => {
    setProduct(mockProduct);
    form.setFieldsValue({
      ...mockProduct,
      joinDate: dayjs(mockProduct.joinDate),
    });
  }, [id, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Product updated successfully!");
      router.push("/dashboard/products");
    } catch (error) {
      message.error("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Books",
    "Toys",
    "Automotive",
  ];

  const vendors = [
    "TechCorp",
    "SportMax",
    "HomeStyle",
    "FashionHub",
    "BeautyCare",
    "BookWorld",
    "ToyLand",
    "AutoParts",
  ];

  const colorOptions = [
    "Black",
    "White",
    "Blue",
    "Red",
    "Green",
    "Yellow",
    "Purple",
    "Pink",
    "Orange",
    "Brown",
    "Gray",
    "Silver",
    "Gold",
  ];

  const shippingOptions = [
    "Free shipping",
    "Standard shipping",
    "Express shipping",
    "Overnight shipping",
    "Pickup available",
  ];

  const warrantyOptions = [
    "No warranty",
    "30 days",
    "90 days",
    "6 months",
    "1 year",
    "2 years",
    "3 years",
    "Lifetime",
  ];

  const returnPolicyOptions = [
    "No returns",
    "7-day return policy",
    "14-day return policy",
    "30-day return policy",
    "60-day return policy",
    "90-day return policy",
  ];

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-600 mb-2">
            Loading Product...
          </div>
          <div className="text-gray-500">
            Please wait while we fetch the product details.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/dashboard/products")}
            className="flex items-center gap-2"
          >
            Back to Products
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600">
              Update product information and settings
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              message.warning("Delete functionality would be implemented here");
            }}
          >
            Delete Product
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={loading}
            onClick={() => form.submit()}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-6"
      >
        {/* Basic Information */}
        <Card title="Basic Information" className="shadow-sm">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  { required: true, message: "Please enter product name" },
                ]}
              >
                <Input placeholder="Enter product name" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="sku"
                label="SKU"
                rules={[{ required: true, message: "Please enter SKU" }]}
              >
                <Input placeholder="Enter SKU" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select placeholder="Select category" size="large">
                  {categories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="vendor"
                label="Vendor"
                rules={[{ required: true, message: "Please select vendor" }]}
              >
                <Select placeholder="Select vendor" size="large">
                  {vendors.map((vendor) => (
                    <Option key={vendor} value={vendor}>
                      {vendor}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter description" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Enter product description"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Pricing & Inventory */}
        <Card title="Pricing & Inventory" className="shadow-sm">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <InputNumber
                  placeholder="0.00"
                  size="large"
                  min={0}
                  step={0.01}
                  className="w-full"
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="stock"
                label="Stock Quantity"
                rules={[
                  { required: true, message: "Please enter stock quantity" },
                ]}
              >
                <InputNumber
                  placeholder="0"
                  size="large"
                  min={0}
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Select status" size="large">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="draft">Draft</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Product Images */}
        <Card title="Product Images" className="shadow-sm">
          <Row gutter={[24, 16]}>
            <Col xs={24}>
              <Form.Item
                name="images"
                label="Product Images"
                extra="Upload multiple images for your product. First image will be the main image."
              >
                <Upload
                  listType="picture-card"
                  fileList={product.images?.map(
                    (url: string, index: number) => ({
                      uid: index.toString(),
                      name: `image-${index + 1}`,
                      status: "done",
                      url: url,
                    })
                  )}
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Product Specifications */}
        <Card title="Product Specifications" className="shadow-sm">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                name="weight"
                label="Weight"
                rules={[{ required: true, message: "Please enter weight" }]}
              >
                <Input placeholder="e.g., 0.5kg" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="dimensions"
                label="Dimensions"
                rules={[{ required: true, message: "Please enter dimensions" }]}
              >
                <Input placeholder="e.g., 20x15x8cm" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="colors"
                label="Available Colors"
                rules={[{ required: true, message: "Please select colors" }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select colors"
                  size="large"
                  showSearch
                  allowClear
                >
                  {colorOptions.map((color) => (
                    <Option key={color} value={color}>
                      {color}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Shipping & Policies */}
        <Card title="Shipping & Policies" className="shadow-sm">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                name="shipping"
                label="Shipping Option"
                rules={[
                  { required: true, message: "Please select shipping option" },
                ]}
              >
                <Select placeholder="Select shipping option" size="large">
                  {shippingOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="warranty"
                label="Warranty"
                rules={[{ required: true, message: "Please select warranty" }]}
              >
                <Select placeholder="Select warranty" size="large">
                  {warrantyOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="returnPolicy"
                label="Return Policy"
                rules={[
                  { required: true, message: "Please select return policy" },
                ]}
              >
                <Select placeholder="Select return policy" size="large">
                  {returnPolicyOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Additional Settings */}
        <Card title="Additional Settings" className="shadow-sm">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                name="joinDate"
                label="Product Launch Date"
                rules={[
                  { required: true, message: "Please select launch date" },
                ]}
              >
                <DatePicker
                  placeholder="Select date"
                  size="large"
                  className="w-full"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="featured"
                label="Featured Product"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="trending"
                label="Trending Product"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button
            size="large"
            onClick={() => router.push("/dashboard/products")}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            size="large"
            loading={loading}
            onClick={() => form.submit()}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
}
