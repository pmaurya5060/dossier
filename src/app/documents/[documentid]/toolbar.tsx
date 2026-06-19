"use client";

import {AlignCenter, AlignLeft, AlignRight, ArrowUpDown, Baseline, BoldIcon, Highlighter, Image, Italic, Link2, List, ListOrdered, ListTodo, LucideIcon, MessageSquarePlusIcon, PaintRoller, Printer, Redo2Icon, RemoveFormattingIcon, Search, SpellCheckIcon, Underline, Undo2Icon} from "lucide-react";
import { cn } from "../../lib/utils";
import {useEditorStore} from '@/store/use-editor-store';
import { Separator } from "../../../components/separator"
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Verdana', value: 'Verdana' },
  ];

  return(
    <DropdownMenu>
        <DropdownMenuTrigger>
            <button className="h-7 ">

            </button>
        </DropdownMenuTrigger>
    </DropdownMenu>
  )



};


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
  "text-sm h-7 min-w-7 flexjustify-center gap-1.5 rounded-sm overflow-x-auto "
)}
        >
            <Icon className="size-4"/>
        </button>
    )
}


export const Toolbar=()=>{
    const editor = useEditorStore(
        (state) => state.editor
    );
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
                onClick: () =>
                    editor?.chain().focus().undo().run(),
                isActive: editor?.can().undo() || false,
            },
            {
                label:"redo",
                icon:Redo2Icon,
                onClick:()=>editor?.chain().focus().redo().run(),
                isActive:editor?.can().undo() || false,
            },
            {
                label:"printer",
                icon:Printer,
                onClick:()=>window.print(),
                isActive:true,
            },
            {
                label:"spell",
                icon:SpellCheckIcon,
                onClick:()=>{
                    const current =editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck",current==="false"?"true":"false");
                },
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
                 onClick:() =>editor?.chain().focus().toggleBold().run(),
                isActive:editor?.isActive("bold") || false,
            },
            {
                label:"italic",
                icon:Italic,
                onClick:()=> editor?.chain().focus().toggleItalic().run(),
                isActive:editor?.isActive("italic") || false,
            },
            {
                label:"underline",
                icon:Underline,
                onClick:()=>editor?.chain().focus().toggleUnderline().run(),
                isActive:editor?.isActive("underline") || false,
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
                onClick:()=>editor?.chain().focus().toggleHighlight().run(),
                isActive:editor?.isActive("highlight") || false,
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
                onClick: () => editor?.chain().focus().setTextAlign("left").run(),
                isActive: true,
            },
            {
                label: "align-center",
                icon: AlignCenter,
                onClick: () => editor?.chain().focus().setTextAlign("center").run(),
                isActive: true,
            },
            {
                label: "align-right",
                icon: AlignRight,
                onClick: () => editor?.chain().focus().setTextAlign("right").run(),
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
                onClick: () =>  editor?.chain().focus().toggleTaskList().run(),
                isActive:editor?.isActive("taskList") || false,
            },
            {
                label: "bullet-list",
                icon: List,
                onClick: () => editor?.chain().focus().toggleBulletList().run(),
                isActive:editor?.isActive("bulletList") || false,
            },
            {
                label: "ordered-list",
                icon: ListOrdered,
                onClick: () =>editor?.chain().focus().toggleOrderedList().run(),
                isActive:editor?.isActive("orderedList") || false,
            },
            {
                label: "remove-formatting",
                icon: RemoveFormattingIcon,
                onClick: () =>editor?.chain().focus().unsetAllMarks().run(),
                isActive:editor?.isActive("removeFormatting") || false,
            },
        ],

    ];


    return (
        <div className="sticky top-0 z-50 bg-white border-b rounded-2xl m-1 h-16 flex items-center px-4 gap-2">
            {section[0].map((item)=>(
                <ToolBar key={item.label} {...item} />
            ))}
            
            <Separator orientation="vertical" className="h-6 bg-neutral-800"></Separator>

            <Separator orientation="vertical" className="h-6 bg-neutral-800"></Separator>

            <Separator orientation="vertical" className="h-6 bg-neutral-800"></Separator>

            <Separator orientation="vertical" className="h-6 bg-neutral-800"></Separator>


            {section[1].map((item)=>(
                <ToolBar key={item.label} {...item} />
            ))}

            <Separator orientation="vertical" className="h-6 bg-neutral-800"></Separator>

            {section[2].map((item)=>(
                <ToolBar key={item.label} {...item} />
            ))}

            <Separator orientation="vertical" className="h-6 bg-neutral-800"></Separator>

            {section[3].map((item)=>(
                <ToolBar key={item.label} {...item} />
            ))}
        </div>
    );
};