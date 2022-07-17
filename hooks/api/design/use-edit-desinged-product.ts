import { useAppDispatch } from "@/components/hooks/reduxHook";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { setChoosenKey } from "@/redux/slices/choosenKey";
import { resetDesigns } from "@/redux/slices/design";
import { resetControl } from "@/redux/slices/designControl";
import { clearAllPreview } from "@/redux/slices/previews";
import { resetColors } from "@/redux/slices/selectedColors";
import { editDesignedProduct } from "@/services/design";
import { EditDesignedProduct } from "@/services/design/dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const useEditDesignedProduct = (handleCloseDialog: () => void) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation(
    async (data: EditDesignedProduct) => {
      return await editDesignedProduct(data, data.designedProductId);
    },
    {
      onSuccess: (data) => {
        //because data:any
        router.push("/mydesign");

        dispatch(setChoosenKey(""));
        dispatch(clearAllPreview());
        dispatch(resetColors());
        dispatch(resetControl());
        dispatch(resetDesigns());

        handleCloseDialog();
        // router.back();
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {},
    }
  );
};

export default useEditDesignedProduct;
