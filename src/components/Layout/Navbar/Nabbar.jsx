import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button
} from "flowbite-react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CounterContext } from "../../../context/CounterContext";
import { AuthContext } from "../../../context/AuthContext";

export default function AppNav() {
  const {counter, userName} = useContext(CounterContext);
  const {token, setToken, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <Navbar>
      <NavbarBrand as={Link} to="/">
        <span className="logo self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Kudo {counter} {userData?.name.split(" ")[0]}
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={
                userData?.photo
                  ? userData.photo
                  : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              }
              rounded
            />
          }
        >
          {token ? (
            <>
              {userData && (
                <DropdownHeader>
                  <span className="block text-sm">{userData.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {userData.email}
                  </span>
                </DropdownHeader>
              )}
              <DropdownItem as={Link} to="/profile">
                Profile
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem as={Button} onClick={handleLogout}>
                Sign out
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem as={Link} to="/login">
                Loign
              </DropdownItem>
              <DropdownItem as={Link} to="/register">
                Register
              </DropdownItem>
            </>
          )}
        </Dropdown>
        {token && <NavbarToggle />}
      </div>
      {token && (
        <NavbarCollapse>
          <NavbarLink as={NavLink} to="/" active>
            Home
          </NavbarLink>
          <NavbarLink as={NavLink} to="/">
            Posts
          </NavbarLink>
        </NavbarCollapse>
      )}
    </Navbar>
  );
}
