/* eslint-disable @next/next/no-img-element */
import { CartDetailDTO } from '@/services/type.dto';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/components/hooks/reduxHook';
import  { deleteCartDetail, updateQuantityCartDetail } from '@/redux/slices/cart';
import useDeleteCartDetail from '@/hooks/api/cart/use-delete-cartdetail';
import useUpdateCart from '@/hooks/api/cart/use-update-cart';
type Props = {
  cart: CartDetailDTO;
};
export default function Cart({ cart }: Props) {
  const dispatch = useAppDispatch();
  const { mutate: deleteCartDetailApi, isLoading, error } = useDeleteCartDetail();
  const { mutate: updateCart, isUpdateCartLoading, updateCartError } = useUpdateCart();
  const carts = useAppSelector((state) => state.carts);
  const handleDeleteCartDetail = () => {
    dispatch(deleteCartDetail(cart.id));
    deleteCartDetailApi(cart.id);
  }

  const updateQuantity = (newQuantity : number) =>{
    dispatch(updateQuantityCartDetail({...cart , quantity : newQuantity}))
    setQuantity(newQuantity);
    let newCart =  carts;
    newCart[newCart.findIndex((cart: CartDetailDTO) => cart.id == cart.id)].quantity = newQuantity;
    updateCart(newCart);
  }

  const [quantity , setQuantity] = useState(cart.quantity);


  return (
    <tr className="shop-list">
      <td className="h6 text-center cursor-pointer" onClick={handleDeleteCartDetail}>
        <i className="bi bi-trash"></i>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <img src={cart.designedImage} className="img-fluid avatar avatar-small rounded shadow" style={{ height: 'auto' }} alt="product" />
          <h6 className="mb-0 ms-3">{cart.designedProductName}</h6>
        </div>
      </td>
      <td className="text-center mb-0 ms-3">{cart.size}</td>
      <td className="text-center">{cart.color}</td>
      <td className="text-center">$ {cart.price}</td>
      <td className="text-center qty-icons">
        <button className={`btn btn-icon btn-soft-primary minus ${quantity == 1 && 'disabled'}`} onClick={() => updateQuantity(quantity -1)}>-</button>
        <input type="number" min={1} name="quantity" value={quantity} className="btn btn-icon btn-soft-primary qty-btn" />
        <button className="btn btn-icon btn-soft-primary plus" onClick={() => updateQuantity(quantity +1)}>+</button>
      </td>
      <td className="text-end fw-bold pe-4">$ {cart.price * cart.quantity}</td>
    </tr>
  );
}
