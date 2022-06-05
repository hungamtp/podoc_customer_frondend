import { DesignState } from "@/models/design";
import { createSlice } from "@reduxjs/toolkit";

export interface InfoManageData {
  choosenKey: string;
  designInfos: DesignState[];
}

const initialState: InfoManageData = {
  choosenKey: "",
  designInfos: [
    {
      key: "",
      name: "",
      type: "image/jpeg",
      height: 0,
      width: 0,
      left: 0,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 0,
      top: 0,
      src: "https://www.google.com/search?q=default+image&tbm=isch&source=iu&ictx=1&vet=1&fir=E__DFTIbn9J8IM%252CTx4IM-J_9YNR0M%252C_%253BJpaFCmffhUdABM%252CeirPelkp9eoYkM%252C_%253BdAOBLb6Mi03B7M%252CtF62HY2qabLnWM%252C_%253BdzPYWaGt8jz9-M%252CxyV8ddqOau4KMM%252C_%253B6tO2K22XfMJMrM%252CJQ2op_24QBAxAM%252C_%253BiBwkPVyfzII9PM%252CRpvxnsLrgxL3_M%252C_%253BQ6BBzp2xDdCTDM%252C5SCId8Hd97daPM%252C_%253BZUQ4hqK0eoOE9M%252CCG1CySSEUS0-DM%252C_%253BX_RNqGrs8uOLUM%252CQgac5TnVA2DlVM%252C_%253Bfzm-cB-sF1nIvM%252CYlh7sHyFI9lHtM%252C_%253BCFxypJE63mo0qM%252CCfVbZJhXslp5nM%252C_%253ByFECy8Q7jEiD6M%252CzfN5DSNirAo6lM%252C_%253BmFBeEI-GK2RjoM%252CC93Eufb1-gvCmM%252C_%253BIVgx2CC_VChlFM%252CzfN5DSNirAo6lM%252C_%253BGEbPHTiPVju47M%252CoXGuy_ozigx-hM%252C_&usg=AI4_-kRMLHt0QpXibXOVMObu4AxomAnBBA&sa=X&ved=2ahUKEwiqtJWqz7v3AhUazIsBHTxODDsQ9QF6BAgDEAE&biw=1920&bih=929&dpr=1#imgrc=E__DFTIbn9J8IM",
    },
  ],
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
      state.designInfos = state.designInfos.map((designInfo) => {
        // console.log(action.payload.choosenKey === designInfo.key, 'chay nee');
        if (designInfo.key === action.payload.choosenKey) {
          return {
            ...designInfo,
            height: action.payload.height,
            left: action.payload.left,
            rotate: action.payload.rotate,
            scale: action.payload.scale,
            top: action.payload.top,
            width: action.payload.width,
            x: 0,
            y: 0,
          };
        }
        return designInfo;
      });
    },
    addDesignInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action.payload, "loadddd");
      if (state.choosenKey == "") {
        state.designInfos = [action.payload];
      } else state.designInfos = [...state.designInfos, action.payload];
      state.choosenKey = action.payload.key;
    },
    deleteDesignInfo: (state, action) => {
      const newInfoList = state.designInfos.filter(
        (designInfo) => designInfo.key !== action.payload.key
      );
      if (newInfoList.length == 0) {
        return { choosenKey: "", designInfos: newInfoList };
      }
      console.log(newInfoList.length, "newwww");
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
      if (needDesign.length === 1) {
        state.designInfos = [
          ...state.designInfos,
          { ...needDesign[0], key: action.payload.newKey, left: 10, top: 10 },
        ];
        state.choosenKey = action.payload.newKey;
      }
    },
    updateDesignInfos: (state, action) => {
      state.choosenKey = "";
      state.designInfos = action.payload;
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
} = designSlice.actions;

export default designSlice.reducer;
