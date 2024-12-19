import React from 'react'

function Footer() {
    return (
        <footer className=" z-10 bg-transparent backdrop-blur-md py-8 fixed bottom-0 left-0 right-0">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0">© 2024 DocuFlow . All rights reserved.@MinDev</div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
