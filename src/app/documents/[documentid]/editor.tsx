"use client";

import Heading from '@tiptap/extension-heading'
import {useEditor,EditorContent} from "@tiptap/react";
import { TaskItem,TaskList } from "@tiptap/extension-list";
import { TableKit } from '@tiptap/extension-table'
import Image from '@tiptap/extension-image'
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";  
import { useEditorStore } from '@/store/use-editor-store';
import { TextStyle, FontFamily } from '@tiptap/extension-text-style'

export const Editor=()=>{

  const {setEditor}=useEditorStore();


  const editor=useEditor({
    onCreate({editor}){
      setEditor(editor);
    },
    onDestroy(){
      setEditor(null);
    },
    onUpdate({editor}){
      setEditor(editor);
    },
    onTransaction({editor}){
      setEditor(editor);
    },
    onFocus({editor}){
      setEditor(editor);
    },
    onBlur({editor}){
      setEditor(editor);
    },
    onContentError({editor}){
      setEditor(editor);
    },
    immediatelyRender:false,
    editorProps:{
      attributes:{
         style: "padding-left:96px;padding-right:96px;",
      class:
        "ProseMirror focus:outline-none bg-white border border-[#c7c7c7] shadow-sm min-h-[1056px] w-[816px] pt-[72px] pb-[72px] cursor-text",
      },
    },
    extensions:[
      StarterKit,
      TaskItem.configure({
        nested:true
      }),
      TaskList,
      TableKit.configure({
        table: { resizable: true },
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle, 
      FontFamily,
    ],
    // content:`hello World`,
    // content: `
    //     <table>
    //       <tbody>
    //         <tr>
    //           <th>Name</th>
    //           <th colspan="3">Description</th>
    //         </tr>
    //         <tr>
    //           <td>Cyndi Lauper</td>
    //           <td>Singer</td>
    //           <td>Songwriter</td>
    //           <td>Actress</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   `,
  });
  
  return (
    <div className="size-full overflow-x-auto bg-[#dadada] px-4 print:p-0 print:bg-white">
    <div className="min-w-max flex justify-center w-204 py-4 print:py-0 mx-auto print:w-full print:min-w-0">
      <EditorContent editor={editor}/>
    </div>
  </div>
  );
};