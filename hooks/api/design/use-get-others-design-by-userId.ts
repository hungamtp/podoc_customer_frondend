import {
  GetAllDesignFilter,
  getOthersDesignById,
  getOthersDesignByUserId,
} from "@/services/design";
import { useQuery } from "react-query";

const useGetOthersDesignByUserId = (
  filter: GetAllDesignFilter,
  userId: string
) => {
  return useQuery(["othersDesignedProducts", userId], async () => {
    return await getOthersDesignByUserId(filter, userId);
  });
};

export default useGetOthersDesignByUserId;
