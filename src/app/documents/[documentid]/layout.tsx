interface documentidLayout{
    children:React.ReactNode;
}

const layout = ({children}:documentidLayout) => {
  return (
    <>
    <div>
        <div>Documentid navbar</div>
        {children}
    </div>
    </>
  )
}

export default layout