import { Editor } from "./editor";
interface DocumentIdProps{
  params:Promise<{documentid:string}>;
}

const DocumentIdPage=async({params}:DocumentIdProps)=>{
  const {documentid}=await params;

  return(
    <div>
      <Editor/>
    </div>
  )

}

export default DocumentIdPage;