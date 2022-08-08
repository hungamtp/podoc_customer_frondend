import { DesignState } from "@/models/design";
import { createSlice } from "@reduxjs/toolkit";

export interface InfoManageData {
  choosenKey: string;
  isEmpty: boolean;
  designInfos: DesignState[];
}

const initialState: InfoManageData = {
  choosenKey: "",
  isEmpty: true,
  designInfos: [],
};

export const designSlice = createSlice({
  name: "infoManageData",
  initialState,
  reducers: {
    setValue: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.choosenKey = action.payload.choosenKey;
      state.isEmpty = false;
      state.designInfos = state.designInfos.map((designInfo) => {
        if (designInfo.key === action.payload.choosenKey) {
          return {
            ...designInfo,
            height: action.payload.height,
            leftPosition: action.payload.leftPosition,
            rotate: action.payload.rotate,
            scales: action.payload.scales,
            topPosition: action.payload.topPosition,
            width: action.payload.width,
            DPI: action.payload.DPI,
          };
        }
        return designInfo;
      });
    },
    updateUniqueData: (state, action) => {
      state.choosenKey = action.payload.choosenKey;
      state.isEmpty = false;
      state.designInfos = state.designInfos.map((designInfo) => {
        if (designInfo.key === action.payload.choosenKey) {
          if (action.payload.dataKey === "font") {
            return {
              ...designInfo,
              font: action.payload.data,
            };
          } else if (action.payload.dataKey === "textColor") {
            return {
              ...designInfo,
              textColor: action.payload.data,
            };
          } else if (action.payload.dataKey === "src") {
            return {
              ...designInfo,
              src: action.payload.data,
            };
          }
        }
        return designInfo;
      });

    },
    addDesignInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (state.isEmpty) {
        state.designInfos = [action.payload];
        state.isEmpty = false;
      } else {
        state.designInfos = [...state.designInfos, action.payload];
      }
    },
    deleteDesignInfo: (state, action) => {
      const newInfoList = state.designInfos.filter(
        (designInfo) => designInfo.key !== action.payload.key
      );
      if (newInfoList.length == 0) {
        return { choosenKey: "", isEmpty: true, designInfos: newInfoList };
      }
      return { ...state, designInfos: newInfoList };
    },
    cloneDesignInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const needDesign = state.designInfos.filter(
        (design) => design.key === action.payload.oldKey
      );
      if (needDesign.length >= 1) {
        state.designInfos = [
          ...state.designInfos,
          {
            ...needDesign[0],
            key: action.payload.newKey,
            leftPosition: 10,
            topPosition: 10,
          },
        ];
      }
    },
    updateDesignInfos: (state, action) => {
      state.isEmpty = action.payload.isEmpty;
      state.designInfos = action.payload.designInfos;
    },
    updateTmpSrc: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.designInfos = state.designInfos.map((designInfo) => {
        if (designInfo.key === action.payload.key) {
          return {
            ...designInfo,
            tmpSrc: action.payload.tmpSrc,
          };
        }
        return designInfo;
      });
    },
    resetDesigns: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setValue,
  addDesignInfo,
  deleteDesignInfo,
  cloneDesignInfo,
  updateDesignInfos,
  updateUniqueData,
  updateTmpSrc,
  resetDesigns,
} = designSlice.actions;

export default designSlice.reducer;
