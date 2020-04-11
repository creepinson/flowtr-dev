import express, { Request } from 'express'

import {JsonController, Get} from "routing-controllers";
import {EntityFromParam} from "typeorm-routing-controllers-extensions";

@JsonController()
export class HelloController {
 
    @Get("/api/hello")
    get() {
        return { message: "Hello, world! You have reached the api."};
    }
 
}