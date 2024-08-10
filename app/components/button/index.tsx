import React from "react"

export const PrimaryButton = ({children,onClick}:{
    children:React.ReactNode,
    onClick:()=> void}) => {
    return (
        <div className="">
            <button type="button" onClick={onClick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                {children}

            </button>
        </div>
    )
}

export const SecondryButton = ({children,prefix,onClick}:
    {children:React.ReactNode,
     onClick:()=> void,
     prefix:React.ReactNode
    }) => {
    return (
        <div className="">
            <button type="button" onClick={onClick} className="text-white bg-blue-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-4 me-2 mb-2 dark:bg-blue-500 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                <div className="">
                    {prefix}
                </div>
                <div className="">
                    {children}
                </div>
                

            </button>
        </div>
    )
}

export const TertiaryButton =({children, onClick}:
    {children:React.ReactNode,
        onClick:()=> void
    }) => {
        return(
            <div className="">
                <button type="button" onClick={onClick} className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <div className="">
                        {children}
                    </div>
                </button>
            </div>
        )
    }

export const QuaternaryButton = ({children,onClick}:
    {children:React.ReactNode,
    onClick:()=>void
})=>{
    return (
        <div className="">
            <button type="button" onClick={onClick} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <div className="">
                    {children}
                </div>
            </button>
        </div>
    )
}