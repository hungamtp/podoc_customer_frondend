import { createSlice } from "@reduxjs/toolkit";
import { Blueprint } from "@/models/design/blueprint";

export interface BlueprintData {
  position: string;
  blueprints: Blueprint[];
}

const blueprintInit = [
  {
    frameImage:
      "https://firebasestorage.googleapis.com/v0/b/assign…=media&token=c6307725-741f-477b-b01f-97407f61cb61",
    position: "Front",
    placeholder: {
      width: 15,
      height: 17,
    },
    designInfos: [
      {
        key: "",
        name: "",
        types: "image/jpeg",
        height: 0,
        width: 0,
        leftPosition: 0,
        rotate: 0,
        scales: 0,
        topPosition: 0,
        src: "https://www.google.com/search?q=default+image&tbm=isch&source=iu&ictx=1&vet=1&fir=E__DFTIbn9J8IM%252CTx4IM-J_9YNR0M%252C_%253BJpaFCmffhUdABM%252CeirPelkp9eoYkM%252C_%253BdAOBLb6Mi03B7M%252CtF62HY2qabLnWM%252C_%253BdzPYWaGt8jz9-M%252CxyV8ddqOau4KMM%252C_%253B6tO2K22XfMJMrM%252CJQ2op_24QBAxAM%252C_%253BiBwkPVyfzII9PM%252CRpvxnsLrgxL3_M%252C_%253BQ6BBzp2xDdCTDM%252C5SCId8Hd97daPM%252C_%253BZUQ4hqK0eoOE9M%252CCG1CySSEUS0-DM%252C_%253BX_RNqGrs8uOLUM%252CQgac5TnVA2DlVM%252C_%253Bfzm-cB-sF1nIvM%252CYlh7sHyFI9lHtM%252C_%253BCFxypJE63mo0qM%252CCfVbZJhXslp5nM%252C_%253ByFECy8Q7jEiD6M%252CzfN5DSNirAo6lM%252C_%253BmFBeEI-GK2RjoM%252CC93Eufb1-gvCmM%252C_%253BIVgx2CC_VChlFM%252CzfN5DSNirAo6lM%252C_%253BGEbPHTiPVju47M%252CoXGuy_ozigx-hM%252C_&usg=AI4_-kRMLHt0QpXibXOVMObu4AxomAnBBA&sa=X&ved=2ahUKEwiqtJWqz7v3AhUazIsBHTxODDsQ9QF6BAgDEAE&biw=1920&bih=929&dpr=1#imgrc=E__DFTIbn9J8IM",
      },
    ],
  },

  {
    frameImage:
      "https://firebasestorage.googleapis.com/v0/b/assign…=media&token=c6307725-741f-477b-b01f-97407f61cb61",
    position: "back",
    placeholder: {
      width: 12,
      height: 13.7,
    },
    designInfos: [
      {
        key: "",
        name: "",
        types: "image/jpeg",
        height: 0,
        width: 0,
        leftPosition: 0,
        rotate: 0,
        scales: 0,
        topPosition: 0,
        src: "https://www.google.com/search?q=default+image&tbm=isch&source=iu&ictx=1&vet=1&fir=E__DFTIbn9J8IM%252CTx4IM-J_9YNR0M%252C_%253BJpaFCmffhUdABM%252CeirPelkp9eoYkM%252C_%253BdAOBLb6Mi03B7M%252CtF62HY2qabLnWM%252C_%253BdzPYWaGt8jz9-M%252CxyV8ddqOau4KMM%252C_%253B6tO2K22XfMJMrM%252CJQ2op_24QBAxAM%252C_%253BiBwkPVyfzII9PM%252CRpvxnsLrgxL3_M%252C_%253BQ6BBzp2xDdCTDM%252C5SCId8Hd97daPM%252C_%253BZUQ4hqK0eoOE9M%252CCG1CySSEUS0-DM%252C_%253BX_RNqGrs8uOLUM%252CQgac5TnVA2DlVM%252C_%253Bfzm-cB-sF1nIvM%252CYlh7sHyFI9lHtM%252C_%253BCFxypJE63mo0qM%252CCfVbZJhXslp5nM%252C_%253ByFECy8Q7jEiD6M%252CzfN5DSNirAo6lM%252C_%253BmFBeEI-GK2RjoM%252CC93Eufb1-gvCmM%252C_%253BIVgx2CC_VChlFM%252CzfN5DSNirAo6lM%252C_%253BGEbPHTiPVju47M%252CoXGuy_ozigx-hM%252C_&usg=AI4_-kRMLHt0QpXibXOVMObu4AxomAnBBA&sa=X&ved=2ahUKEwiqtJWqz7v3AhUazIsBHTxODDsQ9QF6BAgDEAE&biw=1920&bih=929&dpr=1#imgrc=E__DFTIbn9J8IM",
      },
    ],
  },
] as Blueprint[];

const initialState: BlueprintData = {
  position: "Front",
  blueprints: blueprintInit,
};

export const blueprintsSlice = createSlice({
  name: "blueprintsData",
  initialState,
  reducers: {
    setPosition: (state, action) => {
      return { ...state, position: action.payload };
    },
    updateBlueprint: (state, action) => {
      return {
        ...state,
        position: action.payload.position,
        blueprints: action.payload.blueprints,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBlueprint, setPosition } = blueprintsSlice.actions;

export default blueprintsSlice.reducer;
