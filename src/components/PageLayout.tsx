interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = (props: PageLayoutProps) => (
  <main className="flex flex-col md:max-w-screen-md min-h-screen-md p-5 my-0 mx-auto relative">
    <div className="text-left max-w-screen">
      <h1 className="text-2xl font-bold">memory</h1>
    </div>
    {props.children}
  </main>
);

export default PageLayout;
