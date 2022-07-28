import React from "react";

interface IProps {
  onSelect(item: string): void;
}

export default React.memo(function AutoComplete({}: IProps) {
  // TODO add inputValue state
  // TODO add location results state
  // TODO add isLoading state

  return <div></div>;
});
