"use client"

import { SearchIcon, XIcon } from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "@/src/components/ui/button"
import { useSearchParam } from "@/src/hooks/use-search-param"

export const SearchInput = () => {
    const [, setSearchParam] = useSearchParam("search")
    const [value, setValue] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleClear = () => {
        setValue("")
        setSearchParam("")
        inputRef.current?.blur()
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const trimmedValue = value.trim()
        setValue(trimmedValue)
        setSearchParam(trimmedValue)
        inputRef.current?.blur()
    }

    return (
        <div className="flex w-full items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-[720px]"
            >
                <input
                    value={value}
                    onChange={handleChange}
                    ref={inputRef}
                    placeholder="Search..."
                    className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,0.3),0_1px_3px_0_rgba(65,69,73,0.15)] bg-[#F0F4F8] rounded-full h-12 focus-visible:ring-0 focus:bg-white"
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
                >
                    <SearchIcon />
                </Button>
                <Button
                    onClick={handleClear}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
                >
                    <XIcon />
                </Button>
            </form>
        </div>
    )
}