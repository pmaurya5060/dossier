"use client"

import Link from "next/link" 
import Image from "next/image"
import { useEditorStore } from "@/store/use-editor-store";
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
    Printer,
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
    const { editor } = useEditorStore();

    const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    };

    const onSaveJSON = () => {
    if (!editor) return;
    onDownload(
        new Blob([JSON.stringify(editor.getJSON(), null, 2)], {
        type: "application/json",
        }),
        "document.json"
    );
    };

    const onSavePDF = () => {
        window.print();
    }
    const onSaveHTML = () => {
    if (!editor) return;
    onDownload(
        new Blob([editor.getHTML()], { type: "text/html" }),
        "document.html"
    );
    };

    const onSaveText = () => {
    if (!editor) return;
    onDownload(
        new Blob([editor.getText()], { type: "text/plain" }),
        "document.txt"
    );
    };
    const onUndo = () => editor?.chain().focus().undo().run();
    const onRedo = () => editor?.chain().focus().redo().run();
    const onPrint = () => window.print();

    const insertImage = () => {
    const url = prompt("Image URL");
    if (!url) return;
    editor?.chain().focus().setImage({ src: url }).run();
    };

    const insertLink = () => {
    const href = prompt("Enter URL");
    if (!href) return;
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    };

    const insertTable = (rows:number, cols:number) => {
    editor?.chain().focus().insertTable({
        rows,
        cols,
        withHeaderRow: false,
    }).run();
    };

    const setHeading = (level: 1 | 2 | 3) => {
    editor
      ?.chain()
      .focus()
      .toggleHeading({ level })
      .run();
  };

  const setAlign = (
    align: "left" | "center" | "right" | "justify"
  ) => {
    editor
      ?.chain()
      .focus()
      .setTextAlign(align)
      .run();
  };

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const toggleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  const bulletList = () => {
    editor?.chain().focus().toggleBulletList().run();
  };

  const orderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
  };

  const clearFormatting = () => {
    editor
      ?.chain()
      .focus()
      .unsetAllMarks()
      .clearNodes()
      .run();
  };

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
                                    <MenubarItem onClick={onSaveJSON}>
                                        <FileJsonIcon className="size-4 mr-2" />
                                        JSON
                                    </MenubarItem>

                                    <MenubarItem onClick={onSavePDF}>
                                        <BsFilePdf className="size-4 mr-2" />
                                        PDF
                                    </MenubarItem>

                                    <MenubarItem onClick={onSaveText}>
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

                                <MenubarItem onClick={onPrint}>
                                    <Printer className="size-4 mr-2"/>
                                    Print
                                    <MenubarShortcut>⌘P</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>


                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal py-0.5 px-1.75 rounded-sm hover:bg-muted h-auto"> 
                            Edit</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem onClick={onUndo}>
                                    Undo
                                    <MenubarShortcut>⌘Z</MenubarShortcut>
                                </MenubarItem>

                                <MenubarItem onClick={onRedo}>
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
                                <MenubarItem onClick={insertImage}>
                                    <ImageIcon className="size-4 mr-2" />
                                    Image
                                </MenubarItem>
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <TableIcon className="size-4 mr-2" />
                                        Table
                                    </MenubarSubTrigger>

                                    <MenubarSubContent>

                                        <MenubarItem onClick={() => insertTable(1,1)}>
                                            1 × 1
                                        </MenubarItem>

                                        <MenubarItem onClick={() => insertTable(2,2)}>
                                            2 × 2
                                        </MenubarItem>

                                        <MenubarItem onClick={() => insertTable(3,3)}>
                                            3 × 3
                                        </MenubarItem>

                                        <MenubarItem onClick={() => insertTable(4,4)}>
                                            4 × 4
                                        </MenubarItem>

                                    </MenubarSubContent>

                                </MenubarSub>
                                <MenubarItem onClick={insertLink}>
                                    <LinkIcon className="size-4 mr-2" />
                                    Link
                                </MenubarItem>
                                <MenubarItem >
                                    <MessageSquarePlusIcon className="size-4 mr-2" />
                                    Comment
                                </MenubarItem>
                                <MenubarItem >
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
                                    <MenubarItem onClick={toggleBold}>
                                    <BoldIcon className="size-4 mr-2" />
                                    Bold
                                    <MenubarShortcut>⌘B</MenubarShortcut>
                                    </MenubarItem>

                                    <MenubarItem onClick={toggleItalic}>
                                    <ItalicIcon className="size-4 mr-2" />
                                    Italic
                                    <MenubarShortcut>⌘I</MenubarShortcut>
                                    </MenubarItem>

                                    <MenubarItem onClick={toggleUnderline}>
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
                                    <MenubarItem >
                                    <ListIcon className="size-4 mr-2" />
                                    Bulleted List
                                    </MenubarItem>

                                    <MenubarItem >
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
                                    <MenubarItem onClick={() => setAlign("left")}>
                                    <AlignLeftIcon className="size-4 mr-2" />
                                    Left
                                    <MenubarShortcut>⌘⇧L</MenubarShortcut>
                                    </MenubarItem>

                                    <MenubarItem onClick={() => setAlign("center")}>
                                    <AlignCenterIcon className="size-4 mr-2" />
                                    Center
                                    <MenubarShortcut>⌘⇧E</MenubarShortcut>
                                    </MenubarItem>

                                    <MenubarItem onClick={() => setAlign("right")}>
                                    <AlignRightIcon className="size-4 mr-2" />
                                    Right
                                    <MenubarShortcut>⌘⇧R</MenubarShortcut>
                                    </MenubarItem>

                                    <MenubarItem onClick={() => setAlign("justify")}>
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