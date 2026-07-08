"use client";

import {AlignCenter, AlignLeft, AlignRight, ArrowUpDown, Baseline, BoldIcon, Highlighter, Image, Italic, Link2, List, ListOrdered, ListTodo, LucideIcon, MessageSquarePlusIcon, PaintRoller, Printer, Redo2Icon, RemoveFormattingIcon, Search, SpellCheckIcon, Underline, Undo2Icon,ChevronDownIcon, HighlighterIcon, ImageIcon, UploadIcon, SearchIcon, AlignJustify, ListIcon} from "lucide-react";
import { cn } from "../../lib/utils";
import {useEditorStore} from '@/store/use-editor-store';
import { Separator } from "../../../components/ui/separator"
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import {Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, } from "@/src/components/ui/dialog";
import { Button} from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input"
import {type Level} from "@tiptap/extension-heading";
import {type ColorResult, CirclePicker, SketchPicker} from "react-color"
import { BackgroundColor } from "@tiptap/extension-text-style";
import { useState } from "react";
import TextAlign from "@tiptap/extension-text-align";



const ListButton=()=>{
    const {editor} =useEditorStore();

    const Lists=[
        {
            label: "bullet-list",
            icon: List,
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
            isActive:()=>editor?.isActive("bulletList") || false,
        },
        {
            label: "ordered-list",
            icon: ListOrdered,
            onClick: () =>editor?.chain().focus().toggleOrderedList().run(),
            isActive:()=>editor?.isActive("orderedList") || false,
        },        
    ]

    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hoveer:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                <ListIcon className="size-4"/>
            </button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
              {Lists.map(({label,icon:Icon,onClick,isActive})=>
                    <button 
                    key={label}
                    onClick={onClick}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        isActive() && "bg-neutral-200/80"
                    )}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm">{label}</span>
                    </button>   

            ) }
        </DropdownMenuContent>
        </DropdownMenu>
    )
}


//Allign button
const AlignButton=()=>{
    const {editor} =useEditorStore();

    const alignments=[
        {
                label: "align-left",
                value:"left",
                icon: AlignLeft,
                // onClick: () => editor?.chain().focus().setTextAlign("left").run(),
            },
            {
                label: "align-center",
                value:"center",
                icon: AlignCenter,
                // onClick: () => editor?.chain().focus().setTextAlign("center").run(),
            },
            {
                label: "align-right",
                value:"right",
                icon: AlignRight,
                // onClick: () => editor?.chain().focus().setTextAlign("right").run(),
            },
            {
                label: "align-justify",
                value:"justify",
                icon: AlignJustify,
                // ,
            },
    ]

    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hoveer:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                <AlignLeft className="size-4"/>
            </button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
              {alignments.map(({label,value,icon:Icon})=>
                    <button 
                    key={value}
                    onClick={ () => editor?.chain().focus().setTextAlign(value).run()}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.isActive({TextAlign:value}) && "bg-neutral-200/80"
                    )}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm">{label}</span>
                    </button>   

            ) }
        </DropdownMenuContent>
        </DropdownMenu>
    )
}


//Image button
const ImageButton=()=>{
    const {editor}=useEditorStore();
    const [isDiaLogOpen,setIsDiaLogOpen]=useState(false);
    const [imageUrl,setImageUrl] =useState(editor?.getAttributes("image").src || "");

    const onChange=(href:string)=>{
        editor?.chain().focus().setImage({src: href}).run();
        setImageUrl(href);
    }
    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];

            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        };
        input.click();
    };

    const handleImageUrlSubmit=()=>{
        if(imageUrl){
            onChange(imageUrl);
            setImageUrl("");
            setIsDiaLogOpen(false);
        }
    };

    return(
        <>
        <DropdownMenu onOpenChange={(open)=>{
            if(open){
                setImageUrl(editor?.getAttributes("image").src || "")
            }
        }}>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hoveer:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                <ImageIcon className="size-4"/>
            </button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
              <DropdownMenuItem onClick={onUpload}>
                <UploadIcon className="size-4 m4-2"/>
                Upload
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setIsDiaLogOpen(true)
              }>
                <SearchIcon className="size-4 mr-2"/>
                Paste Image url
              </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isDiaLogOpen}  onOpenChange={setIsDiaLogOpen}>
              <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Insert image URL
                    </DialogTitle>
                </DialogHeader>
                <Input
                    placeholder="Insert Image URL"
                    value={imageUrl}
                    onChange={(e)=>{setImageUrl(e.target.value)}}
                    onKeyDown={(e)=>{
                        if(e.key==="Enter"){
                            handleImageUrlSubmit();
                        }
                    }}
                >
                </Input>
              <DialogFooter>
                <Button onClick={handleImageUrlSubmit}>

                </Button>
              </DialogFooter>
              </DialogContent>
        </Dialog>
        </>
    )

}


//link button
const LinkButton=()=>{
    const {editor}=useEditorStore();
    const [value,setValue] =useState(editor?.getAttributes("link").href || "");

    const onChange=(href:string)=>{
        editor?.chain().focus().extendMarkRange("link").setLink({href}).run();
        setValue("");
    }

    return(
        <DropdownMenu onOpenChange={(open)=>{
            if(open){
                setValue(editor?.getAttributes("link").href || "")
            }
        }}>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hoveer:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                <Link2 className="size-4"/>
            </button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
              <Input
              placeholder="https://example.com"
              value={value}
              onChange={(e)=>setValue(e.target.value)}
              />
              <Button onClick={()=>onChange(value)}>
                Apply
              </Button>
        </DropdownMenuContent>
        </DropdownMenu>
    )

}


