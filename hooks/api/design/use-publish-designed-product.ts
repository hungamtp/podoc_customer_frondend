import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { pulishUnpublishDesign } from "@/services/design";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

const usePublishDesignedProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: { publish: boolean; productId: string }) => {
      return await pulishUnpublishDesign(data.publish, data.productId);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("allMyDesign");
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {},
    }
  );
};

export default usePublishDesignedProduct;
