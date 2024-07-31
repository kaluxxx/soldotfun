interface SearchBarProps {
    onSearchChange: (search: string) => void;
}

function SearchBar({onSearchChange}: SearchBarProps) {
    return (
        <form className="w-full md:w-1/3 mx-auto py-4">
            <div className="relative bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                <div className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                    <div className="bg-background rounded-full flex items-center px-2">
                        <div className="absolute inset-y-0 start-2 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input
                            onChange={(e) => onSearchChange(e.target.value)}
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-white bg-background border-none rounded-full focus:ring-0 focus:outline-none focus:outline-offset-0"
                            placeholder="Search project"
                            required
                        />
                    </div>
                </div>
            </div>
        </form>

    );
}

export default SearchBar;