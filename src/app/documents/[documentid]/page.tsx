interface DocumentIdProps{
  params:Promise<{documentid:string}>;
}

const DocumentIdPage=async({params}:DocumentIdProps)=>{
  const {documentid}=await params;

  return(
    <div>
      DocumentId:{documentid}
    </div>
  )

}

export default DocumentIdPage;