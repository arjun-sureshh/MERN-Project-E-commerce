import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface for the product Price and Stock page
interface productFields {
    skuId: string;
    mrp: string;
    fullfilementBy: string;
    ProcurementType: string;
    ProcurementSLA: string;
    sellingPrice: string;
    stock: string;
    shippingProvider: string;
    localDeliveryCharge: string;
    ZonalDeliveryCharge: string;
    nationalDeliveryCharge: string;
    length: string;
    breadth: string;
    height: string;
    weight: string;
    HSN: string;
    taxCode: string;

    countryOfOrigin: string;
    manufacturerDetails: string;
    packerDetails: string;
    productTitle: string;
    productDiscription: string;
    intheBox: string;
    minimumOrderQty: string;
    color: string;

    warantySummary: string;
    warrantyPeriod: string;
    searchKeyword: string;
    featureTitle: string;
    featureContent: string;

}

interface Feature {
    title: string;
    content: string;
}
interface searchKeyWords {
    index: number;
    searchKeyWord: string;
}


interface ToggleState {
    reduxStateName: any;
    menuOpen: boolean;
    openPage: { [key: string]: boolean };
    productAdddingState: number | null;
    sellerRegistrationStage: number;
    productId: string;
    sellerId: string;
    productFields: productFields;
    features: Feature[],
    searchKeyWords: searchKeyWords[],
    images: string[],
}

const initialState: ToggleState = {
    menuOpen: false,
    openPage: {},
    productAdddingState: 1,
    sellerRegistrationStage: 1,
    productId: "",
    sellerId: "",
    productFields: {
        skuId: "",
        mrp: "",
        fullfilementBy: "",
        ProcurementType: "",
        ProcurementSLA: "",
        sellingPrice: "",
        stock: "",
        shippingProvider: "",
        localDeliveryCharge: "",
        ZonalDeliveryCharge: "",
        nationalDeliveryCharge: "",
        length: "",
        breadth: "",
        height: "",
        weight: "",
        HSN: "",
        taxCode: "",

        countryOfOrigin: "",
        manufacturerDetails: "",
        packerDetails: "",
        productTitle: "",
        productDiscription: "",
        intheBox: "",
        minimumOrderQty: "",
        color: "",

        warantySummary: "",
        warrantyPeriod: "",
        searchKeyword: "",
        featureTitle: "",
        featureContent: "",

    },
    features: [],
    searchKeyWords: [],
    images: [], // ✅ Added empty array for images
    reduxStateName: undefined
}

const toggleSlice = createSlice({
    name: "toogle",
    initialState,
    reducers: {
        toggleMenuOpen: (state) => {
            state.menuOpen = !state.menuOpen
        },

        togglePageControl: (state, action: PayloadAction<string>) => {
            const title = action.payload;
            state.openPage = {};
            state.openPage[title] = true
        },
        toggleResetPage: (state) => {
            state.openPage = {};
        },
        toggleProductAddingState: (state, action: PayloadAction<number>) => {
            state.productAdddingState = action.payload;
        },
        toggleSellerRegistrationStage: (state, action: PayloadAction<number>) => {
            state.sellerRegistrationStage = action.payload;
        },
        toggleProductId: (state, action: PayloadAction<string>) => {
            state.productId = action.payload;
        },
        toggleSellerId: (state, action: PayloadAction<string>) => {
            state.sellerId = action.payload;
        },
        toggleProductFields: <T extends keyof productFields>(
            state: ToggleState,
            action: PayloadAction<{ field: T; value: productFields[T] }>
        ) => {
            (state.productFields as Record<keyof productFields, any>)[action.payload.field] = action.payload.value;
        },
        // ✅ New action: Add a feature to the `features` array
        toggleFeatureAdd: (state, action: PayloadAction<Feature>) => {
            state.features.push(action.payload);
        },
        removeFeatureField: (state, action: PayloadAction<number>) => {
            state.features = state.features.filter((_, i) => i !== action.payload);
        }, updateFeatureField: (state, action: PayloadAction<{ index: number; key: "title" | "content"; value: string }>) => {
            state.features[action.payload.index][action.payload.key] = action.payload.value;
        },
        toggleSearchKeyWordAdd: (state, action: PayloadAction<string>) => {
            state.searchKeyWords.push({ index: state.searchKeyWords.length, searchKeyWord: action.payload });
        },
        toggleSearchKeyWordFieldRemove: (state, action: PayloadAction<number>) => {
            state.searchKeyWords = state.searchKeyWords.filter((_, i) => i !== action.payload);
        },
        toggleSearchKeyWordsUpdate: (state, action: PayloadAction<{ index: number; value: string }>) => {
            if (state.searchKeyWords[action.payload.index]) {
                state.searchKeyWords[action.payload.index].searchKeyWord = action.payload.value;
            }
        },
        toggleAddImage: (state, action: PayloadAction<string>) => {
            state.images.push(action.payload);
        },
        toggleRemoveImage: (state, action: PayloadAction<number>) => {
            state.images = state.images.filter((_, index) => index !== action.payload);
        },



    }
})

export const {
    toggleMenuOpen,
    toggleResetPage,
    togglePageControl,
    toggleProductAddingState,
    toggleProductId,
    toggleProductFields,
    toggleFeatureAdd,
    removeFeatureField,
    updateFeatureField,
    toggleSellerRegistrationStage,
    toggleSellerId,
    toggleSearchKeyWordAdd,
    toggleSearchKeyWordFieldRemove,
    toggleSearchKeyWordsUpdate,
    toggleAddImage, // ✅ Add image
    toggleRemoveImage, // ✅ Remove image

} = toggleSlice.actions;
export default toggleSlice.reducer;