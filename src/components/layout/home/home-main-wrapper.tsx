type HomeMainWrapperProps = {
    children: React.ReactNode;
};

export const HomeMainWrapper: React.FC<HomeMainWrapperProps> = ({
    children
}) => {
    return (
        <main className="w-full flex justify-center">
            <div className="w-full max-w-[1400px] flex px-[40px] custom:px-0">
                {children}
            </div>
        </main>
    );
};
