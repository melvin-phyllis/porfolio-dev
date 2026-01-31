export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Next.js!</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">This is a simple root page — you can replace it later.</p>
                <div className="mt-6">
                    <a href="/fr" className="mr-4 text-blue-600">Français</a>
                    <a href="/en" className="text-blue-600">English</a>
                </div>
            </div>
        </div>
    );
}
