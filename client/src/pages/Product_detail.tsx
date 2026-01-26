import MainLayout from "@/components/layout/MainLayout";
import Product_details from "@/components/section/Product_details";
import { useEffect } from "react";
const Product_detail = () => {
  useEffect(() => {}, []);

  return (
    <>
      <MainLayout>
        <Product_details />
      </MainLayout>
    </>
  );
};

export default Product_detail;
