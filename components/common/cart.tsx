/* eslint-disable @next/next/no-img-element */
import { CartDetailDTO } from '@/services/type.dto';
import React, { useState } from 'react';
import { useAppDispatch } from '@/components/hooks/reduxHook';
import  { deleteCartDetail, updateQuantityCartDetail } from '@/redux/slices/cart';
import useDeleteCartDetail from '@/hooks/api/cart/use-delete-cartdetail';
type Props = {
  cart: CartDetailDTO;
};
export default function Cart({ cart }: Props) {
  const dispatch = useAppDispatch();
  const { mutate: deleteCartDetailApi, isLoading, error } = useDeleteCartDetail();
  const handleDeleteCartDetail = () => {
    dispatch(deleteCartDetail(cart.id));
    deleteCartDetailApi(cart.id);
  }

  const updateQuantity = (newQuantity : number) =>{
    dispatch(updateQuantityCartDetail({...cart , quantity : newQuantity}))
    setQuantity(newQuantity);
    
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
        <button className={`btn btn-icon btn-soft-primary minus ${quantity ==1 && 'disabled'}`} onClick={() => updateQuantity(quantity -1)}>-</button>
        <input min="0" name="quantity" value={quantity} type="number" className="btn btn-icon btn-soft-primary qty-btn quantity" />
        <button className="btn btn-icon btn-soft-primary plus" onClick={() => updateQuantity(quantity +1)}>+</button>
      </td>
      <td className="text-end fw-bold pe-4">$ {cart.price * cart.quantity}</td>
    </tr>
  );
}
