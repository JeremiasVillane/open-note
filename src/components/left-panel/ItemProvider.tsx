import { createContext, useContext, useReducer } from "react";
import { FileObj, itemStateType } from "../../types";
import { useNotesStore } from "../../store/notesStore";
import { useTranslation } from "react-i18next";

let ItemContext = createContext({
  item: undefined,
  itemState: undefined,
  updateItemState: undefined,
  showMenu: undefined,
});

export const ItemProvider: React.FC<{
  item: FileObj;
  children: React.ReactNode;
}> = ({
  item,
  children,
}: {
  item: FileObj;
  children: any;
}): React.ReactNode => {
  const { t } = useTranslation();
  const { setStatus } = useNotesStore();

  const [itemState, updateItemState] = useReducer(
    (prev: itemStateType, next: itemStateType) => {
      const newState = { ...prev, ...next };

      if (newState.itemName) {
        if (newState.itemName.length < 2) {
          setStatus(t("ErrorNameLength"));
          newState.itemName = item.name;
        }

        if (newState.itemName!.length > 21) {
          setStatus(t("ErrorNameLength"));
          newState.itemName = newState.itemName!.slice(0, 21);
        }

        const specialCharacters = ["\\", "/", ":", "*", "?", "<", ">", "|"];
        const containsSpecialCharacter = new RegExp(
          `[${specialCharacters.join("\\")}]`
        ).test(newState.itemName!);

        if (containsSpecialCharacter) {
          setStatus(t("ErrorNameChars"));
          newState.itemName = item.name;
        }
      }

      return newState;
    },
    {
      itemName: item.name,
      toRename: false,
      context: false,
      xYPosistion: { x: 0, y: 0 },
    }
  );

  const showMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    updateItemState({ context: false });

    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };

    updateItemState({ xYPosistion: positionChange });
    updateItemState({ context: true });
  };

  ItemContext = createContext({
    item,
    itemState,
    updateItemState,
    showMenu,
  });

  return (
    <ItemContext.Provider
      value={{ item: item, itemState, updateItemState, showMenu }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);

export default ItemContext;
