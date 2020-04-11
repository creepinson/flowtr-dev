import {Server} from "./server";
import express from 'express';
import dotenv from 'dotenv'

dotenv.config()

const port = "8080";

const server = new Server();

server.start(parseInt(process.env.PORT || port));
