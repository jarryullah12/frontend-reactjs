
interface PageWrapperProps {
    children: React.ReactNode;
    title: string;
    description?: string;
}

export function PageWrapper({ children, title, description }: PageWrapperProps) {
    return (
        <main className="py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>
                {description && <p className="text-center text-lg text-gray-600 mb-8">{description}</p>}
                {children}
            </div>
        </main>
    );
}
