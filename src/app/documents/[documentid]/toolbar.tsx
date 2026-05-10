"use client";

import {AlignLeft, ArrowUpDown, Baseline, BoldIcon, Highlighter, Image, Italic, Link2, List, ListOrdered, ListTodo, LucideIcon, MessageSquarePlusIcon, PaintRoller, Printer, Redo2Icon, Search, SpellCheckIcon, Underline, Undo2Icon} from "lucide-react";
import { cn } from "../../lib/utils";
interface ToolBarbuttonProps{
    onClick?:()=>void;
    isActive?:boolean;
    icon:LucideIcon;
}

const ToolBar=({
    onClick,
    isActive,
    icon:Icon,
}:ToolBarbuttonProps)=>{
    return(
        <button
        onClick={onClick}
        className={cn(
  "text-sm h-7 min-w-7 m-auto flex items-center justify-center gap-1.5 rounded-sm overflow-x-auto "
)}
        >
            <Icon className="size-4"/>
        </button>
    )
}


export const Toolbar=()=>{
    const section:{
        label:string;
        icon:LucideIcon;
        onClick:()=>void;
        isActive:boolean;
    }[][]=[
        [
            {
                label:"search",
                icon:Search,
                onClick:()=>console.log("search clicked"),
                isActive:true,
            },
            {
                label:"undo",
                icon:Undo2Icon,
                onClick:()=>console.log("undo clicked"),
                isActive:true,
            },
            {
                label:"redo",
                icon:Redo2Icon,
                onClick:()=>console.log("redo clicked"),
                isActive:true,
            },
            {
                label:"printer",
                icon:Printer,
                onClick:()=>console.log("printer clicked"),
                isActive:true,
            },
            {
                label:"spell",
                icon:SpellCheckIcon,
                onClick:()=>console.log("spell clicked"),
                isActive:true,
            },
            {
                label:"paint",
                icon:PaintRoller,
                onClick:()=>console.log("paint clicked"),
                isActive:true,
            },
            {
                label:"size",
                icon:PaintRoller,
                onClick:()=>console.log("paint clicked"),
                isActive:true,
            },
        ],
        [
            {
                label:"bold",
                icon:BoldIcon,
                onClick:()=>console.log("bold clicked"),
                isActive:true,
            },
            {
                label:"italic",
                icon:Italic,
                onClick:()=>console.log("italic clicked"),
                isActive:true,
            },
            {
                label:"underline",
                icon:Underline,
                onClick:()=>console.log("underline clicked"),
                isActive:true,
            },
            {
                label:"textcolor",
                icon:Baseline,
                onClick:()=>console.log("textcolor clicked"),
                isActive:true,
            },
            {
                label:"highlighter",
                icon:Highlighter,
                onClick:()=>console.log("italic clicked"),
                isActive:true,
            },
        ],
        [
            {
                label:"link",
                icon:Link2,
                onClick:()=>console.log("link clicked"),
                isActive:true,
            },
            {
                label:"comment",
                icon:MessageSquarePlusIcon,
                onClick:()=>console.log("plus clicked"),
                isActive:true,
            },
            {
                label:"image",
                icon:Image,
                onClick:()=>console.log("image clicked"),
                isActive:true,
            },
        ],
        [
            {
                label: "align-left",
                icon: AlignLeft,
                onClick: () => console.log("align-left clicked"),
                isActive: true,
            },
            {
                label: "sort",
                icon: ArrowUpDown,
                onClick: () => console.log("sort clicked"),
                isActive: false,
            }  ,
            {
                label: "todo-list",
                icon: ListTodo,
                onClick: () => console.log("todo list clicked"),
                isActive: false,
            },
            {
                label: "bullet-list",
                icon: List,
                onClick: () => console.log("bullet list clicked"),
                isActive: false,
            },
            {
            label: "ordered-list",
            icon: ListOrdered,
            onClick: () => console.log("ordered list clicked"),
            isActive: false,
            },
        ],

    ];


    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-10 flex items-center gap-x-0.5 overflow-x-auto">
            <div>

            </div>
            {section.map((group,index)=>(
                <div className="flex" key={index}>
                    {group.map((item) => (
                        <ToolBar key={item.label} {...item} />
                    ))}
                </div>
            ))}
        </div>
    );
};