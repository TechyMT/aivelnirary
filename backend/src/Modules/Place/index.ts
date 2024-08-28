import { placeRoutes } from "./routes"
import { Router } from "express"

const PlaceModule = Router()

PlaceModule.use("/place", placeRoutes)


export { PlaceModule };