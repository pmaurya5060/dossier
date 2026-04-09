interface DocumentIdProps{
    params:Promise<{documentid:string}>;
};

const app = async({params}:DocumentIdProps) => {
    const {documentid}= await params;
  return (
    <div>Document id:{documentid}</div>
  )
}

export default app