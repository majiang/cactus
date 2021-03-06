/*
 * Copyright 2020 Hyperledger Cactus Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * CarsManagement.ts
 */

import { LedgerOperation } from '../business-logic-plugin/LedgerOperation';
import { LPInfoHolder } from './util/LPInfoHolder';
import { VerifierBase } from '../ledger-plugin/VerifierBase';
import { ConfigUtil } from './util/ConfigUtil';

const fs = require('fs');
const path = require('path');
const config: any = ConfigUtil.getConfig();
import { getLogger } from "log4js";
const moduleName = 'CarsManagement';
const logger = getLogger(`${moduleName}`);
logger.level = config.logLevel;

export class CarsManagement {
    private connectInfo: LPInfoHolder = null;                   // connection information
    private verifierFabric: VerifierBase = null;

    constructor() {
        this.connectInfo = new LPInfoHolder();
    }

    queryCar(carID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.verifierFabric === null) {
                logger.debug("create verifierFabric");
                const ledgerPluginInfo: string = this.connectInfo.getLegerPluginInfo("r9IS4dDf");
                this.verifierFabric = new VerifierBase(ledgerPluginInfo);
            }

            const contract = {"channelName": "mychannel", "contractName": "fabcar"};
            const method = {type: "evaluateTransaction", command: "queryCar"};
            const args = {"args": [carID]};

            this.verifierFabric.execSyncFunctionNeo(contract, method, args).then(result => {
                resolve(result);
            }).catch((err) => {
                logger.error(err);
                reject(err);
            });

        });
    }

    queryAllCars(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.verifierFabric === null) {
                logger.debug("create verifierFabric");
                const ledgerPluginInfo: string = this.connectInfo.getLegerPluginInfo("r9IS4dDf");
                this.verifierFabric = new VerifierBase(ledgerPluginInfo);
            }

            const contract = {"channelName": "mychannel", "contractName": "fabcar"};
            const method = {type: "evaluateTransaction", command: "queryAllCars"};
            const args = {"args": []};

            this.verifierFabric.execSyncFunctionNeo(contract, method, args).then(result => {
                resolve(result);
            }).catch((err) => {
                logger.error(err);
                reject(err);
            });

        });
    }

}
