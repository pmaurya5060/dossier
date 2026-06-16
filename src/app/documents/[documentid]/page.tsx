
import {Toolbar} from './toolbar';
import { Editor } from "./editor";
interface DocumentIdProps{
  params:Promise<{documentid:string}>;
}

const DocumentIdPage=async({params}:DocumentIdProps)=>{
  const {documentid}=await params;

  return(
    <div className="min-h-screen bg-[#f1f3f4]">
      <Toolbar />

      <div className="flex justify-center">
        <Editor />
      </div>
    </div>
  )

}

export default DocumentIdPage;