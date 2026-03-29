export const Container = ({ children }) => {
  return (
    <div className=" min-h-screen bg-slate-950">
      <div className="max-w-[1280px] pl-1 pr-1 mx-auto">{children}</div>
    </div>
  );
};
