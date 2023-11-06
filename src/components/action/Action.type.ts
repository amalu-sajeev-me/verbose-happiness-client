export type EnumType<T> = T[keyof T]; 

export interface IAction<TActionTypesEnum> {
    type: TActionTypesEnum;
    payload: unknown;
}

export interface IFileOpenViewState {
    fileName: string;
    pageCount: number;
    loading: boolean;
    overWrite: boolean;
    selectedPages: Set<number>;
    renameTo: string | null;
    moreInfo?: Record<'docId' | 'ownerId' | 'fileName', string>;
    extractedDownloadUrl: string | null;
}


export const enum FILE_OPEN_VIEW_ACTIONS {
    FETCH = 'fetch',
    FILE_SELECTION = 'file-selection',
    ON_OR_OFF_TOGGLE = 'toggle'
}