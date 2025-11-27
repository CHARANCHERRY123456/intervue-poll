import { configureStore } from "@reduxjs/toolkit"
import appReducer from "../features/app/appSlice.js"

export default configureStore({
  reducer: {
    app: appReducer
  }
})
