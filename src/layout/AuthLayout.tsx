type Props = {
  title?: string;
  children: React.ReactNode;
};

export const AuthLayout = ({ title, children }: Props) => {
  return (
    <main className="grid h-screen content-center font-sans">
      <div className="auth-container container-shadow grid gap-6">
        {title && <h1 className="text-xl font-bold text-gray-900">{title}</h1>}
        {children}
      </div>
    </main>
  );
};
