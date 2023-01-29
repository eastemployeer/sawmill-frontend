export interface Operation {
    operationId: number;
    name: string;
    description: string;
    sourceProductTypeId: number;
    outputProductTypeId: number;
    sourceOutputRatio: number;
    duration: number;
    isArchived: boolean;
}