// highlighter dropdown
const HighlightColorButton=()=>{
    const {editor} =useEditorStore();

    const value=editor?.getAttributes('highlight').color || "#000000";

    const onChange=(color:ColorResult)=>{
        editor?.chain().focus().setHighlight({color: color.hex}).run();
    };

    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hoveer:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                <HighlighterIcon className="size-4"/>
            </button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0">
              <SketchPicker
                color={value}
                onChange={onChange}
              />
        </DropdownMenuContent>
        </DropdownMenu>
    )
}


//Text color dropdown
const TextColorButton=()=>{
    const {editor} =useEditorStore();
    const value=editor?.getAttributes("textStyle").color || "#000000";  
    const onChange=(color:ColorResult)=>{
        editor?.chain().focus().setColor(color.hex).run();
    };

    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hoveer:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                <span className="text-xs">
                    A
                </span>
                <div className="h-0.5 w-full" style={{backgroundColor:value}}/>
            </button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0">
              <SketchPicker
                color={value}
                onChange={onChange}
              />
        </DropdownMenuContent>
        </DropdownMenu>
    )
}


// Heading dropdown
const HeadingLevelButton=()=>{
    const {editor}= useEditorStore();

    const Headings=[
        {label:"Normal Text" , value:0, fontSize:"16px"},
        {label:"Heading 1", value: 1, fontSize: "32px"}, 
        {label:"Heading 2", value: 2, fontSize: "24px"}, 
        {label:"Heading 3", value: 3, fontSize: "20px"}, 
        {label:"Heading 4", value: 4, fontSize: "18px"}, 
        {label:"Heading 5", value: 5, fontSize: "16px"}, 
    ]

    const getCurrentHeading=()=>{
        for(let level=1;level<=5;level++){
            if(editor?.isActive("heading",{level})){
                return `Heading ${level}`;
            }
        }
        return "Normal Text";
    }
    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hoveer:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                <span className="truncate">
                    {getCurrentHeading()}
                </span>
                <ChevronDownIcon className="ml-2 size-4 shrink-0"></ChevronDownIcon>
            </button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {Headings.map(({label,value,fontSize})=>(

                <button
                onClick={()=>{
                    if(value==0){
                        editor?.chain().focus().setParagraph().run();
                    }else{
                        editor?.chain().focus().toggleHeading({level:value as Level}).run();
                    }
                }}
                key={value}
                style={{fontSize}}
                className={cn(
                    "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                    (value==0 && !editor?.isActive("heading")) || editor?.isActive("heading", {level:value}) && "bg-neutral-200/80"
                )}                
                >
                    {label}
                </button>
            ))}

        </DropdownMenuContent>
        </DropdownMenu>

    )
}


//Fonts dropdown
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
        <DropdownMenuTrigger asChild>
            {/* </DropdownMenuTrigger>Radix UI: Use `asChild` when providing your own element. */}
            {/* </DropdownMenu> </DropdownMenuTrigger>Without `asChild`, Radix renders its own element (e.g. <button>). */}
            {/* </DropdownMenuTrigger>Wrapping a <button> inside DropdownMenuTrigger creates: */}
            {/* </DropdownMenuTrigger><button><button>...</button></button> */}
            {/* </DropdownMenuTrigger>causing invalid HTML and hydration errors. */}
            {/* </DropdownMenuTrigger>`asChild` tells Radix to use the child element instead of creating a new one. */}
            <button className="h-7 w-30 shrink-0 flex items-center justify-between rounded-sm hoveer:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                <span className="truncate">
                    {editor?.getAttributes("textStyle").fontFamily || "Ariel"}
                </span>
                <ChevronDownIcon className="ml-2 size-4 shrink-0"></ChevronDownIcon>
            </button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {fonts.map(({label,value})=>(
                <button 
                onClick={()=>editor?.chain().focus().setFontFamily(value).run()}
                key={value}
                className={cn(
                    "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                    editor?.getAttributes("textStyle").fontFamily=== value && "bg-neutral-200/80"
                )}
                style={{fontFamily:value}}
                >
                    <span className= "text-sm">{label}</span>
                </button>
            ))}
        </DropdownMenuContent>
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
        ],
        [
            {
                label:"comment",
                icon:MessageSquarePlusIcon,
                onClick:()=>console.log("plus clicked"),
                isActive:true,
            },
        ],
        [
            
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
            
            <Separator orientation="vertical" className="h-6 w-px bg-neutral-400"/>
                <FontFamilyButton/>

            <Separator orientation="vertical" className="h-6 w-px bg-neutral-400"/>
                <HeadingLevelButton/>
            

            <Separator orientation="vertical" className="h-6 w-px bg-neutral-400"/>
                
            


            <Separator orientation="vertical" className="h-6 w-px bg-neutral-400"/>
                {section[1].map((item)=>(
                    <ToolBar key={item.label} {...item} />
                ))}

                <TextColorButton/>
                <HighlightColorButton/> 


            <Separator orientation="vertical" className="h-6 w-px bg-neutral-400"/>
                <LinkButton/>
                <ImageButton/>
                <AlignButton/>
                <ListButton/>
                {section[2].map((item)=>(
                    <ToolBar key={item.label} {...item} />
                ))}
            


            <Separator orientation="vertical" className="h-6 bg-neutral-800"/>

            {section[3].map((item)=>(
                <ToolBar key={item.label} {...item} />
            ))}
        </div>
    );
};