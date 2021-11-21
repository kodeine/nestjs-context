import { Context } from './context';
import { ModuleRef } from '@nestjs/core';
import { ContextConfigType, RequestType } from '../interfaces';
export declare class ContextContainer {
    private readonly config;
    private readonly moduleRef?;
    private contexts;
    private contextStack;
    constructor(config: ContextConfigType, moduleRef?: ModuleRef);
    static getId(request: RequestType): string;
    private getCurrentId;
    current(): Context;
    get(request: RequestType): Context;
    add(request: RequestType): Context;
    remove(request: RequestType): void;
}
