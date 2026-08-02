import Link from "next/link"
import { Navbar } from "./navbar"
const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16 p-4">
        Click 
        <Link href="documents/123" className="text-blue-700 underline">&nbsp;Here&nbsp; 
        </Link>
        to go to the documents/123
      </div>
    </div>
  )
}

export default page