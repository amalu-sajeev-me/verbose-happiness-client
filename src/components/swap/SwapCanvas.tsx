import React, { useState } from "react";
import { Box } from "@mui/material";
import { ReactSortable, Sortable } from 'react-sortablejs';
import { PageSelectionBox } from "../PageSelectionBox";


interface ItemType{
    id: number;
    name: string;
}

export const SwapCanvas: React.FC = () => {
    const [positionMap, setPositionMap] = useState<Map<number, number>>(new Map());
    // const positionMap = new Map<number, number>();
    const [list, setList] = useState<ItemType[]>([
        {
            id: 1,
            name: 'page1',
        },
        {
            id: 2,
            name: 'page 2'
        },
        {
            id: 3,
            name: 'page 3'
        },
        {
            id: 4,
            name: 'page 4'
        },
        {
            id: 5,
            name: 'page 5'
        }
    ]);
    return (
        <Box display="flex" flexWrap="wrap">
            <ReactSortable
                list={list}
                setList={setList}
                onEnd={(event: Sortable.SortableEvent) => {
                    const { oldIndex, newIndex } = event;
                    const updatedMap = new Map(positionMap);
                    if([oldIndex, newIndex].every(Number.isInteger)) updatedMap.set(oldIndex!, newIndex!);
                    console.log({ event, updatedMap });
                    setPositionMap(updatedMap);
                }}
            >
                {list.map(item => {
                    return (
                        <Box sx={{
                            border: '1px dotted grey',
                            margin: 'auto',
                            padding: 2,
                            width: 'fit-content'

                        }} key={item.id}>
                        <PageSelectionBox checked label={`Page no. ${item.id}`} onChange={()=>{}} key={item.id} />
                        </Box>
                    )
                })}
            </ReactSortable>
        </Box>
    );
}