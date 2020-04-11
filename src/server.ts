import { Express, Request, Response } from 'express'
import express from 'express'
import path from 'path'
import 'reflect-metadata' // this shim is required
import { createExpressServer } from 'routing-controllers'

import controllers from './controllers'

import { createConnection, useContainer } from 'typeorm'
import { Container } from 'typedi'

export class Server {
    private app: Express

    constructor() {
        // creates express app, registers all controller routes and returns you express app instance
        this.app = createExpressServer({
            controllers: controllers, // we specify controllers we want to use
        })
        useContainer(Container);
        createConnection()
            .then(async (connection) => {
                this.app.use(
                    express.static(path.resolve('./') + '/build/frontend')
                )

                this.app.get('*', (req: Request, res: Response): void => {
                    res.sendFile(
                        path.resolve('./') + '/build/frontend/index.html'
                    )
                })
            })
            .catch((error) => console.error('Database Error: ', error))
    }

    public start(port: number): void {
        // tslint:disable-next-line: no-console
        this.app.listen(port, () =>
            console.log(`Server listening on port ${port}!`)
        )
    }
}
