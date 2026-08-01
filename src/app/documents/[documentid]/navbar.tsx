"use client"

import Link from "next/link" 
import Image from "next/image"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } 
  from "@/src/components/ui/menubar"
import {
  FileIcon,
  FileJsonIcon,
  FileTextIcon,
  FilePenIcon,
  FilePlusIcon,
  Trash2Icon,
  ImageIcon,
  TableIcon,
  LinkIcon,
  MessageSquarePlusIcon,
  PencilRulerIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  TypeIcon,
  BoldIcon,
 ItalicIcon,
  UnderlineIcon,
  ListIcon,
  ListOrderedIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  PaintbrushIcon,
  EraserIcon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";

import { DocumentInput } from "./document-input"

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
            <Link href="/">
                <Image src="/logo.svg" alt="Logo" width={36} height={36} />
            </Link>
            <div className="flex flex-col">
                {/*Document title*/}
                <DocumentInput />
                {/*MenuBar*/}
                <div className="flex">
                    <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal py-0.5 px-2 rounded-sm hover:bg-muted h-auto">File</MenubarTrigger>
                            <MenubarContent className="print:hidden">
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                    <FileIcon className="size-4 mr-2" />
                                    Save
                                    </MenubarSubTrigger>

                                    <MenubarSubContent>
                                    <MenubarItem>
                                        <FileJsonIcon className="size-4 mr-2" />
                                        JSON
                                    </MenubarItem>

                                    <MenubarItem>
                                        <BsFilePdf className="size-4 mr-2" />
                                        PDF
                                    </MenubarItem>

                                    <MenubarItem>
                                        <FileTextIcon className="size-4 mr-2" />
                                        Text
                                    </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>

                                <MenubarItem>
                                    <FilePlusIcon className="size-4 mr-2" />
                                    New Document
                                </MenubarItem>

                                <MenubarSeparator />

                                <MenubarItem>
                                    <FilePenIcon className="size-4 mr-2" />
                                    Rename
                                </MenubarItem>

                                <MenubarItem>
                                    <Trash2Icon className="size-4 mr-2" />
                                    Remove
                                </MenubarItem>

                                <MenubarSeparator />

                                <MenubarItem>
                                    Print
                                    <MenubarShortcut>⌘P</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>


                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal py-0.5 px-1.75 rounded-sm hover:bg-muted h-auto"> 
                            Edit</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    Undo
                                    <MenubarShortcut>⌘Z</MenubarShortcut>
                                </MenubarItem>

                                <MenubarItem>
                                    Redo
                                    <MenubarShortcut>⌘⇧Z</MenubarShortcut>
                                </MenubarItem>

                                <MenubarSeparator />

                                <MenubarItem>
                                    Cut
                                    <MenubarShortcut>⌘X</MenubarShortcut>
                                </MenubarItem>

                                <MenubarItem>
                                    Copy
                                    <MenubarShortcut>⌘C</MenubarShortcut>
                                </MenubarItem>

                                <MenubarItem>
                                    Paste
                                    <MenubarShortcut>⌘V</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>


                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal py-0.5 px-1.75 rounded-sm hover:bg-muted h-auto"> 
                            Insert</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <ImageIcon className="size-4 mr-2" />
                                    Image
                                </MenubarItem>
                                <MenubarItem>
                                    <TableIcon className="size-4 mr-2" />
                                    Table
                                </MenubarItem>
                                <MenubarItem>
                                    <LinkIcon className="size-4 mr-2" />
                                    Link
                                </MenubarItem>
                                <MenubarItem>
                                    <MessageSquarePlusIcon className="size-4 mr-2" />
                                    Comment
                                </MenubarItem>
                                <MenubarItem>
                                    <PencilRulerIcon className="size-4 mr-2" />
                                    Drawing
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>


                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                Format
                            </MenubarTrigger>

                            <MenubarContent>

                                <MenubarSub>
                                <MenubarSubTrigger>
                                    <TypeIcon className="size-4 mr-2" />
                                    Text
                                </MenubarSubTrigger>

                                <MenubarSubContent>
                                    <MenubarItem>
                                    <BoldIcon className="size-4 mr-2" />
                                    Bold
                                    <MenubarShortcut>⌘B</MenubarShortcut>
                                    </MenubarItem>

                                    <MenubarItem>
                                    <ItalicIcon className="size-4 mr-2" />
                                    Italic
                                    <MenubarShortcut>⌘I</MenubarShortcut>
                                    </MenubarItem>

                                    <MenubarItem>
                                    <UnderlineIcon className="size-4 mr-2" />
                                    Underline
                                    <MenubarShortcut>⌘U</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarSubContent>
                                </MenubarSub>

                                <MenubarSub>
                                <MenubarSubTrigger>
                                    <Heading1Icon className="size-4 mr-2" />
                                    Paragraph styles
                                </MenubarSubTrigger>

                                <MenubarSubContent>
                                    <MenubarItem>
                                    <Heading1Icon className="size-4 mr-2" />
                                    Heading 1
                                    </MenubarItem>

                                    <MenubarItem>
                                    <Heading2Icon className="size-4 mr-2" />
                                    Heading 2
                                    </MenubarItem>

                                    <MenubarItem>
                                    <Heading3Icon className="size-4 mr-2" />
                                    Heading 3
                                    </MenubarItem>
                                </MenubarSubContent>
                                </MenubarSub>

                                <MenubarSub>
                                <MenubarSubTrigger>
                                    <ListIcon className="size-4 mr-2" />
                                    Lists
                                </MenubarSubTrigger>

                                <MenubarSubContent>
                                    <MenubarItem>
                                    <ListIcon className="size-4 mr-2" />
                                    Bulleted List
                                    </MenubarItem>

                                    <MenubarItem>
                                    <ListOrderedIcon className="size-4 mr-2" />
                                    Numbered List
                                    </MenubarItem>
                                </MenubarSubContent>
                                </MenubarSub>

                                <MenubarSub>
                                <MenubarSubTrigger>
                                    <AlignLeftIcon className="size-4 mr-2" />
                                    Align
                                </MenubarSubTrigger>

                                <MenubarSubContent>
                                    <MenubarItem>
                                    <AlignLeftIcon className="size-4 mr-2" />
                                    Left
                                    <MenubarShortcut>⌘⇧L</MenubarShortcut>
                                    </MenubarItem>

                                    <MenubarItem>
                                    <AlignCenterIcon className="size-4 mr-2" />
                                    Center
                                    <MenubarShortcut>⌘⇧E</MenubarShortcut>
                                    </MenubarItem>

                                    <MenubarItem>
                                    <AlignRightIcon className="size-4 mr-2" />
                                    Right
                                    <MenubarShortcut>⌘⇧R</MenubarShortcut>
                                    </MenubarItem>

                                    <MenubarItem>
                                    <AlignJustifyIcon className="size-4 mr-2" />
                                    Justify
                                    <MenubarShortcut>⌘⇧J</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarSubContent>
                                </MenubarSub>

                                <MenubarSeparator />

                                <MenubarItem>
                                <PaintbrushIcon className="size-4 mr-2" />
                                Paint Format
                                </MenubarItem>

                                <MenubarItem>
                                <EraserIcon className="size-4 mr-2" />
                                Clear Formatting
                                <MenubarShortcut>⌘\</MenubarShortcut>
                                </MenubarItem>

                            </MenubarContent>
                            </MenubarMenu>
                    </Menubar>
                </div>
            </div>
        </div>
    </nav>
  )
}