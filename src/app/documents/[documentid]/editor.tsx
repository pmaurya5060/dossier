"use client";

import Heading from '@tiptap/extension-heading'
import {useEditor,EditorContent} from "@tiptap/react";
import { TaskItem,TaskList } from "@tiptap/extension-list";
import { TableKit } from '@tiptap/extension-table'
import Image from '@tiptap/extension-image'
import StarterKit from "@tiptap/starter-kit";

export const Editor=()=>{
  const editor=useEditor({
    immediatelyRender:false,
    editorProps:{
      attributes:{
        styles:"padding-left:56px;padding-right:56px",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pl-14 pb-10 cursor-text",
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
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
  });
  
  return (
    <div className="size-full overflow-x-auto bg-[#dadada] px-4 print:p-0 print:bg-white">
      <div className="min-w-max flex justify-center w-204 py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor}/>
      </div>
    </div>
  );
};