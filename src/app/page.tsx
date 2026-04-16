import Link from "next/link"
const page = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      Click 
      <Link href="documents/123" className="text-blue-700 underline">&nbsp;Here&nbsp; 
      </Link>
      to go to the documents/123
    </div>
  )
}

export default page