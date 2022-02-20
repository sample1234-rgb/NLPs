import React from "react";

function PopUp({ children }) {
  return (
    <div id="pop_up">
        <div id="pop_up_flex">
            "hello Popup"
            <br />
            {children}
        </div>
    </div>
  );
}

export default PopUp;
