export interface IProps {
  onClick: () => void;
  animate: MenuMode;
}

export type MenuMode =
  | "x-enter"
  | "x-leave"
  | "hamburger-enter"
  | "hamburger-leave";

export type SideNavProps = {
  onClose: () => void;
  animate: MenuMode;
  ToggleContactModal: () => void;
};

export type HamburgerContainerProps = {
  IsOpen: boolean;
  onClick: () => void;
  animate: MenuMode;
  setAnimate: React.Dispatch<React.SetStateAction<MenuMode>>;
};
