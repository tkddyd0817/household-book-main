import { financeReducer } from "@/features/finance/financeSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        finance:financeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:false,
        }),
});

// localStorage에 상태 저장 (클라이언트 사이드에서만)
if (typeof window !== 'undefined') {
    store.subscribe(()=>{
        const state = store.getState();
        localStorage.setItem("financeState", JSON.stringify(state.finance));
    });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// import { financeReducer } from "@/features/finance/financeSlice";
// import { configureStore } from "@reduxjs/toolkit";



// export const store = configureStore({
//     reducer:{
//         finance:financeReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck:false,
//         }),
// });

// // localStorage에 상태 저장
// store.subscribe(()=>{
//     const state = store.getState();
//     localStorage.store.getItem("financeState",JSON.stringify(state.finance));
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;