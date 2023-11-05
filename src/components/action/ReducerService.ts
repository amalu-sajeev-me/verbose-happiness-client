import { FILE_OPEN_VIEW_ACTIONS, IAction, IFileOpenViewState } from "./Action.type";

export class ReducerService {
    
    static fileOpenView =(
        prevState: IFileOpenViewState,
        action: IAction<FILE_OPEN_VIEW_ACTIONS>
    ): IFileOpenViewState => {
        const { type, payload } = action;
        switch (type) {
            case FILE_OPEN_VIEW_ACTIONS.FETCH:
                return { ...prevState, ...payload as IFileOpenViewState };
            case FILE_OPEN_VIEW_ACTIONS.FILE_SELECTION:
                {
                    const { selectedPages } = prevState;
                    const updatedSet = new Set(selectedPages);
                    const { pageNumber } = payload as { pageNumber: number };
                    if (updatedSet.has(pageNumber)) updatedSet.delete(pageNumber);
                    else updatedSet.add(pageNumber);
                    return { ...prevState, selectedPages: updatedSet };
                }
            case FILE_OPEN_VIEW_ACTIONS.ON_OR_OFF_TOGGLE:
                {
                    const { fieldName } = payload as { fieldName: keyof IFileOpenViewState };
                    return { ...prevState, [fieldName]: !prevState[fieldName] as boolean };
                }
            default:
                return { ...prevState };
        }

    }
}