import { useAppDispatch } from "@/components/hooks/reduxHook";

import { editDesignedProduct } from "@/services/design";
import { EditDesignedProduct } from "@/services/design/dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const useEditDesignedProduct = (handleCloseDialog: () => void) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation(async (data: EditDesignedProduct) => {
    return await editDesignedProduct(data, data.designedProductId);
  });
};

export default useEditDesignedProduct;
