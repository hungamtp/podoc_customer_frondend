import { useAppDispatch } from "@/components/hooks/reduxHook";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { setChoosenKey } from "@/redux/slices/choosenKey";
import { resetDesigns } from "@/redux/slices/design";
import { resetControl } from "@/redux/slices/designControl";
import { clearAllPreview } from "@/redux/slices/previews";
import { resetColors } from "@/redux/slices/selectedColors";
import { createDesignedProduct } from "@/services/design";
import { CreateDesignedProduct } from "@/services/design/dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";

const useCreateDesignedProduct = (handleCloseDialog: () => void) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (data: CreateDesignedProduct) => {
      return await createDesignedProduct(data, data.factoryId, data.productId);
    },
    {
      onSuccess: (data) => {
        //because data:any
        enqueueSnackbar("Tạo sản phẩm thiết kế thành công!", {
          autoHideDuration: 4000,
          variant: "success",
        });
        router.push("/account/mydesign");

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

export default useCreateDesignedProduct;
