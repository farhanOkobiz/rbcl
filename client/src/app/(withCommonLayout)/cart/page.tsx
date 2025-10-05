
import { getCartProducts } from "@/services/cart";
import { getUser } from "@/services/auth";
import { Metadata } from "next";
import NavBar from "@/components/pages/header/NavBar/NavBar";
import CartClient from "@/components/pages/cartClient/cartClient";

export const metadata: Metadata = {
  title: "ROYEL BUSINESS COMPANY LIMITED | cart",
  description: "Best E-commerce platform in BD",
};

const Cart = async () => {
  const user = await getUser();
  const userId = user?.id;
  const coupon = "";
  const products = await getCartProducts(userId, coupon);

  return (
    <>
      <NavBar userCartProducts={products?.data} />
      <CartClient products={products} />
    </>
  );
};

export default Cart;
