/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import useDeleteCartDetail from "@/hooks/api/cart/use-delete-cartdetail";
import useUpdateCart from "@/hooks/api/cart/use-update-cart";
import {
  deleteCartDetail,
  updateQuantityCartDetail,
} from "@/redux/slices/cart";
import { CartDetailDTO } from "@/services/type.dto";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import { useState } from "react";
type Props = {
  cart: CartDetailDTO;
};
export default function Cart({ cart }: Props) {
  const dispatch = useAppDispatch();
  const {
    mutate: deleteCartDetailApi,
    isLoading,
    error,
  } = useDeleteCartDetail();
  const { mutate: updateCart } = useUpdateCart();
  const carts = useAppSelector((state) => state.carts);
  const productDontHaveEnoughQuatity = useAppSelector(
    (state) => state.checkCartSlice
  );
  const handleDeleteCartDetail = () => {
    dispatch(deleteCartDetail(cart.id));
    deleteCartDetailApi(cart.id);
  };

  const updateQuantityCart = (newQuantity: number) => {
    dispatch(updateQuantityCartDetail({ ...cart, quantity: newQuantity }));
    setQuantity(newQuantity);
    const newCart: CartDetailDTO[] = [];
    carts.forEach((cartDetail) => {
      if (cartDetail.id != cart.id) {
        newCart.push(cartDetail);
      }
    });
    newCart.push({ ...cart, quantity: newQuantity });
    updateCart(newCart);
  };

  const [quantity, setQuantity] = useState(cart.quantity);

  return (
    <tr className="shop-list">
      <td
        className="h6 text-center cursor-pointer"
        onClick={handleDeleteCartDetail}
      >
        <i className="bi bi-trash"></i>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          <div className="w-50">
            <Image
              src={cart.designedImage != "" ? cart.designedImage : ""}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "/asset/images/image_default/image_default.png";
              }}
              width={1000}
              height={1000}
              objectFit="cover"
              alt="productImage"
            />
          </div>

          <h6 className="mb-0 ms-3 w-50 " style={{ wordWrap: "break-word" }}>
            {cart.designedProductName}
          </h6>
        </div>
      </td>
      <td className="text-center mb-0 ms-3">{cart.size}</td>
      <td className="text-center">{cart.color}</td>
      <td className="text-center"> {numberWithCommas(cart.price)}</td>
      <td className="qty-icons">
        <div className="d-flex justify-content-center">
          <button
            className={`btn btn-icon btn-soft-primary minus ${
              quantity == 1 && "disabled"
            } ${!cart.publish && " disabled"}`}
            onClick={() => updateQuantityCart(quantity - 1)}
          >
            -
          </button>
          <input
            className="input-quantity mt-0"
            type="number"
            min={1}
            name="quantity"
            value={quantity}
            onChange={(e: any) => updateQuantityCart(e.target.value)}
          />
          <button
            className={`btn btn-icon btn-soft-primary plus ${
              !cart.publish && " disabled"
            }`}
            onClick={() => updateQuantityCart(quantity + 1)}
          >
            +
          </button>
        </div>
        <div
          className="text-danger mt-2"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {productDontHaveEnoughQuatity.filter(
            (product) => product.id == cart.cartId
          ).length > 0 &&
            `*Chỉ còn ${
              productDontHaveEnoughQuatity.filter(
                (product) => product.id == cart.cartId
              )[0].quantityAvailable
            } sản phẩm`}
        </div>
      </td>
      {cart.publish ? (
        <td className="text-end fw-bold pe-4">
          {numberWithCommas(cart.price * cart.quantity)}
        </td>
      ) : (
        <td style={{ width: "100px", color: "red" }}>
          Sản phẩm ngừng kinh doanh
        </td>
      )}
    </tr>
  );
}
