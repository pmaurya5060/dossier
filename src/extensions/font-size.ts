import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style"
import { FontSize } from "@tiptap/extension-text-style";

declare module "@tiptap/core"{
    interface Commands<ReturnType>{
        fontSize:{
            setFontSize:(size:string)=>ReturnType
            unsetFontSize:()=>ReturnType
        }
    }
}

export const FontSizeExtension=Extension.create({
    name:"fontSize",
    addOptions(){
        return {
            types:["textStyle"], //Means add this attribute inside the TextStyle mark.
        }
    },
    addGlobalAttributes(){
        return [
            {
                types:this.options.types,
                attributes:{
                    fontSize:{
                        default:null,
                        parseHTML:element=> element.style.fontSize,
                        renderHTML:(attributes:{fontSize?: string|null}) =>{
                            if(!attributes.fontSize){
                                return{};
                            }
                            return {
                                style:`font-size:${attributes.fontSize}`
                            }
                        }
                    }
                }
            }
        ]
    },
    addCommands(){
        return{
            setFontSize:(fontSize:string)=>({chain})=>{
                return chain().setMark("textStyle",{fontSize}).run()
            },
            unsetFontSize:()=>({chain})=>{
                return chain().setMark("textStyle",{fontSize:null}).removeEmptyTextStyle().run()
            }
        }
    }
})

// name → Gives the extension an identity.
// addOptions → Configures where or how it should apply.
// addGlobalAttributes → Defines what data (attributes like fontSize) should be stored and how to convert between the editor's state and HTML (parseHTML and renderHTML).
// addCommands → Adds new editor methods such as setFontSize() that you can call from your toolbar or other UI.