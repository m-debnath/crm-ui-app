import LogoutOutMenu from "./LogoutOutMenu";

const Header = () => {
  return (
    <div className="flex justify-around">
      <div className="topPanel flex justify-between h-10 bg-slate-900 fixed top-[1%] w-[98%] xl:w-[99%] mx-[auto] p-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="siteMenu flex gap-2">
          <div className="text-white self-center text-sm">Menus|FIle|Edit</div>
        </div>
        <div className="text-white self-center">Search</div>
        <div>
          <LogoutOutMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
