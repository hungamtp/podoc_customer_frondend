import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { createDesignedProduct } from "@/services/design";
import { DesignedProductDto } from "@/services/design/dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const useGetBlueprintByProduct = (productId: number) => {
  const router = useRouter();
  return useMutation(
    async (data: DesignedProductDto) => {
      return await createDesignedProduct(productId, data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        router.push("/design");
        // router.back();
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {},
    }
  );
};

export default useGetBlueprintByProduct;