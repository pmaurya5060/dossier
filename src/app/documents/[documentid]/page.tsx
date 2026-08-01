import {Toolbar} from './toolbar';
import {Editor} from "./editor";
import { Navbar } from './navbar';
interface DocumentIdProps{
  params:Promise<{documentid:string}>;
}

const DocumentIdPage=async({params}:DocumentIdProps)=>{
  const {documentid}=await params;

  return(
    <div className="min-h-screen bg-[#f1f3f4]">
      <div className="flex flex-col gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] px-4 py-2 print:hidden h-28">
        <Navbar />
        <Toolbar />
      </div>

      <div className="py-28.5 print:py-0">
        <Editor />
      </div>
    </div>
  )

}

export default DocumentIdPage;